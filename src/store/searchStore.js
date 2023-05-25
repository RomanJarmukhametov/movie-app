// src/store/searchStore.js
import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
  // unique id of the store across your application
  id: 'searchStore',
  state: () => ({
    searchResults: [],
    movieSearched: false,
    searchSuccess: false
  }),
  actions: {
    setSearchResults(results) {
      this.searchResults = results
    },
    setMovieSearched(status) {
      this.movieSearched = status
    },
    setSearchSuccess(status) {
      this.searchSuccess = status
    },
    clearSearchResults() {
      this.searchResults = []
      this.movieSearched = false
      this.searchSuccess = false
    }
  }
})
