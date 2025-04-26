import { AxiosInstance } from 'axios';
import {
  getAccessTokenFromCookie,
  logout,
  refreshAccessToken,
  setAccessTokenToCookie,
} from './token';

export function setInterceptors(api: AxiosInstance) {
  // 요청 인터셉터 설정
  api.interceptors.request.use(
    (config) => {
      // 액세스 토큰 조회
      const token = getAccessTokenFromCookie();
      if (token) {
        // 헤더에 액세스 토큰 추가
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 설정
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 401 에러이고 재시도가 아닌 경우
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // 액세스 토큰 갱신
          const newAccessToken = await refreshAccessToken();
          // 액세스 토큰 쿠키 설정
          setAccessTokenToCookie(newAccessToken);
          // 헤더 업데이트
          api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (e) {
          logout();
          return Promise.reject(e);
        }
      }

      return Promise.reject(error);
    }
  );
}
