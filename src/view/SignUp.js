import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // SignUp.css 파일을 불러옵니다.

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [confirmApiKey, setConfirmApiKey] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isRotating, setIsRotating] = useState(false); // 회전 상태 관리
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

  // 회원가입 처리 함수
  const handleSignUp = () => {
    if (!validateEmail(email)) {
      alert('유효하지 않은 이메일 형식입니다.');
      return;
    }

    if (!validateApiKey(apiKey)) {
      alert('유효하지 않은 API 키 형식입니다.');
      return;
    }

    if (apiKey !== confirmApiKey) {
      alert('API 키가 일치하지 않습니다.');
      return;
    }

    if (!agreedToTerms) {
      alert('약관에 동의해야 합니다.');
      return;
    }

    // 사용자 정보 저장 (로컬 스토리지)
    const userData = { email, apiKey };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    alert('회원가입이 완료되었습니다!');
    
    // 회전 애니메이션 후 로그인 페이지로 이동
    setIsRotating(true);
    
    setTimeout(() => {
      navigate('/signin');
    }, 600); // CSS에서 설정한 전환 시간과 동일하게 설정 (0.6초)
  };

  // 로그인 페이지로 이동하는 함수
  const handleGoToSignIn = () => {
     // 회전 애니메이션 후 로그인 페이지로 이동
     setIsRotating(true);

     setTimeout(() => {
       navigate('/signin');
     }, 600); 
  };

  return (
    <div className={`signup ${isRotating ? 'rotate-out' : ''}`}> {/* .signup 클래스 및 회전 애니메이션 클래스 추가 */}
      <h1>회원가입</h1>
      
      <input 
        type="email" 
        placeholder="이메일" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        className="input-field" 
      />
      
      <input 
        type="text" 
        placeholder="TMDB API 키" 
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)} 
        className="input-field" 
      />

      <input 
        type="text" 
        placeholder="TMDB API 키 확인" 
        value={confirmApiKey}
        onChange={(e) => setConfirmApiKey(e.target.value)} 
        className="input-field"
      />

      <div className="checkbox-container"> {/* .checkbox-container 클래스 추가 */}
        <input type="checkbox" id="terms" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} />
        <label htmlFor="terms">약관에 동의합니다</label>
      </div>

      <button onClick={handleSignUp} className="signup-button">
        회원가입
      </button>

      {/* 로그인 버튼 추가 */}
      <button onClick={handleGoToSignIn} className="signup-button">
        로그인
      </button>
      
    </div>
  );
};

export default SignUp;