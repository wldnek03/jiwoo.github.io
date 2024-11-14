import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [confirmApiKey, setConfirmApiKey] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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
    const userData = { email: email, apiKey: apiKey };
    
    localStorage.setItem('user', JSON.stringify(userData));
    alert('회원가입이 완료되었습니다!');
    
    navigate('/signin'); // 회원가입 후 로그인 페이지로 이동
  };

  return (
    <div>
      <h1>회원가입</h1>
      
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

      <input 
        type="text" 
        placeholder="TMDB API 키 확인" 
        value={confirmApiKey}
        onChange={(e) => setConfirmApiKey(e.target.value)} 
      />

      <div>
        <input type="checkbox" id="terms" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} />
        <label htmlFor="terms">약관에 동의합니다</label>
      </div>

      <button onClick={handleSignUp}>
        회원가입
      </button>
      
    </div>
  );
};

export default SignUp;