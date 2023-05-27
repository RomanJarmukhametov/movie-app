// src/store/filterStore.js
import { defineStore } from 'pinia'

export const useFilterStore = defineStore({
  id: 'filterStore',
  state: () => ({
    movieGenres: [],
    selectedGenre: '',
    filteredMovies: [],
    isFiltered: false,
    filterSuccess: false
  }),
  actions: {
    setSelectedGenre(genre) {
      this.selectedGenre = genre
    },
    setFilteredMovies(movies) {
      this.filteredMovies = movies
    },
    setIsFiltered(status) {
      this.isFiltered = status
    },
    setFilterSuccess(status) {
      this.filterSuccess = status
    },
    clearFilterResults() {
      this.selectedGenre = ''
      this.filteredMovies = []
      this.isFiltered = false
      this.filterSuccess = false
    }
  }
})
