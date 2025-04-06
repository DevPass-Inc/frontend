import axios from 'axios';

export interface DevExperience {
  id: number;
  title: string;
  description: string;
}

interface FetchDevExperienceResponse {
  httpStatus: string;
  code: string;
  message: string;
  result: DevExperience[];
}

interface AddDevExperienceResponse {
  httpStatus: string;
  code: string;
  message: string;
  result: DevExperience;
}

// 개발 경험 리스트 조회 API
export const fetchDevExperiences = async (): Promise<DevExperience[]> => {
  const response = await axios.get<FetchDevExperienceResponse>(
    `http://localhost:8080/api/developments/dev-experiences`
  );

  return response.data.result;
};

// 개발 경험 등록 API
export const addDevExperience = async (newExp: {
  title: string;
  description: string;
}): Promise<DevExperience> => {
  const response = await axios.post<AddDevExperienceResponse>(
    `http://localhost:8080/api/developments/dev-experiences`,
    newExp
  );

  return response.data.result;
};
