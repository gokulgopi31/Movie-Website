// MovieDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { name, imdb_rating, director_name, genre, duration, img_link, cast_name } = movie;

  return (
    <div className="movie-details-container">
      <div className="movie-details-img-container">
        <img className="movie-details-img" src={img_link} alt="movie-details" />
      </div>
      <div className="movie-details">
      <h2>{name}</h2>
        <div>
          <span className="detail-label">IMDb Rating:</span>
          <span className="detail-value">{imdb_rating}</span>
        </div>
        <div>
          <span className="detail-label">director:</span>
          <span className="detail-value">{director_name}</span>
        </div>
        <div>
          <span className="detail-label">Genre:</span>
          <span className="detail-value">{genre}</span>
        </div>
        <div>
          <span className="detail-label">Duration:</span>
          <span className="detail-value">{duration} min</span>
        </div>
        <div>
          <span className="detail-label">Cast:</span>
          <span className="detail-value">{cast_name}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
