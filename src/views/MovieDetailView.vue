<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle, useStorage } from '@vueuse/core'
import RatingStars from '../components/RatingStars.vue'

// Import PostService
import PostService from '/src/service/PostService.js'

const movie = reactive({ value: {} })

const route = useRoute()

const dataLoaded = ref(false)

//Define rating initially as null
let rating = ref(0) // initially set rating to 0

//Store rating in local storage
const storeRating = (newRating) => {
  if (rating.value !== null) rating.value = newRating
}

//Setting page title as a movie title
const title = useTitle()

onBeforeMount(async () => {
  try {
    const response = await PostService.getFullMovie(route.params.id)
    movie.value = response.data
    rating.value = useStorage(`rating-${movie.value.imdbID}`, 0)
    dataLoaded.value = true
    title.value = movie.value.Title
  } catch (error) {
    console.error('Error fetching movie data:', error)
  }
})
</script>

<template>
  <div class="container my-4">
    <!-- Back Button -->
    <div class="mb-4">
      <button class="btn btn-secondary" @click="$router.go(-1)">&#8592; Back to Movies</button>
    </div>

    <!-- Movie Details -->
    <div class="card" v-if="dataLoaded">
      <div class="row">
        <!-- Poster Column -->
        <div class="col-md-4">
          <img
            class="card-img-top img-fluid"
            :src="
              movie.value.Poster === 'N/A'
                ? '/src/assets/images/unavailable-image.jpg'
                : movie.value.Poster
            "
            alt="Movie Poster"
          />
        </div>

        <!-- Details Column -->
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ movie.value.Title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ movie.value.Year }}</h6>
            <p class="card-text">
              <span class="title-text">Actors:</span> {{ movie.value.Actors }}
            </p>
            <p class="card-text">
              <span class="title-text">Awards:</span> {{ movie.value.Awards }}
            </p>
            <p class="card-text">
              <span class="title-text">Box Office:</span> {{ movie.value.BoxOffice }}
            </p>
            <p class="card-text">
              <span class="title-text">Country:</span> {{ movie.value.Country }}
            </p>
            <p class="card-text">
              <span class="title-text">Director:</span> {{ movie.value.Director }}
            </p>
            <p class="card-text"><span class="title-text">Genre:</span> {{ movie.value.Genre }}</p>
            <p class="card-text">
              <span class="title-text">Language:</span> {{ movie.value.Language }}
            </p>
            <p class="card-text">
              <span class="title-text">Metascore:</span> {{ movie.value.Metascore }}
            </p>
            <p class="card-text">
              <span class="title-text">Production:</span> {{ movie.value.Production }}
            </p>
            <p class="card-text"><span class="title-text">Plot:</span> {{ movie.value.Plot }}</p>
            <p class="card-text"><span class="title-text">Rated:</span> {{ movie.value.Rated }}</p>
            <p class="card-text">
              <span class="title-text">Runtime:</span> {{ movie.value.Runtime }}
            </p>
            <p class="card-text"><span class="title-text">Type:</span> {{ movie.value.Type }}</p>
            <p class="card-text">
              <span class="title-text">IMDB Rating:</span> {{ movie.value.imdbRating }}
            </p>

            <p class="card-text">
              <span class="title-text"> Rate this Movie:</span>
            </p>
            <RatingStars :grade="rating" :maxStars="5" @update:grade="storeRating" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">Loading movie details</div>
  </div>
</template>

<style scoped>
.loading {
  color: #42b883;
}
.card {
  background-color: #2c3d4e;
  color: #fff;
  border: none;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
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

.text-muted {
  color: #aaa !important;
}

.card-body {
  padding: 20px;
}

.title-text {
  color: #aaa;
  font-weight: bold;
}
</style>
