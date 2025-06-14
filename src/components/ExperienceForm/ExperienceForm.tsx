import { useMutation, useQueryClient } from '@tanstack/react-query';
import ExperienceInputItem from '../../shared/components/ExperienceInputItem';
import ExperienceSaveOrAddButton from '../../shared/components/ExperienceSaveOrAddButton';
import { DevExperienceDetail } from '../../types/dev-experience.types';
import { useEffect, useState } from 'react';
import {
  addInternshipExperienceById,
  addProjectExperienceById,
  addStackExperienceById,
  deleteProjectExperienceById,
  fetchProjectExperienceById,
  updateProjectExperienceById,
  updateStackExperienceById,
} from '../../api/dev-experience';
import ExperiencePreviewItem from '../ExperiencePreviewItem';
import { MdCancel, MdClose } from 'react-icons/md';
import SkillStackUpdateModal from '../SkillStackUpdateModal';

// 프로젝트 입력 폼 필드
const PROJECT_FIELDS = [
  {
    name: 'title',
    label: '프로젝트명',
    placeholder: '프로젝트명을 입력해주세요',
  },
  {
    name: 'introduce',
    label: '프로젝트 개요 (간단한 소개)',
    placeholder: '프로젝트에 대해 간단하게 소개해 주세요',
  },
  {
    name: 'position',
    label: '담당 분야',
    placeholder: '본인의 역할이나 맡은 업무를 입력해주세요',
  },
  {
    name: 'content',
    label: '구현 내용',
    placeholder:
      '주요 기능, 사용 기술, 문제 해결 경험 등을 상세히 작성해주세요',
  },
  {
    name: 'startDate',
    label: '기간 시작일',
    placeholder: '프로젝트 시작일을 선택해주세요',
    isDate: true,
  },
  {
    name: 'endDate',
    label: '기간 종료일',
    placeholder: '프로젝트 종료일을 선택해주세요',
    isDate: true,
  },
];

// 인턴 입력 폼 필드
const INTERN_FIELDS = [
  {
    name: 'companyName',
    label: '회사명',
    placeholder: '근무한 회사명을 입력해주세요',
  },
  {
    name: 'position',
    label: '직무',
    placeholder: '담당했던 직무나 역할을 입력해주세요',
  },
  {
    name: 'content',
    label: '구현 내용',
    placeholder: '참여한 업무, 주요 성과, 사용 기술 등을 상세히 작성해주세요',
  },
  {
    name: 'startDate',
    label: '시작일',
    placeholder: '인턴십 시작일을 선택해주세요',
    isDate: true,
  },
  {
    name: 'endDate',
    label: '종료일',
    placeholder: '인턴십 종료일을 선택해주세요',
    isDate: true,
  },
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
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // 수정 모드 여부
  const [isStackModalOpen, setIsStackModalOpen] = useState<boolean>(false); // 스택 모달 여부

  // 프로젝트 등록 데이터 폼
  const [projectForm, setProjectForm] = useState({
    title: '',
    introduce: '',
    position: '',
    startDate: '',
    endDate: '',
    content: '',
  });
  const [stackForm, setStackForm] = useState<string[]>([]); // 스택 등록 데이터 폼
  const [existingStacks, setExistingStacks] = useState<string[]>([]); // 기존 스택 데이터
  // 인턴 등록 데이터 폼
  const [internshipForm, setInternshipForm] = useState({
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    content: '',
  });

  // 선택된 프로젝트 ID
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  // 프로젝트 등록 API 호출
  const addProjectMutation = useMutation({
    mutationFn: (data: typeof projectForm) =>
      addProjectExperienceById(selectedExpId, data),
    onSuccess: (data) => {
      console.log('프로젝트 등록 성공', data);
      queryClient.invalidateQueries(); // 캐시 무효화 -> 데이터 갱신

      // 입력 폼 초기화
      resetProjectForm();

      // 입력 모드 종료
      setIsInputMode(false);
    },
    onError: (error) => {
      console.error('프로젝트 등록 실패', error);
      alert('프로젝트 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 프로젝트 수정 API 호출
  const updateProjectMutation = useMutation({
    mutationFn: ({
      selectedProjectId,
      data,
    }: {
      selectedProjectId: number;
      data: typeof projectForm;
    }) => updateProjectExperienceById(selectedProjectId, data),
    onSuccess: (data) => {
      console.log('프로젝트 수정 성공', data);
      queryClient.invalidateQueries(); // 캐시 무효화 -> 데이터 갱싼

      // 입력 모드 종료
      setIsInputMode(false);

      // 입력 폼 초기화
      resetProjectForm();

      // 수정 모드 종료
      setIsEditMode(false);
    },
    onError: (error) => {
      console.error('프로젝트 수정 실패', error);
      alert('프로젝트 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 프로젝트 삭제 API 호출
  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) => deleteProjectExperienceById(id),
    onSuccess: () => {
      console.log('프로젝트 경험 삭제 성공');
      queryClient.invalidateQueries(); // 캐시 무효화 -> 데이터 갱신

      // 입력 모드 종료
      setIsInputMode(false);

      // 입력 폼 초기화
      resetProjectForm();

      // 수정 모드 종료
      setIsEditMode(false);
    },
    onError: (error) => {
      console.error('프로젝트 경험 삭제 실패', error);
      alert('프로젝트 경험 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 스택 등록 API 호출
  const addStackMutation = useMutation({
    mutationFn: (data: string[]) => addStackExperienceById(selectedExpId, data),
    onSuccess: (data) => {
      console.log('스택 등록 성공', data);
      queryClient.invalidateQueries(); // 캐시 무효화 -> 데이터 갱신

      // 입력 모드 종료
      setIsInputMode(false);

      // 입력 폼 초기화
      resetStackForm();
    },
    onError: (error) => {
      console.error('스택 등록 실패', error);
      alert('스택 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 스택 수정 API 호출
  const updateStackMutation = useMutation({
    mutationFn: (data: string[]) =>
      updateStackExperienceById(selectedExpId, data),
    onSuccess: (data) => {
      console.log('스택 수정 성공', data);
      queryClient.invalidateQueries(); // 캐시 무효화 -> 데이터 갱신

      setExistingStacks(data.map((stack) => stack.stack)); // 기존 스택 목록 업데이트
      setIsStackModalOpen(false); // 스택 수정 모달 닫기
    },
    onError: (error) => {
      console.error('스택 수정 실패', error);
      alert('스택 수정에 실패했습니다. 다시 시도해주세요.');
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
      resetInternshipForm();

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
    if (isInputMode && isEditMode) {
      if (currentTab === 'project') {
        // 프로젝트 경험 수정 API 호출
        updateProjectMutation.mutate({
          selectedProjectId: selectedProjectId ?? 0,
          data: projectForm,
        });
      } else if (currentTab === 'intern') {
        alert('인턴 경험 수정 기능은 아직 구현되지 않았습니다.');
      }
      // 수정 모드 종료
      setIsEditMode(false);
      setIsInputMode(false);
      resetAllInputForm(); // 입력 폼 초기화
    } else if (isInputMode && !isEditMode) {
      if (currentTab === 'project') {
        if (
          !projectForm.title ||
          !projectForm.introduce ||
          !projectForm.position ||
          !projectForm.startDate ||
          !projectForm.endDate ||
          !projectForm.content
        ) {
          alert('모든 필드를 입력해주세요.'); // 모든 필드가 입력되지 않은 경우 알림
          return;
        }

        // 프로젝트 경험 등록 API 호출
        addProjectMutation.mutate(projectForm);
      } else if (currentTab === 'stack') {
        if (stackForm.length === 0) {
          alert('기술 스택을 추가해주세요.'); // 기술 스택이 입력되지 않은 경우 알림
          return;
        }

        // 스택 경험 등록 API 호출
        addStackMutation.mutate(stackForm);
      } else if (currentTab === 'intern') {
        if (
          !internshipForm.companyName ||
          !internshipForm.position ||
          !internshipForm.startDate ||
          !internshipForm.endDate ||
          !internshipForm.content
        ) {
          alert('모든 필드를 입력해주세요.'); // 모든 필드가 입력되지 않은 경우 알림
          return;
        }

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

      if (
        inputValue &&
        !stackForm.includes(inputValue) &&
        !existingStacks.includes(inputValue)
      ) {
        // 입력값이 비어있지 않고, 기존 스택에 없는 경우에만 추가
        setStackForm((prev) => [...prev, inputValue]); // 기존의 기술 스택에 추가
        (e.target as HTMLInputElement).value = ''; // 입력 필드 초기화
      } else {
        alert('이미 추가된 기술 스택입니다.'); // 중복된 경우 알림
        (e.target as HTMLInputElement).value = ''; // 입력 필드 초기화
      }
    }
  };

  // 기술 스택 추가 버튼 클릭 핸들러
  const handleStackAddButtonClick = () => {
    const inputElement = document.querySelector(
      'input[placeholder="추가할 기술 스택을 입력해주세요."]'
    ) as HTMLInputElement;

    const inputValue = inputElement.value; // 입력값 가져오기

    if (inputValue === '') {
      alert('기술 스택을 입력해주세요.'); // 입력값이 비어있을 경우 알림
      return;
    }

    if (
      inputValue &&
      !stackForm.includes(inputValue) &&
      !existingStacks.includes(inputValue)
    ) {
      // 입력값이 비어있지 않고, 기존 스택에 없는 경우에만 추가
      setStackForm((prev) => [...prev, inputValue]); // 기존의 기술 스택에 추가
      inputElement.value = ''; // 입력 필드 초기화
    } else {
      alert('이미 추가된 기술 스택입니다.'); // 중복된 경우 알림
      inputElement.value = ''; // 입력 필드 초기화
    }
  };

  // 미리보기 아이템 클릭 핸들러
  const handlePreviewItemClick = (id: number) => {
    if (currentTab === 'project') {
      fetchProjectExperienceById(id)
        .then((res) => {
          console.log('프로젝트 상세 조회 성공', res);
          setIsInputMode(true); // 입력 모드로 전환
          setIsEditMode(true); // 수정 모드로 전환
          setProjectForm({
            title: res.title,
            introduce: res.introduce,
            position: res.position,
            startDate: res.startDate,
            endDate: res.endDate,
            content: res.content,
          });

          setSelectedProjectId(res.id); // 선택된 프로젝트 ID 업데이트
        })
        .catch((err) => {
          console.error('프로젝트 상세 조회 실패', err);
          alert('프로젝트 상세 조회에 실패했습니다. 다시 시도해주세요.');
          setSelectedProjectId(null); // 선택된 프로젝트 ID 초기화
        });
    } else if (currentTab === 'intern') {
      /**
       * TODO: 인턴십 상세 조회 API 연동
       */
      alert('인턴십 상세 조회 기능은 아직 구현되지 않았습니다.');
      return;
    }
  };

  // 취소 버튼 클릭 핸들러 (뒤로가기용)
  const handleCancelButtonClick = () => {
    setIsInputMode(false); // 입력 모드 종료
    setIsEditMode(false); // 수정 모드 종료
    resetAllInputForm(); // 입력 폼 초기화
  };

  // 프로젝트 입력 폼 초기화 함수
  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      introduce: '',
      position: '',
      startDate: '',
      endDate: '',
      content: '',
    });
  };

  // 기술 스택 입력 폼 초기화 함수
  const resetStackForm = () => {
    setStackForm([]);
  };

  // 인턴 입력 폼 초기화 함수
  const resetInternshipForm = () => {
    setInternshipForm({
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      content: '',
    });
  };

  // 전체 입력 폼 초기화 함수
  const resetAllInputForm = () => {
    setProjectForm({
      title: '',
      introduce: '',
      position: '',
      startDate: '',
      endDate: '',
      content: '',
    });
    setInternshipForm({
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      content: '',
    });
  };

  // 추가할 기술 스택 삭제 버튼 클릭 핸들러
  const handleStackDeleteButtonClick = (stack: string) => {
    setStackForm((prev) => prev.filter((item) => item !== stack)); // 선택한 스택 삭제
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteButtonClick = () => {
    if (currentTab === 'project') {
      // 현재 탭이 프로젝트 탭인 경우
      deleteProjectMutation.mutate(selectedProjectId ?? 0); // 프로젝트 경험 삭제 API 호출
    }
  };

  // 스택 수정 버튼 클릭 핸들러
  const handleStackUpdateButtonClick = () => {
    setIsStackModalOpen(true);
  };

  // 스택 모달 닫기 핸들러
  const handleCloseStackModal = () => {
    setIsStackModalOpen(false);
  };

  // 스택 수정 모달 확인 핸들러
  const handleStackUpdateModalConfirm = (updatedStacks: string[]) => {
    updateStackMutation.mutate(updatedStacks);
  };

  // 기존 기술 스택 목록 업데이트
  useEffect(() => {
    if (selectedDevExperienceDetail) {
      setExistingStacks(
        selectedDevExperienceDetail.stacks.map((stack) => stack.stack)
      );
    }
  }, [selectedDevExperienceDetail]);

  // 탭 변경 시 실행됨
  useEffect(() => {
    if (currentTab === 'stack') {
      setIsEditMode(false); // 스택 탭 클릭 시 수정 모드 종료
      setIsInputMode(true); // 스택 탭 클릭 시 입력 모드로 전환 (스택 탭은 입력 모드만 존재하기 때문)
    } else {
      setIsInputMode(false); // 탭 변경 시 입력 모드 종료
      setIsEditMode(false); // 탭 변경 시 수정 모드 종료
      resetAllInputForm(); // 입력 폼 초기화
    }
  }, [currentTab]);

  // 수정 모드 종료 시 선택된 프로젝트 ID 초기화
  useEffect(() => {
    if (!isEditMode) {
      setSelectedProjectId(null);
    }
  }, [isEditMode]);

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
              <ExperiencePreviewItem
                key={project.id}
                title={project.title}
                subtitle={project.introduce}
                onClick={() => handlePreviewItemClick(project.id)}
              />
            ))}

          {/* 프로젝트 입력 폼 */}
          {isInputMode &&
            PROJECT_FIELDS.map((project, idx) => (
              <ExperienceInputItem
                key={`${project.name}-${idx}`}
                label={project.label}
                name={project.name}
                value={projectForm[project.name as keyof typeof projectForm]}
                placeholder={project.placeholder}
                isDate={project.isDate}
                onChange={(e) => {
                  setProjectForm((prev) => ({
                    ...prev,
                    [project.name]: e.target.value,
                  }));
                }}
                onDateChange={
                  project.isDate
                    ? (date) => {
                        setProjectForm((prev) => ({
                          ...prev,
                          [project.name]: date
                            ? date.toISOString().split('T')[0] // 'yyyy-MM-dd' 형식으로 변환
                            : '',
                        }));
                      }
                    : undefined
                }
              />
            ))}
        </div>
      )}

      {/* 스택 */}
      {currentTab === 'stack' && (
        <div className='flex w-full flex-col gap-4.5'>
          {/* 기술 스택 추가 폼 */}
          <div className='flex w-full flex-col gap-3.5'>
            <div className='flex w-full flex-col gap-1.25'>
              <span className='text-sm leading-4 font-medium'>
                기술 스택 추가
              </span>

              <div className='flex h-10 w-full items-center gap-3'>
                {/* 기술 스택 입력 필드 */}
                <div
                  className='flex h-full flex-1 rounded-[5px]'
                  style={{ border: '1px solid #898989B2' }}
                >
                  <input
                    type='text'
                    className='text-main h-full w-full bg-transparent px-3 text-sm outline-none'
                    placeholder='추가할 기술 스택을 입력해주세요.'
                    onKeyDown={handleStackInputKeyDown}
                  />
                </div>

                {/* 기술 스택 추가 버튼 */}
                <button
                  type='button'
                  className='bg-main-blue flex h-full cursor-pointer items-center justify-center rounded-[5px] px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1D40AF] hover:brightness-95'
                  onClick={handleStackAddButtonClick}
                >
                  추가
                </button>
              </div>
            </div>
          </div>

          {/* 기존 기술 스택 & 추가할 기술 스택 목록 */}
          <div className='flex w-full flex-col items-start gap-4.5'>
            <span className='text-sm leading-4 font-semibold text-[#4c4c4c]'>
              선택된 기술 스택
            </span>
            {/* 기술 스택 목록 */}
            <div className='flex w-full flex-wrap items-center justify-start gap-3'>
              {/* 기존 기술 스택 */}
              {existingStacks.map((stack, idx) => (
                <div
                  key={`${stack}-${idx}`}
                  className='flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.25 text-xs font-semibold text-[#1D40AF]'
                >
                  {stack}
                </div>
              ))}

              {/* 추가할 기술 스택 */}
              {stackForm.map((stack, idx) => (
                <div
                  key={`${stack}-${idx}`}
                  className='relative flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.25'
                >
                  {/* 기술 스택명 */}
                  <span className='text-xs font-semibold text-[#1D40AF]'>
                    {stack}
                  </span>

                  {/* 삭제 버튼 */}
                  <button
                    type='button'
                    className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full p-1.5'
                    onClick={() => handleStackDeleteButtonClick(stack)}
                  >
                    <MdCancel
                      className='text-[#e95656] transition-all duration-200 hover:text-[#FF0000]'
                      size={16}
                    />
                  </button>
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
              <ExperiencePreviewItem
                key={intern.id}
                title={intern.companyName}
                subtitle={intern.position}
                onClick={() => handlePreviewItemClick(intern.id)}
              />
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
                placeholder={intern.placeholder}
                isDate={intern.isDate}
                onChange={(e) => {
                  setInternshipForm((prev) => ({
                    ...prev,
                    [intern.name]: e.target.value,
                  }));
                }}
                onDateChange={
                  intern.isDate
                    ? (date) => {
                        setInternshipForm((prev) => ({
                          ...prev,
                          [intern.name]: date
                            ? date.toISOString().split('T')[0]
                            : '',
                        }));
                      }
                    : undefined
                }
              />
            ))}
        </div>
      )}

      {/* 버튼 모음 */}
      <div className='mt-5 flex w-full items-center justify-end gap-3'>
        {/* 취소 버튼 */}
        {(isEditMode || isInputMode) && currentTab !== 'stack' && (
          <button
            type='button'
            className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded border border-solid border-gray-300 bg-transparent px-4 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100'
            onClick={handleCancelButtonClick}
          >
            취소
          </button>
        )}

        {/* 삭제 버튼 */}
        {isInputMode && isEditMode && (
          <button
            type='button'
            className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded border border-solid border-red-500 bg-transparent px-4 font-medium text-red-500 transition-all duration-200 hover:bg-red-100'
            onClick={() => {
              // 삭제 버튼 클릭 시 삭제 확인 모달 표시
              if (window.confirm('정말 삭제하시겠습니까?')) {
                handleDeleteButtonClick(); // 삭제 API 호출
              }
            }}
          >
            삭제
          </button>
        )}

        {/* 수정 버튼 (스택 탭에서만 사용) */}
        {currentTab === 'stack' && (
          <button
            type='button'
            className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded border border-solid border-blue-500 bg-transparent px-4 font-medium text-blue-500 transition-all duration-200 hover:bg-blue-100'
            onClick={handleStackUpdateButtonClick}
          >
            수정
          </button>
        )}

        {/* 수정 / 저장 / 추가 버튼 */}
        <ExperienceSaveOrAddButton
          title={isEditMode ? '수정' : isInputMode ? '저장' : '추가'}
          onClick={handleSaveOrAddButtonClick}
        />
      </div>

      {/* 스택 수정 모달 */}
      {isStackModalOpen && (
        <SkillStackUpdateModal
          existingStacks={existingStacks}
          onClose={handleCloseStackModal}
          onConfirm={handleStackUpdateModalConfirm}
        />
      )}
    </>
  );
}

export default ExperienceForm;
