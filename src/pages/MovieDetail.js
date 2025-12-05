// 영화 상세 정보 페이지
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/Header';
import { useMovieDetail } from '../hooks/useMovies';
import { getBackdropUrl, getPosterUrl } from '../utils/imageUrl';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetail(id);

  if (loading) return <div className="detail-loading">로딩 중...</div>;
  if (error) return <div className="detail-error">{error}</div>;
  if (!movie) return <div className="detail-error">영화 정보를 찾을 수 없습니다.</div>;

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'original');
  const posterUrl = getPosterUrl(movie.poster_path, 'large');

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  return (
    <div className="movie-detail-page">
      <Header />
      
      <div 
        className="detail-backdrop"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <main className="detail-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} /> 뒤로 가기
        </button>

        <div className="detail-grid">
          <div className="poster-section">
            <img src={posterUrl} alt={movie.title} className="detail-poster" />
          </div>

          <div className="info-section">
            <h1 className="detail-title">{movie.title}</h1>
            {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}

            <div className="meta-info">
              <span className="rating">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="year">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {movie.release_date?.split('-')[0]}
              </span>
              <span className="runtime">
                <FontAwesomeIcon icon={faClock} />
                {formatRuntime(movie.runtime)}
              </span>
            </div>

            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>

            <div className="overview-section">
              <h3>개요</h3>
              <p className="overview">{movie.overview || "상세 줄거리가 없습니다."}</p>
            </div>

            {/* 추가 정보: 제작사, 예산 등 필요시 추가 */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
