// 위시리스트 관리 서비스 (useWishlist.ts 참고)
import { STORAGE_KEYS } from '../constants/storage';

// 영화 인터페이스
export const Movie = {
  id: null,
  title: '',
  poster_path: '',
  backdrop_path: '',
  overview: '',
  release_date: '',
  vote_average: 0,
  genre_ids: []
};

// 위시리스트 가져오기
export const getWishlist = () => {
  const wishlistStr = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return wishlistStr ? JSON.parse(wishlistStr) : [];
};

// 위시리스트 저장
const saveWishlist = (wishlist) => {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
};

// 위시리스트에 영화 추가/제거
export const toggleWishlist = (movie) => {
  const wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.id === movie.id);

  if (index === -1) {
    // 추가
    wishlist.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      genre_ids: movie.genre_ids || []
    });
  } else {
    // 제거
    wishlist.splice(index, 1);
  }

  saveWishlist(wishlist);
  return wishlist;
};

// 위시리스트에 영화가 있는지 확인
export const isInWishlist = (movieId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === movieId);
};

// 위시리스트 초기화
export const clearWishlist = () => {
  localStorage.removeItem(STORAGE_KEYS.WISHLIST);
};

