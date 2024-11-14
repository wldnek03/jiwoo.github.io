import React, { useState, useEffect } from "react";
import "./SearchMovies.css";
import Header from '../components/Header'; // 헤더 컴포넌트 가져오기

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(""); // 검색어 상태
  const [genre, setGenre] = useState(""); // 장르 필터 상태
  const [ratingMin, setRatingMin] = useState(""); // 최소 평점 필터 상태
  const [ratingMax, setRatingMax] = useState(""); // 최대 평점 필터 상태
  const [language, setLanguage] = useState(""); // 언어 필터 상태
  const [sortBy, setSortBy] = useState(""); // 정렬 필터 상태
  const [page, setPage] = useState(1); // 페이지 상태

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // 로컬 스토리지에서 사용자 입력 API 키 가져오기
  const getApiKey = () => {
    const apiKey = localStorage.getItem('sessionId');
    if (!apiKey) {
      throw new Error("API Key is missing. Please log in.");
    }
    return apiKey;
  };

  // 영화 데이터를 가져오는 함수
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${getApiKey()}&language=ko-KR&page=${page}&with_genres=${genre}&with_original_language=${language}`;

        if (ratingMin) url += `&vote_average.gte=${ratingMin}`;
        if (ratingMax) url += `&vote_average.lte=${ratingMax}`;
        if (sortBy) url += `&sort_by=${sortBy}`; // 정렬 추가

        const response = await fetch(url);
        const data = await response.json();
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, genre, ratingMin, ratingMax, language, sortBy]); // API_KEY 제거

  // 필터링 로직 (검색어를 기준으로 필터링)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <Header />

      {/* 검색 및 필터 설정 */}
      <div className="filters">
        <input
          type="text"
          placeholder="영화 제목으로 검색..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {/* 장르 선택 */}
        <select value={genre} onChange={(e) => { setGenre(e.target.value); setPage(1); }}>
          <option value="">장르 (전체)</option>
          <option value="28">액션</option>
          <option value="12">모험</option>
          <option value="16">애니메이션</option>
          <option value="35">코미디</option>
          <option value="80">범죄</option>
        </select>

        {/* 최소 평점 선택 */}
        <select value={ratingMin} onChange={(e) => { setRatingMin(e.target.value); setPage(1); }}>
          <option value="">최소 평점 (전체)</option>
          <option value="1">1 이상</option>
          <option value="2">2 이상</option>
          <option value="3">3 이상</option>
          <option value="4">4 이상</option>
          <option value="5">5 이상</option>
          <option value="6">6 이상</option>
          <option value="7">7 이상</option>
          <option value="8">8 이상</option>
          <option value="9">9 이상</option>
        </select>

        {/* 최대 평점 선택 */}
        <select value={ratingMax} onChange={(e) => { setRatingMax(e.target.value); setPage(1); }}>
          <option value="">최대 평점 (전체)</option>
          <option value="10">10 이하</option>
          <option value="9">9 이하</option>
          <option value="8">8 이하</option>
          <option value="7">7 이하</option>
          <option value="6">6 이하</option>
          <option value="5">5 이하</option>
          <option value="4">4 이하</option>
          <option value="3">3 이하</option>
        </select>

        {/* 언어 선택 */}
        <select value={language} onChange={(e) => { setLanguage(e.target.value); setPage(1); }}>
          <option value="">언어 (전체)</option>
          <option value="en">영어</option>
          <option value="ko">한국어</option>
          <option value="ja">일본어</option>
        </select>

        {/* 정렬 기준 선택 */}
        <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}>
          <option value="">정렬 기준 (기본값)</option>
          <option value="popularity.desc">인기순 (내림차순)</option>
          <option value="popularity.asc">인기순 (오름차순)</option>
          <option value="release_date.desc">개봉일순 (최신순)</option>
          <option value="release_date.asc">개봉일순 (오래된 순)</option>
          <option value="vote_average.desc">평점순 (높은 순)</option>
          <option value="vote_average.asc">평점순 (낮은 순)</option>
        </select>

        {/* 초기화 버튼 */}
        <button onClick={() => { 
            setFilter(""); 
            setGenre(""); 
            setRatingMin(""); 
            setRatingMax("");
            setLanguage("");
            setSortBy(""); // 정렬 초기화
            setPage(1);
        }}>
          초기화
        </button>
      </div>

      {/* 영화 목록 표시 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <div className="movie-list">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                // 포스터 클릭 시 상세 페이지로 이동하는 기능 추가
                <div className="movie-item" key={movie.id} onClick={() => window.location.href = `/movie/${movie.id}`}>
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
                  <p>{movie.release_date}</p>
                </div>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>

          {/* 더 많은 영화 로드 버튼 */}
          {movies.length > 0 && (
            <button className="load-more" onClick={() => setPage(page + 1)}>
              더 보기
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchMovies;