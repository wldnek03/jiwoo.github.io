import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignIn.css"; // CSS 파일 가져오기

const SignIn = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isRotating, setIsRotating] = useState(false); // 회전 상태 추가
  const navigate = useNavigate();

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // TMDB API 키 유효성 검사 함수
  const validateApiKey = (apiKey) => {
    return apiKey.length === 32; // TMDB API 키는 보통 32자입니다.
  };

  // 로그인 처리 함수
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      alert('유효하지 않은 이메일 형식입니다.');
      return;
    }

    if (!validateApiKey(apiKey)) {
      alert('유효하지 않은 API 키 형식입니다.');
      return;
    }

    try {
      // API 요청을 통해 TMDB 서비스에 접근
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);

      // API 요청이 성공하면 로그인 성공 처리
      if (response.status === 200) {
        localStorage.setItem('sessionId', apiKey); // 세션 저장

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email); // 이메일 저장
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // 로그인 성공 시 사용자 정보를 로컬 스토리지에 저장
        localStorage.setItem('user', JSON.stringify({ email }));

        alert('로그인 성공!');
        onLoginSuccess(apiKey); // 로그인 성공 시 API 키를 상위 컴포넌트로 전달
        navigate('/'); // 메인 페이지로 리다이렉트
      } else {
        alert(`API 응답 오류: ${response.status}`);
      }
      
    } catch (error) {
      console.error("API 요청 중 오류:", error.response ? error.response.data : error.message);
      
      if (error.response && error.response.data && error.response.data.status_message) {
        alert(`API 요청 중 오류: ${error.response.data.status_message}`);
      } else {
        alert('API 요청 중 오류가 발생했습니다.');
      }
    }
  };

  // 회원가입 페이지로 이동하는 함수 (회전 애니메이션 추가)
  const handleSignUp = () => {
    setIsRotating(true); // 회전 시작

    // 애니메이션이 끝난 후 회원가입 페이지로 이동
    setTimeout(() => {
      navigate('/signup');
    }, 600); // CSS에서 설정한 전환 시간과 동일하게 설정 (0.6초)
  };

  return (
    <div className={`signin ${isRotating ? 'rotate-out' : ''}`}>
      <h1>로그인</h1>
      
      <input 
        type="email" 
        placeholder="이메일" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
      />
      
      <input 
        type="text" 
        placeholder="TMDB API 키" 
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)} 
      />

       <div className="checkbox-container" style={{ display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
          <label htmlFor="rememberMe" style={{ marginLeft: '5px' }}>아이디 기억하기</label>
      </div>

      <button onClick={handleLogin}>
        로그인
      </button>

      {/* 회원가입 버튼 추가 */}
      <button onClick={handleSignUp} className="signup-button">
        회원가입
      </button>

    </div>
  );
};

export default SignIn;