// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieCard from './components/MovieCard/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [found, setFound] = useState(true); // track if the search term is found

  const getMovies = async () => {
    try {
      const { data } = await axios.get('https://movies-app.prakashsakari.repl.co/api/movies');
      setMovies(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredMovies = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredMovies.length > 0) {
      // if the filtered movies array is not empty, set the movies state to it and set found to true
      setMovies(filteredMovies);
      setFound(true);
    } else {
      // otherwise, set found to false and clear the movies state
      setFound(false);
      setMovies([]);
    }
  };

  const handleBackToHome = () => {
    setFound(true); // Reset the found state
    setSearchTerm(''); // Clear the search term
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1 className="heading">MovieCard</h1>
          <div className="search-container">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
            <button onClick={handleSubmit} style={{ float: 'right' }}>
              Search
            </button>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <main className="main">
                {found ? (
                  movies.length > 0 ? (
                    movies.map((movie) => (
                      <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <MovieCard movie={movie} />
                      </Link>
                    ))
                  ) : (
                    <div className="not-found">
                      <h2>No movies found</h2>
                      <img
                        src="https://cdn.iconscout.com/icon/free/png-256/no-data-1-458250.png"
                        alt="No data illustration"
                      />
                    </div>
                  )
                ) : (
                  <div className="not-found">
                    <h2>Did not find any movie you searched</h2>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/no-data-1-458250.png"
                      alt="No data illustration"
                    />
                  </div>
                )}
              </main>
            }
          />
          <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
