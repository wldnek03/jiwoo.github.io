// 좋아요한 영화 목록을 로컬 스토리지에 저장하는 함수 (전체 영화 데이터 저장)
export const saveLikedMoviesToLocalStorage = (likedMovies) => {
  try {
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  } catch (error) {
    console.error('Error saving liked movies to localStorage:', error);
  }
};

// 로컬 스토리지에서 좋아요한 영화 목록을 불러오는 함수 (전체 영화 데이터 반환)
export const getLikedMoviesFromLocalStorage = () => {
  try {
    const savedLikes = localStorage.getItem('likedMovies');
    return savedLikes ? JSON.parse(savedLikes) : [];
  } catch (error) {
    console.error('Error getting liked movies from localStorage:', error);
    return [];
  }
};

// 특정 영화가 좋아요 상태인지 확인하는 함수 (영화 ID로 확인)
export const isMovieLiked = (movieId) => {
  const likedMovies = getLikedMoviesFromLocalStorage();
  return likedMovies.some(movie => movie.id === movieId);
};