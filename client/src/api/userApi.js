import axios from "axios";
import { API_BASE_URL } from "../config";

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Register API Error:", error);
        throw error;
    }
};



