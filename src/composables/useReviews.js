import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export default function useReviews(movieId) {
  const submittedReviews = useStorage(`reviews-${movieId}`, [])
  const userReview = ref('')

  const submitReview = () => {
    submittedReviews.value.push(userReview.value)
    userReview.value = ''
  }

  return {
    submittedReviews,
    userReview,
    submitReview
  }
}
