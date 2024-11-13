import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import { fetchMovies } from '../services/api'; // API 호출 함수
import HomeCard from '../components/HomeCard'; // 영화 카드 컴포넌트
import Header from '../components/Header'; // 헤더 컴포넌트
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null); // 추가된 상태
  const [trailerUrl, setTrailerUrl] = useState(''); // 트레일러 URL 상태 추가

  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetchMovies('/movie/popular');
      setPopularMovies(data.results);
      setFeaturedMovie(data.results[0]); // 첫 번째 인기 영화를 배너로 설정
    };

    const getLatestMovies = async () => {
      const data = await fetchMovies('/movie/upcoming');
      setLatestMovies(data.results);
    };

    const getTopRatedMovies = async () => {
      const data = await fetchMovies('/movie/top_rated');
      setTopRatedMovies(data.results);
    };

    const getActionMovies = async () => {
      const data = await fetchMovies('/discover/movie?with_genres=28');
      setActionMovies(data.results);
    };

    const getComedyMovies = async () => {
      const data = await fetchMovies('/discover/movie?with_genres=35');
      setComedyMovies(data.results);
    };

    getPopularMovies();
    getLatestMovies();
    getTopRatedMovies();
    getActionMovies();
    getComedyMovies();
  }, []);

  // 스크롤 함수
  const scrollLeft = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollLeft -= 300; // 왼쪽으로 300px 스크롤
    }
  };
  
  const scrollRight = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollLeft += 300; // 오른쪽으로 300px 스크롤
    }
  };

  // 트레일러 데이터를 가져오는 함수
  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      const data = await response.json();
      
      // YouTube에서 제공되는 트레일러만 필터링
      const trailer = data.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`); // YouTube 임베드 URL 설정
      } else {
        alert('해당 영화의 트레일러를 찾을 수 없습니다.');
        setTrailerUrl(''); // 트레일러가 없으면 URL을 빈 값으로 설정
      }
      
    } catch (error) {
      console.error('트레일러를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  // "재생" 버튼 클릭 시 트레일러 보여주기
  const handlePlayClick = () => {
    if (featuredMovie) {
      fetchTrailer(featuredMovie.id); // 영화 ID로 트레일러 데이터 가져오기
    }
  };

  // "상세 정보" 버튼 클릭 시 영화 상세 페이지로 이동하는 함수
  const handleInfoClick = () => {
    if (featuredMovie) {
      navigate(`/movie/${featuredMovie.id}`); // 영화 ID를 기반으로 상세 페이지로 이동
    }
  };

  return (
    <div className="home">
      <Header />

      {/* 배너 섹션 */}
      {featuredMovie && (
        <div className="banner" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path})` }}>
          <div className="banner-content">
            <h1>{featuredMovie.title}</h1>
            <p>{featuredMovie.overview}</p>
            <div className="banner-buttons">
              <button className="play-btn" onClick={handlePlayClick}>재생</button>
              <button className="info-btn" onClick={handleInfoClick}>상세 정보</button> {/* "상세 정보" 버튼 클릭 시 handleInfoClick 호출 */}
            </div>
          </div>
        </div>
      )}

      {/* 트레일러 섹션 */}
      {trailerUrl && (
        <div className="trailer-section">
          <iframe 
            width="560" 
            height="315" 
            src={trailerUrl} 
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      )}

      {/* 인기 영화 섹션 */}
      <div className="section-title">
        <h1>인기 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('popular')}>◀</button>
        <div id="popular" className="movie-row">
          {popularMovies.length > 0 ? (
            popularMovies.map((movie) => (
              <HomeCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No popular movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('popular')}>▶</button>
      </div>

      {/* 최신 영화 섹션 */}
      <div className="section-title">
        <h1>최신 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('latest')}>◀</button>
        <div id="latest" className="movie-row">
          {latestMovies.length > 0 ? (
            latestMovies.map((movie) => (
              <HomeCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No latest movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('latest')}>▶</button>
      </div>

      {/* 최고 평점 영화 섹션 */}
      <div className="section-title">
        <h1>최고 평점 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('topRated')}>◀</button>
        <div id="topRated" className="movie-row">
          {topRatedMovies.length > 0 ? (
            topRatedMovies.map((movie) => (
              <HomeCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No top-rated movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('topRated')}>▶</button>
      </div>

      {/* 액션 영화 섹션 */}
      <div className="section-title">
        <h1>액션 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('action')}>◀</button>
        <div id="action" className="movie-row">
          {actionMovies.length > 0 ? (
            actionMovies.map((movie) => (
              <HomeCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No action movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('action')}>▶</button>
      </div>

      {/* 코미디 영화 섹션 */}
      <div className="section-title">
        <h1>코미디 영화</h1>
      </div>
      <div className="movie-section">
        <button className="scroll-btn left" onClick={() => scrollLeft('comedy')}>◀</button>
        <div id="comedy" className="movie-row">
          {comedyMovies.length > 0 ? (
            comedyMovies.map((movie) => (
              <HomeCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No comedy movies to display</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRight('comedy')}>▶</button>
      </div>

    </div>
  );
};

export default Home;
