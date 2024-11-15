import React, { useState, useEffect } from 'react';
import './MovieListItem.css'; // 스타일 파일
import { saveLikedMoviesToLocalStorage, getLikedMoviesFromLocalStorage } from '../utils/localStorage'; // 로컬 스토리지 함수 임포트

const MovieListItem = ({ movie }) => {
  // localStorage에서 좋아요 상태 불러오기
  const [liked, setLiked] = useState(() => {
    const savedLikes = getLikedMoviesFromLocalStorage();
    return savedLikes.some(savedMovie => savedMovie.id === movie.id); // 영화 ID로 좋아요 상태 확인
  });

  // 좋아요 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    const savedLikes = getLikedMoviesFromLocalStorage();
    
    if (liked) {
      if (!savedLikes.some(savedMovie => savedMovie.id === movie.id)) {
        const updatedLikes = [...savedLikes, movie];
        saveLikedMoviesToLocalStorage(updatedLikes);
      }
    } else {
      const updatedLikes = savedLikes.filter(savedMovie => savedMovie.id !== movie.id);
      saveLikedMoviesToLocalStorage(updatedLikes);
    }
  }, [liked, movie]); // liked 또는 movie가 변경될 때마다 실행

  // 포스터 클릭 시 좋아요 상태 업데이트
  const handlePosterClick = () => {
    setLiked((prevLiked) => !prevLiked); // 현재 liked 값을 반전시킴
  };

  return (
    <div className="movie-list-item" onClick={handlePosterClick}>
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      {/* liked 값에 따라 하트 아이콘 표시 */}
      {liked && <span className="like-icon">❤️</span>}
    </div>
  );
};

export default MovieListItem;