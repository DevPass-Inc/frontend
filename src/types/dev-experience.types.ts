// API 기본 응답 타입
export interface ApiResponse<T> {
  httpStatus: string;
  code: string;
  message: string;
  result: T;
}

// 개발 경험 (프로젝트) 타입
export interface Project {
  id: number;
  title: string;
  introduce: string;
  position: string;
  startDate: string;
  endDate: string;
  content: string;
}

// 개발 경험 (인턴십) 타입
export interface Internship {
  id: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  content: string;
}

// 개발 경험 (기술스택) 타입
export interface Stack {
  id: number;
  name: string;
  isRequired?: boolean;
}

// 개발 경험 조회 데이터 타입
export interface DevExperience {
  id: number;
  title: string;
  description: string;
}

// 개발 경험 상세 조회 데이터 타입
export interface DevExperienceDetail {
  devExperience: DevExperience;
  projects: Project[];
  internships: Internship[];
  stacks: Stack[];
}
