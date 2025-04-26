import axios from 'axios';

// 액세스 토큰 쿠키 조회
export function getAccessTokenFromCookie() {
  const matches = document.cookie.match(/accessToken=([^;]*)/);
  return matches ? matches[1] : null;
}

// 액세스 토큰 쿠키 설정
export function setAccessTokenToCookie(token: string) {
  document.cookie = `accessToken=${token}; path=/;`;
}

// 액세스 토큰 갱신 API
export async function refreshAccessToken() {
  const response = await axios.post(
    'http://localhost:8080/api/v1/oauth/reissue',
    {},
    {
      withCredentials: true,
    }
  );

  return response.data.result;
}

// 로그아웃
export function logout() {
  // 쿠키 삭제
  document.cookie =
    'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie =
    'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  // 페이지 리다이렉트
  window.location.href = '/';
}
