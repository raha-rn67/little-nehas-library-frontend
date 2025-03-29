import axios from "axios";

// Configure axios to send credentials with every request
axios.defaults.withCredentials = true;

const API_URL = "https://little-nehas-library-backend.onrender.com/api/books";
const BASE_URL = "https://little-nehas-library-backend.onrender.com/api";

// Check authentication status
export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/check-auth`);
    return response.data.isAuthenticated;
  } catch (error) {
    console.error("Auth check failed", error);
    return false;
  }
};

// Verify database password
export const verifyPassword = async (password) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-password`, { password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

// Get all books
export const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (book) => {
  return axios.post(API_URL, book);
};

export const editBook = async (id, updatedBook) => {
  return axios.put(`${API_URL}/${id}`, updatedBook);
};

// Delete a book
export const deleteBook = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};