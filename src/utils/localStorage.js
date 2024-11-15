// 좋아요한 영화 목록을 로컬 스토리지에서 불러오는 함수
export const getLikedMoviesFromLocalStorage = () => {
  try {
    const savedLikes = localStorage.getItem('likedMovies');
    return savedLikes ? JSON.parse(savedLikes) : []; // 저장된 값이 없으면 빈 배열 반환
  } catch (error) {
    console.error('Error getting liked movies from localStorage:', error);
    return [];
  }
};

// 좋아요한 영화 목록을 로컬 스토리지에 저장하는 함수
export const saveLikedMoviesToLocalStorage = (movies) => {
  try {
    localStorage.setItem('likedMovies', JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving liked movies to localStorage:', error);
  }
};

// 로그인 여부를 로컬 스토리지에 저장하는 함수 (로그인 시 사용)
export const saveLoginStatusToLocalStorage = (isLoggedIn) => {
  try {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn)); // 로그인 상태를 JSON 형식으로 저장
  } catch (error) {
    console.error('Error saving login status to localStorage:', error);
  }
};

// 로컬 스토리지에서 로그인 여부를 불러오는 함수
export const getLoginStatusFromLocalStorage = () => {
  try {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? JSON.parse(isLoggedIn) : false; // 저장된 값이 없으면 false 반환
  } catch (error) {
    console.error('Error getting login status from localStorage:', error);
    return false; // 오류 발생 시 false 반환
  }
};