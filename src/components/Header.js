import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Header.css';

const Header = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [username, setUsername] = useState(''); // 사용자 이름 (로그인 시 표시)
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // 로컬 스토리지에서 사용자 정보 가져오기
    if (storedUser && storedUser.email) {
      setIsLoggedIn(true);
      setUsername(storedUser.email.split('@')[0]); // 이메일의 앞부분(아이디)만 표시
    }
  }, []); 

  const handleLogout = () => {
    // 로그아웃 처리
    setIsLoggedIn(false);
    setUsername('');
    
    // 로컬 스토리지와 세션 스토리지에서 사용자 정보 및 API 키 제거
    localStorage.removeItem('user'); // 사용자 정보 제거
    sessionStorage.removeItem('apiKey'); // API 키 제거
    sessionStorage.removeItem('isLoggedIn'); // 로그인 상태 제거

    if (onLogout) {
      onLogout(); // 상위 컴포넌트의 로그아웃 함수 호출 (상태 초기화)
    }

    navigate('/'); // 홈으로 리다이렉트
    
    window.location.reload(); // 로그아웃 후 페이지 새로고침하여 상태 반영
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
            <span className="username">{username}</span> {/* 사용자 이름(아이디) 표시 */}
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