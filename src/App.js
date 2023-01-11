import React, { useEffect, useState } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';

const API_URL = ' https://www.omdbapi.com/?i=tt3896198&apikey=11e69d68';

const App = () => {
    const searchMovies = async (title) => {
        const res = await fetch(`${API_URL}&s=${title}`);
        const data = await res.json();
        setMovies(data.Search);
    }
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    useEffect(() => {
        searchMovies('Batman');
    }, []);
    return (

        <div className="app">
            <h1>Movie Library</h1>
            <div className="search">
                <input placeholder="Search for movies"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon} alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                            <MovieCard movie={movies[0]} />
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No Movies Found</h2>
                        </div>
                    )
            }
        </div>
    );
}
export default App;
