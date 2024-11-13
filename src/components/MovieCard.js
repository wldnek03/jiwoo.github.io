import React, { useState } from 'react';
import './MovieCard.css';
import { saveLikedMoviesToLocalStorage, getLikedMoviesFromLocalStorage } from '../utils/localStorage'; // 로컬 스토리지 함수 임포트

const MovieCard = ({ movie }) => {
  const [liked, setLiked] = useState(() => {
    const savedLikes = getLikedMoviesFromLocalStorage();
    return savedLikes.some(savedMovie => savedMovie.id === movie.id);
  });

  const handleLikeClick = () => {
    const savedLikes = getLikedMoviesFromLocalStorage();

    if (!savedLikes.some(savedMovie => savedMovie.id === movie.id)) {
      const updatedLikes = [...savedLikes, movie]; // 영화 전체 데이터를 추가
      saveLikedMoviesToLocalStorage(updatedLikes); // 로컬 스토리지에 저장
      setLiked(true);
    } else {
      const updatedLikes = savedLikes.filter(savedMovie => savedMovie.id !== movie.id);
      saveLikedMoviesToLocalStorage(updatedLikes); // 로컬 스토리지에 저장
      setLiked(false);
    }
  };

  return (
    <div className="movie-card" onClick={handleLikeClick}>
      <div className="poster-container">
        <img 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
          alt={movie.title} 
        />
        {liked && <span className="like-icon">❤️</span>}
      </div>
      <div className="movie-title">{movie.title}</div>
    </div>
  );
};

export default MovieCard;