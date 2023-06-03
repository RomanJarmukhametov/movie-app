import { useStorage } from '@vueuse/core'

export default function useRating(movieId) {
  const rating = useStorage(`rating-${movieId}`, 0)

  const storeRating = (newRating) => {
    if (rating.value !== null) rating.value = newRating
  }

  return {
    rating,
    storeRating
  }
}
