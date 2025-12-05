// TMDB API 관련 상수들
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const TMDB_IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original'
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  }
};

// API 엔드포인트
export const TMDB_ENDPOINTS = {
  POPULAR: '/movie/popular',
  NOW_PLAYING: '/movie/now_playing',
  TOP_RATED: '/movie/top_rated',
  UPCOMING: '/movie/upcoming',
  SEARCH: '/search/movie',
  DISCOVER: '/discover/movie',
  GENRES: '/genre/movie/list',
  DETAIL: '/movie'
};

