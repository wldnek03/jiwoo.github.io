const BASE_URL = 'https://api.themoviedb.org/3';  // TMDB API 기본 URL

// 로컬 스토리지에서 사용자 입력 API 키를 가져옵니다.
const getApiKey = () => {
  const apiKey = localStorage.getItem('sessionId');
  if (!apiKey) {
    throw new Error("API Key is missing. Please log in.");
  }
  return apiKey;
};

const endpoints = {
  // 인기 영화 목록
  popularMovies: (page) => `${BASE_URL}/movie/popular?api_key=${getApiKey()}&language=ko-KR&page=${page}`,
  
  // 현재 상영작 목록
  nowPlayingMovies: (page) => `${BASE_URL}/movie/now_playing?api_key=${getApiKey()}&language=ko-KR&page=${page}`,
  
  // 영화 발견 (필터링 및 정렬 옵션을 사용하여 영화 검색)
  discoverMovies: (page) => `${BASE_URL}/discover/movie?api_key=${getApiKey()}&language=ko-KR&page=${page}`,
};

export default endpoints;