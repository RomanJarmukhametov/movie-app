<!-- HomeView.vue -->
<script setup>
import { useSearchStore } from '/src/store/searchStore.js'

// Import necessary functions from Vue
import { onMounted, ref, reactive } from 'vue'

import MovieCard from '@/components/MovieCard.vue'

// Import PostService
import PostService from '/src/service/PostService.js'

//Import json file with movie IDs
import SourceData from '@/data.json'

const movieIds = ref(SourceData.movieId)

// //Create an array to store movie ids
const movieOMDBIds = movieIds.value.map((movie) => movie.movieOMDBId)

// Create a reactive for movie data array
const movieDataArray = reactive({ value: [] })

//Define a reactive variable to check if data is loaded
const dataLoaded = ref(false)


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
</script>

<template>
  <div class="container">
    <div class="row mt-5 mb-5">
      <div class="col">
        <form @submit.prevent="searchMovies()" class="search-box">
          <input type="text" placeholder="What are you looking for?" v-model="search" />
          <input type="submit" value="Search" />
        </form>
      </div>
    </div>

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
              :poster="movieData.Poster"
              :title="movieData.Title"
              :text="movieData.Type"
              :year="movieData.Year"
            />
          </RouterLink>
        </div>
      </div>
      <div v-else class="loading">No results found</div>
    </div>

    <div class="row" v-if="dataLoaded && !searchStore.movieSearched">
      <div class="row d-flex align-items-stretch">
        <div class="col mt-3 mb-3" v-for="(movieData, index) in movieDataArray.value" :key="index">
          <RouterLink :to="'/movie/' + movieOMDBIds[index]">
            <MovieCard
              :poster="movieData.Poster"
              :title="movieData.Title"
              :text="movieData.Plot"
              :year="movieData.Year"
            />
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-if="!dataLoaded" class="loading">Loading movie list...</div>
  </div>
</template>

<style scoped>
.loading {
  color: #42b883;
}

.search-box {
  padding: 1rem;
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
  width: 100%;
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
</style>
