//Creating function to fetch movie data to avoid code duplication
import PostService from '/src/service/PostService.js'

export const fetchMovies = async (movieOMDBIds, movieArray) => {
  for (let i = 0; i < movieOMDBIds.length; i++) {
    try {
      const response = await PostService.getMovie(movieOMDBIds[i])
      movieArray.value.push(response.data)
    } catch (error) {
      console.error('Error fetching movie data:', error)
    }
  }
}

export const updateMoviesArray = async (isUpdated, movieOMDBIds, sortedMovies, newMovies) => {
  if (isUpdated) {
    try {
      sortedMovies.value.splice(0, sortedMovies.value.length, ...newMovies)
    } catch (error) {
      console.error('Error updating movies array:', error)
    }
  } else {
    sortedMovies.value.splice(0, sortedMovies.value.length)
    await fetchMovies(movieOMDBIds, sortedMovies)
  }
}
