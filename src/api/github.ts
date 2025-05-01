import api from '../lib/axios';
import { ApiResponse } from '../types/dev-experience.types';

interface PinnedRepo {
  name: string;
  description: string;
  readme: string;
}

export interface GithubInfo {
  login: string;
  profileReadme: string;
  pinnedRepos: PinnedRepo[];
}

// 로그인된 사용자의 깃허브 정보 조회 API
export const fetchGithubInfo = async (
  maxPinned: number = 6
): Promise<GithubInfo> => {
  const response = await api.get<ApiResponse<GithubInfo>>(
    `/github/details?maxPinned=${maxPinned}`
  );

  return response.data.result;
};
