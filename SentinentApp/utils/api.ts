import axios from "axios";

// Replace with your local IP where backend is running
const API_BASE_URL = "http://192.168.226.156:5000"; 

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
