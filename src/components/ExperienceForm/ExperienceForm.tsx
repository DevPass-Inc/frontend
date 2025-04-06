import { useMutation, useQueryClient } from '@tanstack/react-query';
import ExperienceInputItem from '../../shared/components/ExperienceInputItem';
import ExperienceSaveOrAddButton from '../../shared/components/ExperienceSaveOrAddButton';
import { DevExperienceDetail, Stack } from '../../types/dev-experience.types';
import { useState } from 'react';
import {
  addInternshipExperienceById,
  addProjectExperienceById,
  addStackExperienceById,
} from '../../api/dev-experience';

const PROJECT_FIELDS = [
  { name: 'title', label: '프로젝트명' },
  { name: 'introduce', label: '프로젝트 개요 (간단한 소개)' },
  { name: 'position', label: '담당 분야' },
  { name: 'startDate', label: '기간 시작일' },
  { name: 'endDate', label: '기간 종료일' },
  { name: 'content', label: '구현 내용' },
];

const STACK_FIELDS = [{ name: 'stack', label: '기술 스택 추가' }];

const INTERN_FIELDS = [
  { name: 'companyName', label: '회사명' },
  { name: 'position', label: '직무' },
  { name: 'startDate', label: '시작일' },
  { name: 'endDate', label: '종료일' },
  { name: 'content', label: '구현 내용' },
];

interface ExperienceFormProps {
  currentTab: 'project' | 'stack' | 'intern';
  selectedDevExperienceDetail: DevExperienceDetail;
  selectedExpId: number;
}

function ExperienceForm(props: ExperienceFormProps) {
  const { currentTab, selectedDevExperienceDetail, selectedExpId } = props;

  const queryClient = useQueryClient();

  const [projectForm, setProjectForm] = useState({
    title: '',
    introduce: '',
    position: '',
    startDate: '',
    endDate: '',
    content: '',
  }); // 프로젝트 등록 데이터 폼
  const [stackForm, setStackForm] = useState<string[]>([]); // 스택 등록 데이터 폼
  const [internshipForm, setInternshipForm] = useState({
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    content: '',
  }); // 인턴 등록 데이터 폼

  // 프로젝트 등록 API 호출
  const addProjectMutation = useMutation({
    mutationFn: (data: typeof projectForm) =>
      addProjectExperienceById(selectedExpId, data),
    onSuccess: (data) => {
      console.log('프로젝트 등록 성공', data);
      queryClient.invalidateQueries(); // 캐시 무효화 -> 데이터 갱신
    },
    onError: (error) => {
      console.error('프로젝트 등록 실패', error);
      alert('프로젝트 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 스택 등록 API 호출
  const addStackMutation = useMutation({
    mutationFn: (data: Stack[]) => addStackExperienceById(selectedExpId, data),
    onSuccess: (data) => {
      console.log('스택 등록 성공', data);
      queryClient.invalidateQueries(); // 캐시 무효화 -> 데이터 갱신
    },
    onError: (error) => {
      console.error('스택 등록 실패', error);
      alert('스택 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 인턴 등록 API 호출
  const addInternshipMutation = useMutation({
    mutationFn: (data: typeof internshipForm) =>
      addInternshipExperienceById(selectedExpId, data),
    onSuccess: (data) => {
      console.log('인턴 등록 성공', data);
      queryClient.invalidateQueries(); // 캐시 무효화 -> 데이터 갱신
    },
    onError: (error) => {
      console.error('인턴 등록 실패', error);
      alert('인턴 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 저장 버튼 클릭 핸들러
  const handleSaveOrAddButtonClick = () => {
    if (currentTab === 'project') {
      // 프로젝트 경험 등록 API 호출
      addProjectMutation.mutate(projectForm);
    } else if (currentTab === 'stack') {
      // 스택 경험 등록 API 호출
      addStackMutation.mutate(stackForm);
    } else if (currentTab === 'intern') {
      // 인턴 경험 등록 API 호출
      addInternshipMutation.mutate(internshipForm);
    }
  };

  return (
    <>
      {/* 프로젝트 */}
      {currentTab === 'project' && (
        <div className='flex w-full flex-col gap-3.5'>
          {PROJECT_FIELDS.map((project, idx) => (
            <ExperienceInputItem
              key={`${project.name}-${idx}`}
              label={project.label}
              name={project.name}
              value={projectForm[project.name as keyof typeof projectForm]}
              onChange={(e) => {
                setProjectForm((prev) => ({
                  ...prev,
                  [project.name]: e.target.value,
                }));
              }}
            />
          ))}
        </div>
      )}

      {/* 스택 */}
      {currentTab === 'stack' && (
        <div className='flex w-full flex-col gap-4.5'>
          <div className='flex w-full flex-col gap-3.5'>
            {STACK_FIELDS.map((stack, idx) => (
              <ExperienceInputItem
                key={`${stack.label}-${idx}`}
                name={stack.name}
                label={stack.label}
              />
            ))}
          </div>
          <div>
            <span className='text-sm leading-4 font-semibold text-[#4c4c4c]'>
              선택된 기술 스택
            </span>
          </div>
        </div>
      )}

      {/* 인턴 */}
      {currentTab === 'intern' && (
        <div className='flex w-full flex-col gap-3.5'>
          {INTERN_FIELDS.map((intern, idx) => (
            <ExperienceInputItem
              key={`${intern.name}-${idx}`}
              label={intern.label}
              name={intern.name}
              value={internshipForm[intern.name as keyof typeof internshipForm]}
              onChange={(e) => {
                setInternshipForm((prev) => ({
                  ...prev,
                  [intern.name]: e.target.value,
                }));
              }}
            />
          ))}
        </div>
      )}

      {/* 저장 / 프로젝트 추가 버튼 */}
      <div className='mt-20 flex w-full justify-end'>
        <ExperienceSaveOrAddButton
          title={'저장'}
          onClick={handleSaveOrAddButtonClick}
        />
      </div>
    </>
  );
}

export default ExperienceForm;
