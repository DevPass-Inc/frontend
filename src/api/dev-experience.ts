import axios from 'axios';
import {
  ApiResponse,
  DevExperience,
  DevExperienceDetail,
  Internship,
  Project,
  Stack,
} from '../types/dev-experience.types';

// 개발 경험 리스트 조회 API
export const fetchDevExperiences = async (): Promise<DevExperience[]> => {
  const response = await axios.get<ApiResponse<DevExperience[]>>(
    `http://localhost:8080/api/developments/dev-experiences`
  );

  return response.data.result;
};

// 개발 경험 등록 API
export const addDevExperience = async (newExp: {
  title: string;
  description: string;
}): Promise<DevExperience> => {
  const response = await axios.post<ApiResponse<DevExperience>>(
    `http://localhost:8080/api/developments/dev-experiences`,
    newExp
  );

  return response.data.result;
};

// 개발 경험 상세 조회 API
export const fetchDevExperienceById = async (
  id: number
): Promise<DevExperienceDetail> => {
  const response = await axios.get<ApiResponse<DevExperienceDetail>>(
    `http://localhost:8080/api/developments/dev-experiences/${id}`
  );

  return response.data.result;
};

// 프로젝트 경험 등록 API
export const addProjectExperienceById = async (
  id: number,
  newProject: {
    title: string;
    introduce: string;
    position: string;
    startDate: string;
    endDate: string;
    content: string;
  }
): Promise<Project> => {
  const response = await axios.post<ApiResponse<Project>>(
    `http://localhost:8080/api/developments/projects/${id}`,
    newProject
  );

  return response.data.result;
};

// 기술스택 등록 API
export const addStackExperienceById = async (
  id: number,
  stacks: string[]
): Promise<Stack[]> => {
  const response = await axios.post<ApiResponse<Stack[]>>(
    `http://localhost:8080/api/developments/stacks/${id}`,
    {
      stacks: stacks,
    }
  );

  return response.data.result;
};

// 인턴십 경험 등록 API
export const addInternshipExperienceById = async (
  id: number,
  newInternship: {
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
    content: string;
  }
): Promise<Internship> => {
  const response = await axios.post<ApiResponse<Internship>>(
    `http://localhost:8080/api/developments/internships/${id}`,
    newInternship
  );

  return response.data.result;
};
