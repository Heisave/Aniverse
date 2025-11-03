import React from 'react';

function Player({ videoUrl }) {
    return (
        <div className="player">
            <video controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Player;