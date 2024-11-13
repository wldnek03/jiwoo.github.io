import React, { useState } from 'react';
import './MovieGrid.css'; // 스타일 파일
import { saveLikedMoviesToLocalStorage, getLikedMoviesFromLocalStorage } from '../utils/localStorage'; // 로컬 스토리지 함수 임포트

const MovieGrid = ({ movie }) => {
  // localStorage에서 좋아요 상태 불러오기
  const [liked, setLiked] = useState(() => {
    const savedLikes = getLikedMoviesFromLocalStorage();
    return savedLikes.some(savedMovie => savedMovie.id === movie.id); // 영화 ID로 좋아요 상태 확인
  });

  // 포스터 클릭 시 좋아요 상태 업데이트
  const handlePosterClick = () => {
    const savedLikes = getLikedMoviesFromLocalStorage();

    if (!savedLikes.some(savedMovie => savedMovie.id === movie.id)) {
      // 좋아요 추가: 영화 전체 데이터를 저장
      const updatedLikes = [...savedLikes, movie]; // 영화 전체 데이터를 추가
      saveLikedMoviesToLocalStorage(updatedLikes); // 로컬 스토리지에 저장
      setLiked(true); // 좋아요 상태 업데이트
    } else {
      // 좋아요 취소: 영화 ID로 필터링하여 제거
      const updatedLikes = savedLikes.filter(savedMovie => savedMovie.id !== movie.id);
      saveLikedMoviesToLocalStorage(updatedLikes); // 로컬 스토리지에 저장
      setLiked(false); // 좋아요 상태 업데이트
    }
  };

  return (
    <div className="movie-grid-item" onClick={handlePosterClick}>
      {/* 포스터 이미지 */}
      <div className="poster-container">
        <img 
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
          alt={movie.title} 
          className="poster-image"
        />
      </div>
      {/* 영화 제목 */}
      <h3>{movie.title}</h3>
      {/* liked 값에 따라 하트 아이콘 표시 */}
      {liked && <span className="like-icon">❤️</span>}
    </div>
  );
};

export default MovieGrid;