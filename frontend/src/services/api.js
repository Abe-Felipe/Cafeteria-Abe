import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'cafescript-chave-secreta-98765'
  },
});

export const getIngredients = () => {
  return apiClient.get('/ingredients');
};