// 전역 상태 관리를 위한 Context
import { createContext, useContext, useState, useEffect } from 'react';
import { isLoggedIn, getCurrentUser } from '../services/auth';
import { getWishlist } from '../services/wishlist';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 로드
  useEffect(() => {
    if (isLoggedIn()) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  // 위시리스트 로드
  useEffect(() => {
    const loadWishlist = () => {
      const wishlistData = getWishlist();
      setWishlist(wishlistData);
    };

    loadWishlist();
    window.addEventListener('wishlist-updated', loadWishlist);
    window.addEventListener('storage', loadWishlist);

    return () => {
      window.removeEventListener('wishlist-updated', loadWishlist);
      window.removeEventListener('storage', loadWishlist);
    };
  }, []);

  // 위시리스트 업데이트
  const updateWishlist = () => {
    const wishlistData = getWishlist();
    setWishlist(wishlistData);
  };

  // 사용자 정보 업데이트
  const updateUser = (userData) => {
    setUser(userData);
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    setWishlist([]);
  };

  const value = {
    user,
    wishlist,
    isLoading,
    updateWishlist,
    updateUser,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

