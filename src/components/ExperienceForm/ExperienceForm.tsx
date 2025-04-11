import { useMutation, useQueryClient } from '@tanstack/react-query';
import ExperienceInputItem from '../../shared/components/ExperienceInputItem';
import ExperienceSaveOrAddButton from '../../shared/components/ExperienceSaveOrAddButton';
import { DevExperienceDetail, Stack } from '../../types/dev-experience.types';
import { useEffect, useState } from 'react';
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

  const [isInputMode, setIsInputMode] = useState<boolean>(false); // 입력 모드 여부

  // 프로젝트 등록 데이터 폼
  const [projectForm, setProjectForm] = useState({
    title: '',
    introduce: '',
    position: '',
    startDate: '',
    endDate: '',
    content: '',
  });
  // 스택 등록 데이터 폼
  const [stackForm, setStackForm] = useState<string[]>([]);
  // 인턴 등록 데이터 폼
  const [internshipForm, setInternshipForm] = useState({
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    content: '',
  });

  // 프로젝트 등록 API 호출
  const addProjectMutation = useMutation({
    mutationFn: (data: typeof projectForm) =>
      addProjectExperienceById(selectedExpId, data),
    onSuccess: (data) => {
      console.log('프로젝트 등록 성공', data);
      queryClient.invalidateQueries(); // 캐시 무효화 -> 데이터 갱신

      // 입력 폼 초기화
      setProjectForm({
        title: '',
        introduce: '',
        position: '',
        startDate: '',
        endDate: '',
        content: '',
      });

      // 입력 모드 종료
      setIsInputMode(false);
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

      // 입력 모드 종료
      setIsInputMode(false);
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

      // 입력 폼 초기화
      setInternshipForm({
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        content: '',
      });

      // 입력 모드 종료
      setIsInputMode(false);
    },
    onError: (error) => {
      console.error('인턴 등록 실패', error);
      alert('인턴 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 저장 버튼 클릭 핸들러
  const handleSaveOrAddButtonClick = () => {
    if (isInputMode) {
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
      // 입력 모드 종료
      setIsInputMode(false);
    } else {
      // 입력 모드로 전환
      setIsInputMode(true);
    }
  };

  // 기술 스택 추가 엔터키 핸들러
  const handleStackInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      const inputValue = (e.target as HTMLInputElement).value; // 입력값 가져오기

      if (inputValue === '') {
        alert('기술 스택을 입력해주세요.'); // 입력값이 비어있을 경우 알림
        return;
      }

      if (inputValue && !stackForm.includes(inputValue)) {
        // 입력값이 비어있지 않고, 기존 스택에 없는 경우에만 추가
        setStackForm((prev) => [...prev, inputValue]); // 기존의 기술 스택에 추가
        (e.target as HTMLInputElement).value = ''; // 입력 필드 초기화
      } else {
        alert('이미 추가된 기술 스택입니다.'); // 중복된 경우 알림
      }
    }
  };

  useEffect(() => {
    if (selectedDevExperienceDetail) {
      setStackForm(
        selectedDevExperienceDetail.stacks.map((stack) => stack.stack)
      );
    }
  }, [selectedDevExperienceDetail]);

  useEffect(() => {
    setIsInputMode(false); // 탭 변경 시 입력 모드 종료
  }, [currentTab]);

  return (
    <>
      {/* 프로젝트 */}
      {currentTab === 'project' && (
        <div
          className={`${isInputMode ? 'gap-3.5' : 'gap-6'} flex w-full flex-col`}
        >
          {/* 기존 프로젝트 목록 */}
          {!isInputMode &&
            selectedDevExperienceDetail.projects.length > 0 &&
            selectedDevExperienceDetail.projects.map((project) => (
              <div
                key={project.id}
                style={{ boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)' }}
                className='flex h-18 w-full cursor-pointer flex-col gap-1.25 rounded-[5px] bg-white px-5 py-3 text-[#1E1E1E] transition-all duration-200 hover:bg-gray-50'
              >
                <span className='text-xl leading-6 font-semibold'>
                  {project.title}
                </span>
                <span className='text-base leading-[19px]'>
                  {project.introduce}
                </span>
              </div>
            ))}

          {/* 프로젝트 입력 폼 */}
          {isInputMode &&
            PROJECT_FIELDS.map((project, idx) => (
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
            <div className='flex w-full flex-col gap-1.25'>
              <span className='text-sm leading-4 font-medium'>
                기술 스택 추가
              </span>
              <div
                className='flex h-10 w-full rounded-[5px]'
                style={{ border: '1px solid #898989B2' }}
              >
                <input
                  type='text'
                  className='text-main h-full w-full bg-transparent px-3 text-sm outline-none'
                  placeholder='기술 스택을 입력해주세요.'
                  onKeyDown={handleStackInputKeyDown}
                />
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col items-start gap-4.5'>
            <span className='text-sm leading-4 font-semibold text-[#4c4c4c]'>
              선택된 기술 스택
            </span>
            <div className='flex w-full items-center justify-start gap-3'>
              {stackForm.map((stack, idx) => (
                <div
                  key={`${stack}-${idx}`}
                  className='flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.25 text-xs font-semibold text-[#1D40AF]'
                >
                  {stack}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 인턴 */}
      {currentTab === 'intern' && (
        <div
          className={`${isInputMode ? 'gap-3.5' : 'gap-6'} flex w-full flex-col`}
        >
          {/* 기존 인턴 목록 */}
          {!isInputMode &&
            selectedDevExperienceDetail.internships.length > 0 &&
            selectedDevExperienceDetail.internships.map((intern) => (
              <div
                key={intern.id}
                style={{ boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)' }}
                className='flex h-18 w-full cursor-pointer flex-col gap-1.25 rounded-[5px] bg-white px-5 py-3 text-[#1E1E1E] transition-all duration-200 hover:bg-gray-50'
              >
                <span className='text-xl leading-6 font-semibold'>
                  {intern.companyName}
                </span>
                <span className='text-base leading-[19px]'>
                  {intern.position}
                </span>
              </div>
            ))}

          {/* 인턴 입력 폼 */}
          {isInputMode &&
            INTERN_FIELDS.map((intern, idx) => (
              <ExperienceInputItem
                key={`${intern.name}-${idx}`}
                label={intern.label}
                name={intern.name}
                value={
                  internshipForm[intern.name as keyof typeof internshipForm]
                }
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
          title={isInputMode ? '저장' : '추가'}
          onClick={handleSaveOrAddButtonClick}
        />
      </div>
    </>
  );
}

export default ExperienceForm;
