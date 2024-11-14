// 로그인 상태일 때만 좋아요한 영화 목록을 로컬 스토리지에 저장하는 함수
export const saveLikedMoviesToLocalStorage = (likedMovies) => {
  const isLoggedIn = getLoginStatusFromLocalStorage(); // 로그인 상태 확인

  if (isLoggedIn) {
    try {
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    } catch (error) {
      console.error('Error saving liked movies to localStorage:', error);
    }
  } else {
    console.log('User is not logged in. Cannot save liked movies.');
  }
};

// 로그인 상태일 때만 로컬 스토리지에서 좋아요한 영화 목록을 불러오는 함수
export const getLikedMoviesFromLocalStorage = () => {
  const isLoggedIn = getLoginStatusFromLocalStorage(); // 로그인 상태 확인

  if (isLoggedIn) {
    try {
      const savedLikes = localStorage.getItem('likedMovies');
      return savedLikes ? JSON.parse(savedLikes) : [];
    } catch (error) {
      console.error('Error getting liked movies from localStorage:', error);
      return [];
    }
  } else {
    console.log('User is not logged in. Cannot retrieve liked movies.');
    return [];
  }
};

// 로그인 여부를 로컬 스토리지에 저장하는 함수 (로그인 시 사용)
export const saveLoginStatusToLocalStorage = (isLoggedIn) => {
  try {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  } catch (error) {
    console.error('Error saving login status to localStorage:', error);
  }
};

// 로컬 스토리지에서 로그인 여부를 불러오는 함수
export const getLoginStatusFromLocalStorage = () => {
  try {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? JSON.parse(isLoggedIn) : false;
  } catch (error) {
    console.error('Error getting login status from localStorage:', error);
    return false;
  }
};