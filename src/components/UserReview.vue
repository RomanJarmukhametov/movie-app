<script setup>
import { ref } from 'vue'

import { useRoute } from 'vue-router'

import { useStorage } from '@vueuse/core'

const route = useRoute()

//Define submittedReviews as an empty array initially using useStorage
const submittedReviews = useStorage(`reviews-${route.params.id}`, [])

const userReview = ref('')

const submitReview = () => {
  // Push the user's review to the submittedReviews array
  submittedReviews.value.push(userReview.value)
  // Clear the input field after submission
  userReview.value = ''
}
</script>

<template>
  <div v-for="(review, index) in submittedReviews" :key="index">
    <p>{{ review }}</p>
  </div>

  <form @submit.prevent="submitReview">
    <!-- Textarea for user's review -->
    <div class="mb-3">
      <textarea class="form-control" id="review" v-model="userReview" rows="3"></textarea>
    </div>
    <!-- Button to submit review -->
    <button type="submit" class="btn btn-secondary">Submit review</button>
  </form>
</template>

<style scoped></style>
