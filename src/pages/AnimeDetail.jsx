import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetails } from '../api/animeApi';
import './AnimeDetail.css';

function AnimeDetail() {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAnimeDetails = async () => {
            try {
                const data = await fetchAnimeDetails(id);
                setAnime(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getAnimeDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="anime-detail">
            <h1>{anime.title}</h1>
            <img src={anime.image} alt={anime.title} />
            <p>{anime.description}</p>
            <h2>Episodes</h2>
            <ul>
                {anime.episodes.map(episode => (
                    <li key={episode.id}>{episode.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default AnimeDetail;