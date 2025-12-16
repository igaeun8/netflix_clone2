// 검색 페이지
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBolt, 
  faMountain, 
  faGrinBeam, 
  faUserSecret,
  faTheaterMasks,
  faGhost,
  faHeart,
  faRocket,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/common/Header';
import MovieCard from '../../components/movie/MovieCard';
import { useMovieSearch, useGenreMovies, usePopularMovies } from '../../hooks/useMovies';
import './Search.css';

// 장르 카테고리 정의
const GENRE_CATEGORIES = [
  { id: 28, name: '액션', icon: faBolt },
  { id: 12, name: '모험', icon: faMountain },
  { id: 35, name: '코미디', icon: faGrinBeam },
  { id: 80, name: '범죄', icon: faUserSecret },
  { id: 18, name: '드라마', icon: faTheaterMasks },
  { id: 27, name: '공포', icon: faGhost },
  { id: 10749, name: '로맨스', icon: faHeart },
  { id: 878, name: 'SF', icon: faRocket },
  { id: 53, name: '스릴러', icon: faExclamationTriangle },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [displayMovies, setDisplayMovies] = useState([]);

  // 검색 훅 사용
  const { movies: searchMovies, loading: searchLoading, error: searchError } = useMovieSearch(query);
  const { movies: genreMovies, loading: genreLoading, error: genreError } = useGenreMovies(selectedGenreId);
  const { movies: popularMovies, loading: popularLoading, error: popularError } = usePopularMovies();

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSelectedGenreId(null); // 검색 시 장르 선택 해제
    setSearchParams({ q: newQuery });
  };

  // 장르 버튼 클릭 핸들러
  const handleGenreClick = (genreId) => {
    if (selectedGenreId === genreId) {
      // 같은 장르를 다시 클릭하면 해제
      setSelectedGenreId(null);
      setQuery('');
      setSearchParams({});
    } else {
      setSelectedGenreId(genreId);
      setQuery(''); // 장르 선택 시 검색어 초기화
      setSearchParams({});
    }
  };

  // 표시할 영화 결정
  useEffect(() => {
    if (selectedGenreId) {
      // 장르 선택 시
      let result = [...(genreMovies || [])];
      // 평점 필터링
      if (minRating > 0) {
        result = result.filter(movie => movie.vote_average >= minRating);
      }
      setDisplayMovies(result);
    } else if (query) {
      // 검색어 입력 시
      let result = [...(searchMovies || [])];
      // 평점 필터링
      if (minRating > 0) {
        result = result.filter(movie => movie.vote_average >= minRating);
      }
      setDisplayMovies(result);
    } else {
      // 기본값: 인기 영화 표시
      let result = [...(popularMovies || [])];
      // 평점 필터링
      if (minRating > 0) {
        result = result.filter(movie => movie.vote_average >= minRating);
      }
      setDisplayMovies(result);
    }
  }, [selectedGenreId, genreMovies, query, searchMovies, minRating, popularMovies]);

  // 초기화 핸들러
  const handleReset = () => {
    setQuery('');
    setSearchParams({});
    setSelectedGenreId(null);
    setMinRating(0);
  };

  const loading = searchLoading || genreLoading || (popularLoading && !query && !selectedGenreId);
  const error = searchError || genreError || popularError;

  return (
    <div className="search-page">
      <Header />
      <main className="search-content">
        <div className="search-header">
          <h1>찾아보기</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="영화 제목을 입력하세요..."
              value={query}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="genre-categories">
            {GENRE_CATEGORIES.map(genre => (
              <button
                key={genre.id}
                className={`genre-category-btn ${selectedGenreId === genre.id ? 'active' : ''}`}
                onClick={() => handleGenreClick(genre.id)}
              >
                <FontAwesomeIcon icon={genre.icon} />
                <span>{genre.name}</span>
              </button>
            ))}
          </div>

          <div className="filters">
            <select 
              value={minRating} 
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="filter-select"
            >
              <option value="0">모든 평점</option>
              <option value="5">5점 이상</option>
              <option value="6">6점 이상</option>
              <option value="7">7점 이상</option>
              <option value="8">8점 이상</option>
              <option value="9">9점 이상</option>
            </select>

            <button onClick={handleReset} className="reset-btn">
              초기화
            </button>
          </div>
        </div>

        {loading && <div className="loading-message">검색 중...</div>}
        {error && <div className="error-message">{error}</div>}

        {!loading && !error && (
          <div className="search-results">
            {displayMovies.length > 0 ? (
              <div className="movie-grid">
                {displayMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                {selectedGenreId 
                  ? '해당 장르의 영화가 없습니다.' 
                  : query 
                  ? '검색 결과가 없습니다.' 
                  : '장르를 선택하거나 검색어를 입력해주세요.'}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
