// TMDB API 서비스
import axios from 'axios';
import { TMDB_BASE_URL, TMDB_ENDPOINTS } from '../constants/api';

const getApiKey = () => {
  return localStorage.getItem('TMDb-Key') || '';
};

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    language: 'ko-KR'
  }
});

// API 키를 자동으로 추가하는 인터셉터
apiClient.interceptors.request.use((config) => {
  const apiKey = getApiKey();
  if (apiKey) {
    config.params = {
      ...config.params,
      api_key: apiKey
    };
  }
  return config;
});

export const movieApi = {
  // 인기 영화 목록
  getPopular: (page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.POPULAR, {
      params: { page }
    });
  },

  // 현재 상영작
  getNowPlaying: (page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.NOW_PLAYING, {
      params: { page }
    });
  },

  // 평점 높은 영화
  getTopRated: (page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.TOP_RATED, {
      params: { page }
    });
  },

  // 개봉 예정작
  getUpcoming: (page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.UPCOMING, {
      params: { page }
    });
  },

  // 영화 검색
  searchMovies: (query, page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.SEARCH, {
      params: { query, page }
    });
  },

  // 영화 상세 정보
  getMovieDetail: (movieId) => {
    return apiClient.get(`${TMDB_ENDPOINTS.DETAIL}/${movieId}`);
  },

  // 장르별 영화
  discoverMovies: (params = {}) => {
    return apiClient.get(TMDB_ENDPOINTS.DISCOVER, {
      params: { page: 1, ...params }
    });
  },

  // 장르 목록
  getGenres: () => {
    return apiClient.get(TMDB_ENDPOINTS.GENRES);
  }
};

export default apiClient;

