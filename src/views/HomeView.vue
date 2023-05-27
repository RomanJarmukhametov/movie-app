<!-- HomeView.vue -->
<script setup>
// Import Vue Composition API and components
import { onMounted, ref, reactive, watchEffect } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import FormSelect from '@/components/FormSelect.vue'

// Import services and data
import PostService from '/src/service/PostService.js'
import SourceData from '@/data.json'

// Import Store
import { useSearchStore } from '/src/store/searchStore.js'

//START OF SECTION FOR MOVIE DATA
//Define a reactive variable to store movie ids
const movieIds = reactive({ value: SourceData.movieId })

//Create an array to store movie ids
const movieOMDBIds = movieIds.value.map((movie) => movie.movieOMDBId)

// Create a reactive for movie data array
const movieDataArray = reactive({ value: [] })

//Define a reactive variable to check if data is loaded
const dataLoaded = ref(false)

// Fetch data when the component is mounted taking movieId as a parameter from array of movie ids movieOMDBIds
onMounted(async () => {
  for (let i = 0; i < movieOMDBIds.length; i++) {
    try {
      const response = await PostService.getMovie(movieOMDBIds[i])
      movieDataArray.value.push(response.data)
    } catch (error) {
      console.error('Error fetching movie data:', error)
    }
  }
  dataLoaded.value = true
})
//END OF SECTION FOR MOVIE DATA

//START OF SEARCH SECTION
// Define a function to search movies by name
const search = ref('')

// Fetch the searchStore
const searchStore = useSearchStore()

// Define a function to add a movie to the searchStore
const searchMovies = async () => {
  if (search.value != '') {
    try {
      const response = await PostService.searchMoviesByName(search.value)
      if (response.data.Search) {
        searchStore.setSearchResults(response.data.Search)
        if (searchStore.searchResults.length) {
          searchStore.setSearchSuccess(true)
        } else {
          searchStore.setSearchSuccess(false)
        }
      } else {
        searchStore.setSearchResults([])
        searchStore.setSearchSuccess(false)
      }
      search.value = ''
      searchStore.setMovieSearched(true)
    } catch (error) {
      console.error('Error fetching movie data:', error)
    }
  }
}

const clearSearchResults = () => {
  searchStore.clearSearchResults()
}
//END OF SEARCH SECTION

//START OF SECTION FOR FILTERING MOVIES
//Define a reactive variable to store movie genres
const movieGenres = reactive({ value: SourceData.movieGenre })

//Define a reactive variable to store the selected genre
const selectedGenre = ref('')

//Define a reactive variable to store the filtered movie
const filteredMovies = reactive({ value: [] })

//Create an array of movie genres
const movieGenresArray = movieGenres.value.map((genre) => genre.genre)

//Define a reactive variable to check if data is filtered
const isFiltered = ref(false)

//Define a reactive variable to store the filtering success
const filterSuccess = ref(false)

//Define a function to filter movies by genre
const filterMovies = () => {
  filterSuccess.value = false
  // Filter the movie data array by genre
  filteredMovies.value = movieDataArray.value.filter((movie) => {
    // Split the genre string into an array of genres
    const movieGenresArray = movie.Genre.split(',').map((genre) => genre.trim())

    // Return true if the selected genre is included in the movie's genre array
    const includesGenre = movieGenresArray.includes(selectedGenre.value)

    if (includesGenre) {
      filterSuccess.value = true
    }

    // If the movie includes the selected genre, log the movie's title
    isFiltered.value = true
    return includesGenre
  })
}

// Watch for changes to the selected genre
watchEffect(() => {
  if (selectedGenre.value) {
    filterMovies()
  } else {
    // When no genre is selected, show all movies and set isFiltered to false
    filteredMovies.value = [...movieDataArray.value]
    isFiltered.value = false
    filterSuccess.value = false
  }
})

const clearFilterResults = () => {
  selectedGenre.value = ''
}
//END OF SECTION FOR FILTERING MOVIES
</script>

<template>
  <div class="container">
    <!-- Row to display filter, sort and search controls -->
    <div class="row mt-5 mb-5">
      <div class="col-3">
        <FormSelect label="Filter by genre" :options="movieGenresArray" v-model="selectedGenre" />
      </div>
      <div class="col-3">
        <select class="form-select custom-select border-0" aria-label="Filter by genre">
          <option selected>Filter by Genre</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-6">
        <form @submit.prevent="searchMovies()" class="search-box">
          <input type="text" placeholder="What are you looking for?" v-model="search" />
          <input type="submit" value="Search" />
        </form>
      </div>
    </div>

    <!-- Searched movies -->
    <div class="row" v-if="searchStore.movieSearched">
      <div class="row align-items-center">
        <div class="col-10">
          <h4>Search results</h4>
        </div>
        <div class="col-2 text-right">
          <button class="btn btn-secondary" @click="clearSearchResults">Clear Search</button>
        </div>
      </div>
      <div class="row" v-if="searchStore.searchSuccess">
        <div class="col mt-3" v-for="(movieData, index) in searchStore.searchResults" :key="index">
          <RouterLink :to="'/movie/' + movieData.imdbID">
            <MovieCard
              :poster="
                movieData.Poster === 'N/A'
                  ? '/src/assets/images/unavailable-image.jpg'
                  : movieData.Poster
              "
              :title="movieData.Title"
              :text="movieData.Type"
              :year="movieData.Year"
              :genre="movieData.Genre || 'N/A'"
            />
          </RouterLink>
        </div>
      </div>
      <div v-else class="loading">No results found</div>
    </div>

    <!-- Default list of movies -->
    <div class="row" v-if="dataLoaded && !searchStore.movieSearched && !isFiltered">
      <div class="row d-flex align-items-stretch">
        <div class="col mt-3 mb-3" v-for="(movieData, index) in movieDataArray.value" :key="index">
          <RouterLink :to="'/movie/' + movieOMDBIds[index]">
            <MovieCard
              :poster="
                movieData.Poster === 'N/A'
                  ? '/src/assets/images/unavailable-image.jpg'
                  : movieData.Poster
              "
              :title="movieData.Title"
              :text="movieData.Plot"
              :year="movieData.Year"
              :genre="movieData.Genre"
            />
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-if="!dataLoaded" class="loading">Loading movie list...</div>

    <!-- Filtered movies -->
    <div v-if="isFiltered">
      <div class="row align-items-center">
        <div class="col-10">
          <h4>Filtering results</h4>
        </div>
        <div class="col-2 text-right">
          <button class="btn btn-secondary" @click="clearFilterResults">Clear Filters</button>
        </div>
        <div class="row d-flex align-items-stretch" v-if="filterSuccess">
          <div
            class="col mt-3 mb-3"
            v-for="(movieData, index) in filteredMovies.value"
            :key="index"
          >
            <RouterLink :to="'/movie/' + movieData.imdbID">
              <MovieCard
                :poster="
                  movieData.Poster === 'N/A'
                    ? '/src/assets/images/unavailable-image.jpg'
                    : movieData.Poster
                "
                :title="movieData.Title"
                :text="movieData.Plot"
                :year="movieData.Year"
                :genre="movieData.Genre"
              />
            </RouterLink>
          </div>
        </div>
        <div v-else class="loading">No results found</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  color: #42b883;
}

.search-box input {
  border: none;
  outline: none;
  background: none;
}

.search-box input[type='text'] {
  width: 75%;
  color: #fff;
  background-color: #496583;
  font-size: 1.25rem;
  padding: 1rem 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  margin-bottom: 0.9375rem;
  transition: 0.4s;
}

.search-box input[type='text']::placeholder {
  color: #f3f3f3;
}

.search-box input[type='text']:focus {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}

.search-box input[type='submit'] {
  /* width: 100%; */
  max-width: 18.75rem;
  background-color: #42b883;
  padding: 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
  color: #fff;
  font-size: 1.25rem;
  text-transform: uppercase;
  transition: 0.4s;
}

.search-box input[type='submit']:active {
  background-color: #3b8070;
}

.custom-select {
  color: #fff;
  background-color: #496583;
  font-size: 1.25rem;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
