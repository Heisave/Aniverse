import React, { useEffect, useState } from 'react';
import { fetchAnimeList } from '../api/animeApi';
import AnimeCard from '../components/AnimeCard';
import './Browse.css';

function Browse() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAnimeList = async () => {
            try {
                const data = await fetchAnimeList();
                setAnimeList(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getAnimeList();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="browse">
            <h1>Browse Anime</h1>
            <div className="anime-list">
                {animeList.map(anime => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
            </div>
        </div>
    );
}

export default Browse;