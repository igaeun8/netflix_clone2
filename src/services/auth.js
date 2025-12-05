// 인증 관련 서비스 (Authentication.js 참고)
import { STORAGE_KEYS } from '../constants/storage';

// 사용자 목록 가져오기
const getUsers = () => {
  const usersStr = localStorage.getItem(STORAGE_KEYS.USERS);
  return usersStr ? JSON.parse(usersStr) : [];
};

// 사용자 저장
const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

// 로그인 시도
export const tryLogin = (email, password, success, fail, saveToken = true) => {
  const users = getUsers();
  const user = users.find(u => u.id === email && u.password === password);

  if (user) {
    if (saveToken) {
      localStorage.setItem(STORAGE_KEYS.TMDB_API_KEY, user.password); // API 키 저장
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
    success(user);
  } else {
    fail('아이디 또는 비밀번호가 올바르지 않습니다.');
  }
};

// 회원가입 시도
export const tryRegister = (email, password, success, fail) => {
  const users = getUsers();
  const userExists = users.some(u => u.id === email);

  if (userExists) {
    fail('이미 존재하는 이메일입니다.');
    return;
  }

  const newUser = {
    id: email,
    password: password
  };

  users.push(newUser);
  saveUsers(users);
  success(newUser);
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  localStorage.removeItem(STORAGE_KEYS.KEEP_LOGIN);
  // API 키는 유지 (선택사항)
};

// 현재 로그인된 사용자 확인
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userStr ? JSON.parse(userStr) : null;
};

// 로그인 상태 확인
export const isLoggedIn = () => {
  return !!getCurrentUser();
};

// Keep Login 설정
export const setKeepLogin = (value) => {
  if (value) {
    localStorage.setItem(STORAGE_KEYS.KEEP_LOGIN, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.KEEP_LOGIN);
  }
};

// Keep Login 상태 확인
export const getKeepLogin = () => {
  return localStorage.getItem(STORAGE_KEYS.KEEP_LOGIN) === 'true';
};

