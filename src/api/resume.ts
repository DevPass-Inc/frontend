import api from '../lib/axios';

interface ResumeDetail {
  name: string;
  title: string;
  phone: string;
  email: string;
  github: string;
  blog: string;
  summary: string[];
}

interface ResumeExperience {
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

interface Resume {
  id: string;
  userId: number;
  resume: ResumeDetail;
  experience: ResumeExperience[];
  activities: ResumeActivity[];
  skills: ResumeSkill[];
  education: ResumeEducation[];
}

// 이력서 생성 및 저장 API
export const generateResumeByDevExpIdAndRecrId = async (
  devExperienceId: number,
  recruitmentId: number,
  includeGithub: boolean = true
): Promise<Resume> => {
  const response = await api.get<Resume>(
    `/resume/generate/${devExperienceId}/${recruitmentId}?includeGithub=${includeGithub}`
  );

  return response.data;
};
