import api from '../lib/axios';
import { ApiResponse } from '../types/dev-experience.types';

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

export interface RecruitmentDetail {
  recruitmentId: number;
  companyName: string;
  position: string;
  location: string;
  career: string;
  mainTask: string;
  qualification: string;
  preferred: string;
  benefit: string;
  deadline: string;
  imageUrl: string;
}

export interface RecruitmentListContent {
  id: number;
  imageUrl: string;
  companyName: string;
  position: string;
  career: string;
  location: string;
  stacks: string[];
}

export interface RecruitmentList {
  totalPages: number;
  totalElements: number;
  size: number;
  content: RecruitmentListContent[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  numberOfElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
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

// 채용공고 리스트 조회 API
export const fetchRecruitmentList = async (
  page: number = 1,
  size: number = 8,
  direction: string = 'ASC'
): Promise<RecruitmentList> => {
  const response = await api.get<ApiResponse<RecruitmentList>>(
    `/recruitments`,
    {
      params: {
        page,
        size,
        direction,
      },
    }
  );

  return response.data.result;
};

// 채용공고 상세 조회 API
export const fetchRecruitmentDetailById = async (
  id: number
): Promise<RecruitmentDetail> => {
  const response = await api.get<ApiResponse<RecruitmentDetail>>(
    `/recruitments/${id}`
  );

  return response.data.result;
};
