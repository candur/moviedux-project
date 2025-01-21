import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGridUpdated({movies, watchlist, toggleWatchlist}) {
  const [search, setSearch] = useState("");

  const [genre, setGender] = useState("All Genres");
  const [rating, setRating] = useState("All")

  const handleSearch = (e) =>{
    setSearch(e.target.value);
    console.log(e.target.value)
  };

  const handleGender = (e) =>{
    setGender(e.target.value);
    console.log(e.target.value);
  };

  const handleRating = (e) =>{
    setRating(e.target.value);
  };


  const matchesGenre = (movie, genre) => {
    return genre === "All Genres"  || movie.genre.toLowerCase() === genre.toLowerCase()
  }

  const matchesSearch = (movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase())
  }

  const matchesRating = (movie, rating) => {
    switch(rating){
      case 'All' : return true;
      case 'Good': return movie.rating >= 8;
      case 'Ok' : return movie.rating >= 5 && movie.rating < 8;
      case 'Bad' : return movie.rating < 5;

      default: return false;
    }
  }

  const filteredMovies = movies.filter(movie => 
    matchesGenre(movie, genre) && matchesRating(movie, rating) && matchesSearch(movie, search)
  )

  return (
    <div>

      <input type="text" 
      placeholder="Search movies ..." 
      className="search-input" 
      value={search}
      onChange={handleSearch}
      ></input>

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select className="filter-dropdown" 
          value={genre}
          onChange={handleGender}>
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating</label>
          <select className="filter-dropdown" 
          value={rating}
          onChange={handleRating}>
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} toggleWatchlist={toggleWatchlist} isWatchlisted={watchlist.includes(movie.id)} />
        ))}
      </div>

    </div>
  );
}
