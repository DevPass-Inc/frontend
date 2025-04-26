import api from '../lib/axios';

interface Stack {
  stack: string;
  required: boolean;
}

export interface CompanyMatchingResultItem {
  companyName: string;
  position: string;
  finalScore: string;
  stacks: Stack[];
}

export interface FetchCompanyMatchingResultsResponse {
  httpStatus: string;
  code: string;
  message: string;
  result: CompanyMatchingResultItem[];
}

// AI 기업 매칭 조회
export const fetchCompanyMatchingResults = async () => {
  try {
    const response = await api.post<FetchCompanyMatchingResultsResponse>(
      '/recruitments/ai',
      {
        userStacks: ['Java', 'Spring Boot'],
        userResume: 'Java Spring Boot로 API 서버 개발을 해 본 경험이 있습니다.',
      }
    );

    console.log(response.data.result);

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('기업 매칭 결과 조회에 실패했습니다.');
  }
};
