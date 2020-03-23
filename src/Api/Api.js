import axios from 'axios';

const API_URLS = {
  BASE_URL: 'https://pokeapi.co/api/v2/',
  POKEMONS: 'pokemon',
  TYPE: 'type',
};

const axiosConfig = {
  baseURL: API_URLS.BASE_URL,
};

const axiosInstance = axios.create(axiosConfig);

export const getPokemons = async (offset = 0, limit = 10) => {
  return axiosInstance.get(`${API_URLS.POKEMONS}`, {
    params: { limit, offset },
  });
};

export const getPokemon = async name => {
  return axiosInstance.get(`${API_URLS.POKEMONS}/${name}/`);
};

export const getType = async type => {
  return axiosInstance.get(`${API_URLS.TYPE}/${type}/`);
};
