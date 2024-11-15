import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'; // InfiniteScroll 라이브러리
import MovieGrid from './MovieGrid'; // 그리드 뷰 컴포넌트
import MovieListItem from './MovieListItem'; // 리스트 뷰 컴포넌트
import './PopularList.css'; // PopularList 스타일
import endpoints from '../url'; // API 엔드포인트
import Header from './Header'; // 헤더 컴포넌트 추가
import axios from 'axios';

const PopularList = ({ apiKey, onLogout }) => {  // apiKey와 onLogout을 props로 받음
    const [movies, setMovies] = useState([]);
    const [currentView, setCurrentView] = useState('grid'); // 초기 뷰는 'grid'
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [moviesPerPage, setMoviesPerPage] = useState(10); // 한 페이지당 영화 개수
    const [showTopButton, setShowTopButton] = useState(false); // Scroll to Top 버튼 상태

    // 브라우저 크기에 따라 한 페이지에 표시할 영화 개수 계산
    const calculateMoviesPerPage = () => {
        const gridWidth = document.querySelector('.movie-grid')?.offsetWidth || window.innerWidth;
        const movieCardWidth = 200; // 각 영화 카드의 너비 (대략적인 값)
        const moviesPerRow = Math.floor(gridWidth / movieCardWidth);
        const rowsPerPage = Math.floor(window.innerHeight / 300); // 각 행의 높이를 300px로 가정
        return moviesPerRow * rowsPerPage;
    };

    // 영화 데이터를 가져오는 함수 (useCallback으로 메모이제이션)
    const fetchPopularMovies = useCallback(async (page) => {
        try {
            if (!apiKey) {
                throw new Error("API Key is missing.");
            }

            const response = await axios.get(endpoints.popularMovies(page), {
                params: { api_key: apiKey }  // apiKey를 요청에 포함
            });
            const data = response.data;

            if (currentView === 'list') {
                setMovies((prevMovies) => [...prevMovies, ...data.results]); // 리스트 뷰에서는 기존 영화 목록에 새 영화 추가
            } else {
                setMovies(data.results); // 그리드 뷰에서는 새로 불러온 영화로 교체
            }
            setTotalPages(data.total_pages);
        } catch (err) {
            console.error('Error fetching popular movies:', err);
            setError('Failed to fetch popular movies.');
        }
    }, [currentView, apiKey]);  // apiKey 의존성 추가

    // 초기 데이터 로드 및 페이지 변경 시 데이터 가져오기
    useEffect(() => {
        fetchPopularMovies(currentPage);
        if (currentView === 'grid') {
            document.body.classList.add('no-scroll');  // 그리드 뷰일 때 스크롤 금지 (클래스 추가)
            setMoviesPerPage(calculateMoviesPerPage());  // 한 페이지당 영화 개수 설정
        } else {
            document.body.classList.remove('no-scroll');  // 리스트 뷰일 때 스크롤 허용 (클래스 제거)
        }
        
        const handleResize = () => {
            if (currentView === 'grid') {
                setMoviesPerPage(calculateMoviesPerPage());
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.classList.remove('no-scroll');  // 컴포넌트 언마운트 시 클래스 제거 (안전 조치)
        };
        
    }, [currentPage, currentView, fetchPopularMovies]);

    // 스크롤 이벤트를 감지하여 Scroll to Top 버튼 표시 여부 결정 (리스트 뷰에서만 적용)
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    };

    // 스크롤 이벤트 리스너 추가 및 제거 (리스트 뷰에서만 적용)
    useEffect(() => {
        if (currentView === 'list') {
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll);
        }

        return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 리스너 제거
    }, [currentView]);

    // 뷰 변경 핸들러 함수
    const handleViewChange = (view) => {
        setCurrentView(view);
        if (view === 'grid') {
            fetchPopularMovies(1);  // 그리드 뷰로 전환 시 초기화 후 다시 로드
            setCurrentPage(1);
        } else if (view === 'list') {
            setMovies([]);  // 리스트 뷰로 전환 시 기존 영화 목록 초기화
            setCurrentPage(1);  // 페이지 번호 초기화 후 무한 스크롤 시작
        }
    };

    // 페이지네이션: 다음 페이지로 이동하는 함수 (그리드 뷰에서만 사용)
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 페이지네이션: 이전 페이지로 이동하는 함수 (그리드 뷰에서만 사용)
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="popular-container">
            
            {/* 헤더 추가 */}
            <Header onLogout={onLogout} /> {/* 로그아웃 기능을 위해 onLogout 전달 */}

            {/* 에러 메시지가 있을 때도 헤더를 표시하고 에러를 보여줌 */}
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            
            {/* View Toggle Buttons */}
            <div className="view-toggle">
                <button onClick={() => handleViewChange('grid')} className={currentView === 'grid' ? 'active' : ''}>
                    <i className="fa fa-th"></i> 
                </button>
                <button onClick={() => handleViewChange('list')} className={currentView === 'list' ? 'active' : ''}>
                    <i className="fa fa-list"></i> 
                </button>
            </div>

            {/* Apply correct CSS class based on currentView */}
            {currentView === 'grid' ? (
                <>
                    <div className="movie-grid">
                        {movies.slice(0, moviesPerPage).map((movie) => (
                            <MovieGrid key={movie.id} movie={movie} />
                        ))}
                    </div>
                    {/* Pagination Controls for Grid View */}
                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            이전
                        </button>
                        <span>{`${currentPage} / ${totalPages}`}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            다음
                        </button>
                    </div>
                </>
            ) : (
                <InfiniteScroll
                    dataLength={movies.length}
                    next={() => setCurrentPage((prevPage) => prevPage + 1)}  // 다음 페이지로 이동
                    hasMore={currentPage < totalPages}  // 더 가져올 데이터가 있는지 확인
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>No more movies!</p>}
                >
                    <div className="movie-list">
                        {movies.map((movie) => (
                            <div className="movie-list-item" key={movie.id}>
                                <MovieListItem movie={movie} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            )}

            {/* Scroll to Top Button - 리스트 뷰에서만 표시 */}
            {showTopButton && currentView === 'list' && (
                <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Top
                </button>
            )}
        </div>
    );
};

export default PopularList;