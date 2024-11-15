import React, { useState, useEffect } from 'react';
import MovieListItem from '../components/MovieListItem'; // MovieListItem 컴포넌트 임포트
import Header from '../components/Header'; // Header 컴포넌트 임포트
import { getLikedMoviesFromLocalStorage } from '../utils/localStorage'; // 유틸리티 함수 임포트

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 좋아요한 영화 목록을 불러옴
  useEffect(() => {
    const savedLikes = getLikedMoviesFromLocalStorage(); // 유틸리티 함수 사용
    setWishlistMovies(savedLikes); // 저장된 전체 영화를 상태로 설정

    // 로그인 상태 확인 (예시: sessionStorage에서 로그인 여부 확인)
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedIsLoggedIn === 'true'); // 세션 스토리지에서 로그인 여부 확인
  }, []);

  return (
    <div>
      {/* Header 컴포넌트를 페이지 상단에 추가 */}
      <Header />

      <h1 style={{ color: 'orange', fontSize: '2rem' }}>My Wishlist</h1>

      {/* 조건부 렌더링: 로그인이 되어 있을 때만 위시리스트를 보여줌 */}
      {isLoggedIn ? (
        <div className="wishlist-container">
          {wishlistMovies.length > 0 ? (
            wishlistMovies.map((movie) => (
              <MovieListItem key={movie.id} movie={movie} />
            ))
          ) : (
            <p>위시리스트에 추가된 영화가 없습니다.</p>
          )}
        </div>
      ) : (
        <p>로그인이 필요합니다. 위시리스트를 보려면 로그인하세요.</p>
      )}
    </div>
  );
};

export default Wishlist;