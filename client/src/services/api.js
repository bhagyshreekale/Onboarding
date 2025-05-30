import axios from "axios";

// API base URL
const API_URL = "http://localhost:5000/api"; 

// Register User Function
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Image upload ke liye required
      },
    });
    return response.data;
  } catch (error) {
    console.error("Register API Error:", error.response?.data || error.message);
    throw error;
  }
};
