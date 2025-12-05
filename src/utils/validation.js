// 유효성 검사 유틸리티

// 이메일 형식 검증
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 검증 (최소 6자 이상)
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// 비밀번호 확인 검증
export const isPasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

