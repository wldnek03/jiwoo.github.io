import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate로 변경
import './MovieDetail.css'; // CSS 파일 추가
import Header from '../components/Header';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // .env 파일에서 API 키 가져오기
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const YOUTUBE_BASE_URL = "https://www.youtube.com/embed/";

const MovieDetail = () => {
  const { id } = useParams(); // URL에서 영화 ID 가져오기
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // 트레일러 키 상태 추가
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // 영화 상세 정보 요청
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`);
        const data = await response.json();
        setMovie(data);

        // 영화 트레일러 정보 요청 (콘솔에 URL 출력)
        const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
        console.log("Fetching video data from:", `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`);
        const videoData = await videoResponse.json();
        console.log("Video data:", videoData); // 응답 데이터 확인
        
        // 트레일러가 있으면 첫 번째 트레일러의 key 저장 (YouTube 동영상 key)
        const trailer = videoData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
          setTrailerKey(trailer.key);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!movie) {
    return <p>영화 정보를 불러오지 못했습니다.</p>;
  }

  return (
    <div>
      {/* 헤더 추가 */}
      <Header /> 

      {/* 영화 상세 정보 */}
      <div className="movie-detail-container">
        <div className="movie-detail">
          <img className="movie-poster" src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-release-date">개봉일: {movie.release_date}</p>
            <p className="movie-rating">평점: {movie.vote_average} / 10</p>
            <p className="movie-overview">{movie.overview}</p>

            {/* 트레일러가 있을 경우 YouTube 영상 삽입 */}
            {trailerKey ? (
              <div className="trailer-container">
                <h2>예고편</h2>
                <iframe
                  width="560"
                  height="315"
                  src={`${YOUTUBE_BASE_URL}${trailerKey}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p>예고편이 없습니다.</p> 
            )}
          </div>
        </div>
      </div>

      {/* 뒤로 가기 버튼을 컨테이너 아래에 배치 */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← 뒤로 가기
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;