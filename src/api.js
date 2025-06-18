import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://topictube-server.onrender.com/api'
    : '/api',
  withCredentials: true, // send cookies (for refresh token)
});

export async function register(email, password) {
  const res = await api.post('/auth/register', { email, password });
  return res.data;
}

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
}

// Add more API functions as needed (refresh, logout, preferences, etc.) 