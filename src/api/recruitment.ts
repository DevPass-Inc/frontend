import api from '../lib/axios';
import { ApiResponse } from '../types/dev-experience.types';

interface Stack {
  id: number;
  name: string;
  isRequired?: boolean;
}

export interface CompanyMatchingResultItem {
  recruitmentId: number;
  companyName: string;
  position: string;
  finalScore: string;
  stacks: Stack[];
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
  id: number | string; // 실제로는 string으로 내려옴, number로 저장하면 파싱 필요
  companyId: number;
  companyName: string;
  employeeCount: string;
  newHireAvgSalary: number;
  positionName: string;
  position: string;
  location: {
    region: string;
    district: string;
  };
  career: string;
  mainTask: string;
  qualification: string;
  preferred: string;
  benefit: string;
  deadline: string;
  imageUrl: string;
  minCareer: number;
  maxCareer: number;
  stacks: Stack[];
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
export const fetchCompanyMatchingResults = async (
  resumeId: string
): Promise<CompanyMatchingResultItem[]> => {
  const response = await api.post<ApiResponse<CompanyMatchingResultItem[]>>(
    '/recruitments/recommendations',
    {
      resume_id: resumeId,
    }
  );

  return response.data.result;
};

// 채용공고 리스트 조회 API
export const fetchRecruitmentList = async (
  page: number = 0,
  size: number = 8,
  sort: string = 'DESC',
  keyword?: string,
  position?: string,
  minCareer?: string,
  stackId?: number,
  region?: string
): Promise<RecruitmentList> => {
  const response = await api.get<ApiResponse<RecruitmentList>>(
    `/recruitments`,
    {
      params: {
        page,
        size,
        sort,
        keyword,
        position,
        minCareer,
        stackIds: stackId,
        region,
      },
    }
  );

  console.log(response.data.result);

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
