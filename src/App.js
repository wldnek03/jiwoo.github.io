import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PopularList from './components/PopularList';
import SearchMovies from './pages/SearchMovies';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Wishlist from './pages/Wishlist';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import MovieDetail from './pages/MovieDetail';

function App() {
  const [apiKey, setApiKey] = useState(null); // API 키 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 로그인 성공 시 호출되는 함수
  const handleLoginSuccess = (receivedApiKey) => {
    setApiKey(receivedApiKey); // 로그인 성공 시 받은 API 키 저장
    setIsLoggedIn(true); // 로그인 상태로 설정
    console.log("로그인 성공! API Key:", receivedApiKey);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home apiKey={apiKey} />} /> {/* Home에 apiKey 전달 */}
        <Route path="/search" element={<SearchMovies apiKey={apiKey} />} />
        <Route path="/movie/:id" element={<MovieDetail />} /> 
        <Route path="/signin" element={<SignIn onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route 
          path="/popular" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PopularList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Wishlist />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;