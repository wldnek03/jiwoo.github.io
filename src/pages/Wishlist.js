import React, { useState, useEffect } from 'react';
import MovieListItem from '../components/MovieListItem'; // MovieListItem 컴포넌트 임포트
import Header from '../components/Header'; // Header 컴포넌트 임포트
import { getLikedMoviesFromLocalStorage } from '../utils/localStorage'; // 유틸리티 함수 임포트

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 좋아요한 영화 목록을 불러옴
  useEffect(() => {
    const savedLikes = getLikedMoviesFromLocalStorage(); // 유틸리티 함수 사용
    setWishlistMovies(savedLikes); // 저장된 전체 영화를 상태로 설정
  }, []);

  return (
    <div>
      {/* Header 컴포넌트를 페이지 상단에 추가 */}
      <Header />

      <h1 style={{ color: 'orange', fontSize: '2rem' }}>My Wishlist</h1>

      {/* 위시리스트에 있는 영화들을 MovieListItem으로 렌더링 */}
      <div className="wishlist-container">
        {wishlistMovies.length > 0 ? (
          wishlistMovies.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))
        ) : (
          <p>위시리스트에 추가된 영화가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;