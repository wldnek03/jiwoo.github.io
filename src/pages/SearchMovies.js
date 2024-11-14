import React, { useState, useEffect } from "react";
import "./SearchMovies.css";
import Header from '../components/Header'; 

const SearchMovies = ({ apiKey }) => {  
  const [movies, setMovies] = useState([]); // 영화 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [filter, setFilter] = useState(""); // 검색어 상태
  const [page, setPage] = useState(1); // 페이지 상태

  // 추가된 필터 상태들
  const [genre, setGenre] = useState(""); // 장르 필터 상태
  const [ratingMin, setRatingMin] = useState(""); // 최소 평점 필터 상태
  const [ratingMax, setRatingMax] = useState(""); // 최대 평점 필터 상태
  const [language, setLanguage] = useState(""); // 언어 필터 상태
  const [sortBy, setSortBy] = useState(""); // 정렬 기준 상태

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // 영화 데이터를 가져오는 함수
  useEffect(() => {
    if (!apiKey) {
      
      return; // API 키가 없으면 더 이상 진행하지 않음 (화면에 아무것도 표시되지 않음)
    }

    const fetchMovies = async () => {
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko-KR&page=${page}`;

        // 장르 필터 추가
        if (genre) {
          url += `&with_genres=${genre}`;
        }

        // 최소 평점 필터 추가
        if (ratingMin) {
          url += `&vote_average.gte=${ratingMin}`;
        }

        // 최대 평점 필터 추가
        if (ratingMax) {
          url += `&vote_average.lte=${ratingMax}`;
        }

        // 언어 필터 추가
        if (language) {
          url += `&with_original_language=${language}`;
        }

        // 정렬 기준 추가
        if (sortBy) {
          url += `&sort_by=${sortBy}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        if (page === 1) {
          setMovies(data.results); // 첫 페이지의 경우 새로 설정
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]); // 추가 페이지의 경우 기존 데이터에 추가
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, genre, ratingMin, ratingMax, language, sortBy, apiKey]); 

  if (!apiKey) {
    return null; // API 키가 없으면 아무것도 렌더링하지 않음
  }

  // 필터링 로직 (검색어를 기준으로 필터링)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <Header />

      {/* 검색어 입력 */}
      <div className="filters">
        <input
          type="text"
          placeholder="영화 제목으로 검색..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)} 
        />
      </div>

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
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1} 이상</option>
        ))}
      </select>

      {/* 최대 평점 선택 */}
      <select value={ratingMax} onChange={(e) => { setRatingMax(e.target.value); setPage(1); }}>
        <option value="">최대 평점 (전체)</option>
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={10 - i}>{10 - i} 이하</option>
        ))}
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
          setSortBy(""); 
          setPage(1);
      }}>
        초기화
      </button>

      {/* 영화 목록 표시 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <div className="movie-list">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                movie.poster_path && (
                  <div className="movie-item" key={movie.id} onClick={() => window.location.href = `/movie/${movie.id}`}>
                    <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title}/>
                    <p>{movie.title}</p> 
                    {movie.release_date && (<p>{movie.release_date}</p>)}
                  </div>              
                )
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>

          {/* 더 많은 영화 로드 버튼 */}
          {movies.length > 0 && !loading && (
            <>
              {!loading && (<button className='load-more' onClick={() => setPage(page + 1)}>더 보기</button>)}
            </>
          )}
       </>
     )}
   </div>  
 );
};

export default SearchMovies;