// Initialize a variable UUID to 0
let UUID = 0

// Create a UniqueID function that will return an object with a method to get a unique ID
export default function UniqueID() {
  // Define a getID function that increments the UUID and returns its value
  const getID = () => {
    UUID++
    return UUID
  }

  // Return an object with the getID method
  return {
    getID
  }
}
