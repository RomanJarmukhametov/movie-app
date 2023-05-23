<!-- HomeView.vue -->
<script setup>
// Import necessary functions from Vue
import { onMounted, ref, reactive } from 'vue'

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
  // await nextTick()
})

console.log(movieDataArray.value)
console.log(movieDataArray.value[2])
</script>

<template>
  <div class="container">
    <div class="row mt-5 mb-5">
      <div class="col">
        <form @submit.prevent class="search-box">
          <input type="text" placeholder="What are you looking for?" />
          <input type="submit" value="Search" />
        </form>
      </div>
    </div>

    <div class="row" v-if="dataLoaded">
      <div class="row">
        <div class="col" v-for="(movieData, index) in movieDataArray.value" :key="index">
          <RouterLink :to="'/movie/' + movieOMDBIds[index]">
            <div class="card" style="width: 18rem">
              <img :src="movieData.Poster" class="card-img-top" :alt="movieData.Title" />
              <div class="card-body">
                <h5 class="card-title">{{ movieData.Title }}</h5>
                <p class="card-text">
                  {{ movieData.Plot }}
                </p>
                <p class="card-text">
                  <small class="text-muted"> Release Year: {{ movieData.Year }}</small>
                </p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else class="loading">Loading movie list...</div>
  </div>
</template>

<style scoped>
.card {
  background-color: #2c3d4e;
  color: #fff;
  border: none;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
}

.card img {
  border-radius: 8px 8px 0 0;
}

.card-title {
  color: #42b883;
}

.card-text {
  color: #fff;
}

.loading {
  color: #42b883;
}

.text-muted {
  color: #aaa !important;
}

.card-body {
  padding: 20px;
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

.movies-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0px 8px;
}

.movies-list .movie {
  max-width: 50%;
  flex: 1 1 50%;
  padding: 16px 8px;
}

.movies-list .movie .movie-link {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.movies-list .movie .movie-link .product-image {
  position: relative;
  display: block;
}

.movies-list .movie .movie-link .product-image img {
  display: block;
  width: 100%;
  height: 275px;
  object-fit: cover;
}

.movies-list .movie .movie-link .product-image .type {
  position: absolute;
  padding: 8px 16px;
  background-color: #42b883;
  color: #fff;
  bottom: 16px;
  left: 0px;
  text-transform: capitalize;
}
</style>
