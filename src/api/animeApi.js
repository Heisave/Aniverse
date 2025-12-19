import axios from 'axios';

const API_URL = 'https://api.example.com/anime'; // Replace with the actual API URL

export const fetchAnimeList = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        // Some APIs return { data: [...] } while others return [...] directly.
        // Normalize to always return an array (or empty array on unexpected shape).
        if (Array.isArray(response.data)) return response.data;
        if (Array.isArray(response.data?.data)) return response.data.data;
        // If the API returns an object with a results/items property, try those too
        if (Array.isArray(response.data?.results)) return response.data.results;
        if (Array.isArray(response.data?.items)) return response.data.items;

        // Fallback: if response.data is an object but not an array, return empty array
        return [];
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