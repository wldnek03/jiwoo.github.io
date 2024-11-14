import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

// 기본 파라미터 설정 (언어는 고정)
const defaultParams = {
  language: 'ko-KR',
};

/**
 * fetchMovies 함수
 * @param {string} endpoint - API 요청의 엔드포인트
 * @param {object} params - 추가적인 쿼리 파라미터
 * @returns {object} - 응답 데이터
 */
export const fetchMovies = async (endpoint, params = {}) => {
  try {
    // 로컬 스토리지에서 저장된 사용자 입력 API 키 가져오기
    const apiKey = localStorage.getItem('sessionId');

    if (!apiKey) {
      throw new Error("API Key is missing. Please log in.");
    }

    // 기본 파라미터에 사용자 입력 API 키 추가
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: apiKey, ...defaultParams, ...params },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return { results: [] }; // 기본적으로 빈 배열 반환
  }
};