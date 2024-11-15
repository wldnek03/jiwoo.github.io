import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PopularList from './components/PopularList';
import SearchMovies from './pages/SearchMovies';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Wishlist from './pages/Wishlist';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import MovieDetail from './pages/MovieDetail';
import Header from './components/Header'; // Header 컴포넌트 임포트

function App() {
  const [apiKey, setApiKey] = useState(null); // API 키 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 컴포넌트가 마운트될 때 세션 스토리지에서 로그인 상태와 API 키 복원
  useEffect(() => {
    const storedApiKey = sessionStorage.getItem('apiKey');
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    

    if (storedApiKey && storedIsLoggedIn === 'true') {
      setApiKey(storedApiKey);
      setIsLoggedIn(true);
    }
  }, []);

  // 로그인 성공 시 호출되는 함수
  const handleLoginSuccess = (receivedApiKey) => {
    setApiKey(receivedApiKey); // 로그인 성공 시 받은 API 키 저장
    setIsLoggedIn(true); // 로그인 상태로 설정

    // 세션 스토리지에 API 키와 로그인 상태 저장
    sessionStorage.setItem('apiKey', receivedApiKey);
    sessionStorage.setItem('isLoggedIn', true);

    console.log("로그인 성공! API Key:", receivedApiKey);
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setApiKey(null); // API 키 초기화
    setIsLoggedIn(false); // 로그인 상태 초기화

    // 세션 스토리지에서 API 키와 로그인 상태 제거
    sessionStorage.removeItem('apiKey');
    sessionStorage.removeItem('isLoggedIn');

    console.log("로그아웃 되었습니다.");
  };

  return (
    <Router>
      {/* Header를 모든 페이지에 공통으로 적용 */}
      <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} /> {/* Header에 onLogout 전달 */}
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home apiKey={apiKey} onLogout={handleLogout} />} /> {/* Home에 apiKey와 로그아웃 함수 전달 */}
        <Route path="/search" element={<SearchMovies apiKey={apiKey} onLogout={handleLogout} isLoggedIn={isLoggedIn} />} />
        <Route path="/movie/:id" element={<MovieDetail apiKey={apiKey} onLogout={handleLogout} />} /> 
        <Route path="/signin" element={<SignIn onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route 
          path="/popular" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PopularList apiKey={apiKey} onLogout={handleLogout} /> {/* apiKey와 로그아웃 전달 */}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Wishlist apiKey={apiKey} onLogout={handleLogout} /> {/* apiKey 전달 */}
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;