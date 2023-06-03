<script setup>
import { useRoute } from 'vue-router'
import useReviews from '@/composables/useReviews.js'

const route = useRoute()
const { submittedReviews, userReview, submitReview } = useReviews(route.params.id)
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
