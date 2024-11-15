import React, { useState, useEffect } from 'react';
import './HomeCard.css'; // CSS 파일 임포트
import { saveLikedMoviesToLocalStorage, getLikedMoviesFromLocalStorage } from '../utils/localStorage'; // 로컬 스토리지 함수 임포트

const HomeCard = ({ movie }) => {
  const [liked, setLiked] = useState(false);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 좋아요 상태를 불러옴
  useEffect(() => {
    const savedLikes = getLikedMoviesFromLocalStorage(); // 로컬 스토리지에서 좋아요 목록 불러옴
    const isLiked = savedLikes.some(savedMovie => savedMovie.id === movie.id); // 영화 ID로 좋아요 여부 확인
    setLiked(isLiked); // 좋아요 상태 설정
  }, [movie.id]);

  // 포스터 클릭 시 좋아요 상태 업데이트
  const handlePosterClick = () => {
    const savedLikes = getLikedMoviesFromLocalStorage(); // 현재 저장된 좋아요 목록을 가져옴

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
    <div className="home-card-item" onClick={handlePosterClick}>
      <div className="poster-container">
        {/* 포스터 이미지 */}
        <img 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
          alt={movie.title}
        />
        {/* 영화 제목 */}
        <h3 className="movie-title-item">{movie.title}</h3>
        {/* liked 값에 따라 하트 아이콘 표시 */}
        {liked && <span className="like-icon">❤️</span>}
      </div>
    </div>
  );
};

export default HomeCard;