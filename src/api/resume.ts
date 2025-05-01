import api from '../lib/axios';
import { ApiResponse } from '../types/dev-experience.types';

interface ResumeDetail {
  name: string;
  title: string;
  phone: string;
  email: string;
  github: string;
  blog: string;
  summary: string[];
  experience: ResumeExperience[];
  activities: ResumeActivity[];
  skills: ResumeSkill[];
  education: ResumeEducation[];
}

export interface ResumeExperience {
  project: string;
  summary: string;
  position: string;
  duration: string;
  skills: string;
  description: string[];
}

interface ResumeActivity {
  activity: string;
  dates: string;
  description: string;
}

interface ResumeSkill {
  skill: string;
  level: string;
}

interface ResumeEducation {
  name: string;
  major: string;
  duration: string;
}

export interface Resume {
  id: string;
  userId: number;
  resume: ResumeDetail;
}

// 이력서 생성 및 저장 API
export const generateResumeByDevExpIdAndRecrId = async (
  devExperienceId: number,
  recruitmentId: number,
  includeGithub: boolean = true
): Promise<Resume> => {
  const response = await api.get<ApiResponse<Resume>>(
    `/resume/generate/${devExperienceId}/${recruitmentId}?includeGithub=${includeGithub}`
  );

  return response.data.result;
};

// 사용자의 이력서 리스트 조회 API
export const fetchResumeList = async (): Promise<Resume[]> => {
  const response = await api.get<ApiResponse<Resume[]>>('/resume');

  return response.data.result;
};
