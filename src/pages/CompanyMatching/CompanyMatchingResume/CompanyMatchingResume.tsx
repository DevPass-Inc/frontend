import { useEffect, useState } from 'react';
import ResumePreviewItem from '../../../components/ResumePreviewItem';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchResumeList } from '../../../api/resume';

function CompanyMatchingResume() {
  const navigate = useNavigate();

  const [selectedResume, setSelectedResume] = useState<string | null>(null); // 선택된 이력서 ID

  // 이력서 리스트 API 호출
  const {
    data: resumeList = [],
    isLoading: isResumeListLoading,
    isError: isResumeListError,
  } = useQuery({
    queryKey: ['resumeList'],
    queryFn: () => fetchResumeList(),
  });

  // 이력서 선택 핸들러
  const handleSelectResume = (resumeId: string) => {
    setSelectedResume(resumeId);
  };

  // 기업 매칭하기 버튼 클릭 핸들러
  const handleCompanyMatching = () => {
    navigate('/company/matching/result', {
      state: { selectedResume },
    });
  };

  useEffect(() => {
    if (resumeList) {
      console.log('이력서 리스트 조회 성공', resumeList);
    }
  }, [resumeList]);

  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-12.5 mb-29'>
        <div className='flex flex-col items-center gap-12.5'>
          {/* 타이틀 */}
          <div className='flex flex-col items-center gap-2.5'>
            <h1 className='text-[28px] leading-[33.89px] font-bold text-[#111827]'>
              이력서 선택
            </h1>
            <h2 className='text-xl leading-[24.2px] font-medium text-[#6B7280]'>
              아래 항목 중에서 기업 매칭할 이력서를 선택하세요
            </h2>
          </div>

          {/* 이력서 리스트 */}
          <div className='relative max-h-[500px] w-full overflow-y-auto'>
            <div className='flex flex-wrap justify-center gap-5 pr-2'>
              {resumeList.map((resume, index) => (
                <ResumePreviewItem
                  key={`resume-preview-${index}`}
                  selectedResume={selectedResume}
                  handleSelectResume={() => handleSelectResume(resume.id)}
                  resume={resume}
                />
              ))}
            </div>
          </div>

          {/* 기업 매칭하기 버튼 */}
          <button
            type='button'
            className='flex h-11 w-35 cursor-pointer items-center justify-center rounded bg-[#0043CE] font-semibold text-white'
            onClick={handleCompanyMatching}
          >
            기업 매칭하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyMatchingResume;
