// MovieCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

export const MovieCard = ({ movie }) => {
  const { id, name, imdb_rating,director_name, genre, duration, img_link, cast_name } = movie;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link to={`/movie/${id}`}>
      <div
        className={`card-container ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-img-container">
          <img className="card-img" src={img_link} alt="movie-card" />
        </div>
        {isHovered && (
          <div className="card-details">
            <div>
              <span className="title">{name}</span>
            </div>
            <div>
              <span className="release-date">Release Date :</span>
              <span className="value">Coming Soon</span>
            </div>
            <div>
              <span className="genre">Genre :</span>
              <span className="value">{genre}</span>
            </div>
            <div>
              <span className="cast-detail">Cast :</span>
              <span className="value">{cast_name}</span>
            </div>

            <div className="ratings">
              <div>
                <span className="rating-icon">&#9733;</span>
                <span className="rating-value">{imdb_rating}</span>
              </div>
            
              <div>
                <span>{duration} min</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
