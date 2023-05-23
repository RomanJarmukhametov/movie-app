// PostService.js

//Import axios
import axios from 'axios'

// Set the API key for making requests
const apiKey = import.meta.env.VITE_APP_API_KEY

// Create an axios instance with a pre-configured baseURL and default headers
const apiClient = axios.create({
  baseURL: 'https://www.omdbapi.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Export an object containing methods for making API requests related to posts
export default {
  getMovie(id) {
    return apiClient.get('/', { params: { i: id, apiKey: apiKey } })
  }
}
