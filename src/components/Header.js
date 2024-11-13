import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [username, setUsername] = useState(''); // 사용자 이름 (로그인 시 표시)
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleLogout = () => {
    // 로그아웃 처리
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      navigate('/signin'); // 로그인 페이지로 이동
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🎬 Joo 영화</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">홈</Link>
        <Link to="/popular">인기작</Link>
        <Link to="/search">검색</Link>
        <Link to="/wishlist">위시리스트</Link>
        {isLoggedIn ? (
          <>
            <span className="username">{username}</span> {/* 사용자 이름 표시 */}
            <button onClick={handleLoginClick} className="auth-button">
              로그아웃
            </button>
          </>
        ) : (
          <button onClick={handleLoginClick} className="auth-button">
            <FaUser /> 로그인
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;