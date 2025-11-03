import axios from 'axios';

const API_URL = 'https://api.example.com/anime'; // Replace with the actual API URL

export const fetchAnimeList = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching anime list:', error);
        throw error;
    }
};

export const fetchAnimeDetails = async (animeId) => {
    try {
        const response = await axios.get(`${API_URL}/details/${animeId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for anime ID ${animeId}:`, error);
        throw error;
    }
};