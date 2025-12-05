// TMDB 이미지 URL 생성 유틸리티
import { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZES } from '../constants/api';

export const getPosterUrl = (posterPath, size = 'medium') => {
  if (!posterPath) {
    return '/placeholder-poster.jpg'; // 기본 이미지
  }
  const sizePath = TMDB_IMAGE_SIZES.poster[size] || TMDB_IMAGE_SIZES.poster.medium;
  return `${TMDB_IMAGE_BASE_URL}/${sizePath}${posterPath}`;
};

export const getBackdropUrl = (backdropPath, size = 'large') => {
  if (!backdropPath) {
    return '/placeholder-backdrop.jpg'; // 기본 이미지
  }
  const sizePath = TMDB_IMAGE_SIZES.backdrop[size] || TMDB_IMAGE_SIZES.backdrop.large;
  return `${TMDB_IMAGE_BASE_URL}/${sizePath}${backdropPath}`;
};

