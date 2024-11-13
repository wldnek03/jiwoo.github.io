// url.js

const BASE_URL = 'https://api.themoviedb.org/3';  // TMDB API 기본 URL

// .env 파일에서 API 키를 불러옵니다.
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const endpoints = {
  // 인기 영화 목록
  popularMovies: (page) => `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`,
  
  // 현재 상영작 목록
  nowPlayingMovies: (page) => `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${page}`,
  
  // 영화 발견 (필터링 및 정렬 옵션을 사용하여 영화 검색)
  discoverMovies: (page) => `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&page=${page}`,
};

export default endpoints;