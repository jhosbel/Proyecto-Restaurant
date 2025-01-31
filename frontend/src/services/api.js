import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signUp = (email, password) =>
  axios.post(`${API_URL}/signup`, { email, password });

export const signIn = (email, password) =>
  axios.post(`${API_URL}/signin`, { email, password });

export const logout = () => {
  localStorage.removeItem('token');
};

export const searchRestaurants = (location, token) =>
  axios.get(
    `http://localhost:5000/api/restaurants/search?location=${location}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
