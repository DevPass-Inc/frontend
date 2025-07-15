import {
  ApiResponse,
  DevExperience,
  DevExperienceDetail,
  Internship,
  Project,
  Stack,
} from '../types/dev-experience.types';
import api from '../lib/axios';

// 개발 경험 리스트 조회 API
export const fetchDevExperiences = async (): Promise<DevExperience[]> => {
  const response = await api.get<ApiResponse<DevExperience[]>>(
    '/developments/dev-experiences'
  );

  return response.data.result;
};

// 개발 경험 등록 API
export const addDevExperience = async (newExp: {
  title: string;
  description: string;
}): Promise<DevExperience> => {
  const response = await api.post<ApiResponse<DevExperience>>(
    '/developments/dev-experiences',
    newExp
  );

  return response.data.result;
};

// 개발 경험 상세 조회 API
export const fetchDevExperienceById = async (
  id: number
): Promise<DevExperienceDetail> => {
  const response = await api.get<ApiResponse<DevExperienceDetail>>(
    `/developments/dev-experiences/${id}`
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
    stackIds: number[];
  }
): Promise<Project> => {
  const response = await api.post<ApiResponse<Project>>(
    `/developments/projects/${id}`,
    { ...newProject, stackIds: newProject.stackIds }
  );

  return response.data.result;
};

// 프로젝트 경험 상세 조회 API
export const fetchProjectExperienceById = async (
  id: number
): Promise<Project> => {
  const response = await api.get<ApiResponse<Project>>(
    `/developments/projects/${id}`
  );

  return response.data.result;
};

// 프로젝트 경험 수정 API
export const updateProjectExperienceById = async (
  id: number,
  updatedProject: {
    title: string;
    introduce: string;
    position: string;
    startDate: string;
    endDate: string;
    content: string;
  }
): Promise<Project> => {
  const response = await api.put<ApiResponse<Project>>(
    `/developments/projects/${id}`,
    updatedProject
  );

  return response.data.result;
};

// 프로젝트 경험 삭제 API
export const deleteProjectExperienceById = async (
  id: number
): Promise<void> => {
  const response = await api.delete(`/developments/projects/${id}`);
  console.log('프로젝트 경험 삭제 성공', response.data);
};

// 기술 스택 조회 API
export const fetchStackList = async (): Promise<Stack[]> => {
  const response = await api.get('/stacks');

  return response.data.result.stacks;
};

// 기술스택 등록 API
export const addStackExperienceById = async (
  experienceId: number,
  stackIds: number[]
): Promise<Stack[]> => {
  const response = await api.post<ApiResponse<Stack[]>>(
    `/developments/stacks/${experienceId}`,
    {
      stackIds,
    }
  );

  return response.data.result;
};

// 기술스택 수정 API
export const updateStackExperienceById = async (
  experienceId: number,
  stackIds: number[]
): Promise<Stack[]> => {
  const response = await api.put(`/developments/stacks/${experienceId}`, {
    stackIds,
  });

  return response.data.result.stacks;
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
  const response = await api.post<ApiResponse<Internship>>(
    `/developments/internships/${id}`,
    newInternship
  );

  return response.data.result;
};

/**
 * TODO: 인턴십 경험 상세 조회 API
 */

/**
 * TODO: 인턴십 경험 수정 API
 */

/**
 * TODO: 인턴십 경험 삭제 API
 */
