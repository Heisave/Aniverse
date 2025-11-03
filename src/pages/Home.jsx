import React, { useEffect, useState } from 'react';
import { fetchAnimeList } from '../api/animeApi';
import AnimeCard from '../components/AnimeCard';
import './Home.css';

function Home() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAnimeList = async () => {
            const data = await fetchAnimeList();
            setAnimeList(data);
            setLoading(false);
        };
        getAnimeList();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home">
            <h1>Featured Anime</h1>
            <div className="anime-list">
                {animeList.map(anime => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
            </div>
        </div>
    );
}

export default Home;