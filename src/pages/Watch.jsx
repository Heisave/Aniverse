import React from 'react';
import { useParams } from 'react-router-dom';
import Player from '../components/Player';
import './Watch.css';

function Watch() {
    const { animeId } = useParams();

    return (
        <div className="watch-container">
            <h1>Watch Anime</h1>
            <Player animeId={animeId} />
        </div>
    );
}

export default Watch;