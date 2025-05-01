import Stepper from '../../../shared/components/Stepper';
import saveIcon from '/images/svg/icons/save.svg';
import sampleCompanyLogoIcon from '/images/sample/sample_company_logo.png';
import devPassLogoIcon from '/images/svg/logo/devpass_logo.svg';
import ResumeProjectItem from '../../../components/ResumeProjectItem';
import { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GithubInfo } from '../../../api/github';
import { useQuery } from '@tanstack/react-query';
import { generateResumeByDevExpIdAndRecrId } from '../../../api/resume';
import { ClipLoader } from 'react-spinners';

// Step
const STEP = [
  '내 경험 선택',
  '깃허브 연동',
  '기업 선택',
  'AI 이력서 생성',
  'Success',
];

function ResumeCreate() {
  const { selectedExpId, githubInfo, recruitmentId } = useLocation().state as {
    selectedExpId: number;
    githubInfo: GithubInfo | null;
    recruitmentId: number;
  };

  // 이력서 생성 API 호출
  const {
    data: resume,
    isLoading: isResumeLoading,
    isError: isResumeError,
  } = useQuery({
    queryKey: ['resume', selectedExpId, recruitmentId, githubInfo],
    queryFn: () =>
      generateResumeByDevExpIdAndRecrId(selectedExpId, recruitmentId),
    enabled: !!selectedExpId && !!recruitmentId,
  });

  useEffect(() => {
    if (resume) {
      console.log('이력서 생성 성공', resume);
    }
  }, [resume]);

  if (isResumeLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <ClipLoader size={50} color='#0043CE' />
          <p className='text-lg font-medium text-[#4B5563]'>
            이력서를 생성 중입니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-8.75 mb-12.75'>
        <div className='flex flex-col items-center'>
          {/* Step Progress Bar */}
          <Stepper step={STEP} currentStep={5} width={700} />

          {/* AI 이력서 생성 결과 */}
          {resume && (
            <div className='mt-8.75 flex w-197.5 flex-col gap-5'>
              {/* 타이틀 / 제목 입력 / 저장 버튼 */}
              <div className='flex w-full items-center justify-between'>
                {/* 타이틀 */}
                <h1 className='text-2xl leading-[29.05px] font-bold text-[#111827]'>
                  AI 이력서 생성 결과
                </h1>

                {/* 제목 입력 / 저장 버튼 */}
                <div className='flex items-center gap-4.75'>
                  <div className='h-10.5 w-46.5 rounded-[5px] border border-solid border-[#DAD9D9] bg-white'>
                    <input
                      type='text'
                      className='h-full w-full px-4 font-normal outline-[#2463EB] placeholder:text-[#00000080]'
                      placeholder='이력서 제목'
                    />
                  </div>
                  <button
                    type='button'
                    className='flex h-10.5 w-32.75 cursor-pointer items-center justify-center gap-2 rounded bg-[#0043CE]'
                  >
                    <img src={saveIcon} alt='Save' className='h-6.5 w-6.5' />
                    <span className='leading-[19.36px] font-medium text-white'>
                      저장하기
                    </span>
                  </button>
                </div>
              </div>

              {/* 이력서 생성 결과 */}
              <div className='flex w-full flex-col rounded-[10px] border-2 border-solid border-[#DFDFDF] bg-white px-8 py-10.5'>
                {/* 프로필 */}
                <div className='flex items-start gap-10.75'>
                  {/* 프로필 이미지 */}
                  <div className='flex h-42.5 w-42.5 items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6]'>
                    <img
                      src={devPassLogoIcon}
                      alt='Profile Image'
                      className='w-10 object-cover'
                    />
                  </div>

                  {/* 프로필 정보 */}
                  <div className='flex flex-col items-start'>
                    <span className='text-[28px] leading-[33.89px] font-bold text-[#111827]'>
                      {resume.resume.name}
                    </span>
                    <span className='mt-1 text-lg leading-[21.78px] font-medium text-[#6B7280]'>
                      {resume.resume.title}
                    </span>
                    <div className='mt-3.25 flex flex-col font-medium text-[#4B5563]'>
                      <span className='leading-6.5'>
                        이메일: {resume.resume.email}
                      </span>
                      <span className='leading-6.5'>
                        연락처: {resume.resume.phone}
                      </span>
                      <span className='leading-6.5'>
                        깃허브: {resume.resume.github}
                      </span>
                      <span className='leading-6.5'>
                        블로그: {resume.resume.blog}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 구분선 */}
                <hr className='mt-9.25 w-full text-[#CFCFCF]' />

                {/* 요약 */}
                <div className='mt-8.5 flex flex-col items-start gap-3.25'>
                  {/* 타이틀 */}
                  <h2 className='text-xl leading-[24.02px] font-bold text-[#111827]'>
                    요약
                  </h2>

                  {/* 요약 내용 */}
                  <p className='leading-6.5 font-medium break-all text-[#4B5563]'>
                    {resume.resume.summary.map((summary, index) => (
                      <Fragment key={index}>
                        {summary}
                        {index !== resume.resume.summary.length - 1 && <br />}
                      </Fragment>
                    ))}
                  </p>
                </div>

                {/* 구분선 */}
                <hr className='mt-8.5 w-full text-[#CFCFCF]' />

                {/* 프로젝트 */}
                <div className='mt-8.5 flex flex-col items-start gap-3.25'>
                  {/* 타이틀 */}
                  <h2 className='text-xl leading-[24.02px] font-bold text-[#111827]'>
                    프로젝트
                  </h2>

                  {/* 프로젝트 리스트 */}
                  <div className='flex w-full flex-col gap-3.25'>
                    {resume.resume.experience?.map((project, index) => (
                      <ResumeProjectItem
                        key={`${project.project}-${index}`}
                        project={project}
                      />
                    ))}
                  </div>
                </div>

                {/* 구분선 */}
                <hr className='mt-8.5 w-full text-[#CFCFCF]' />

                {/* 기술 스택 */}
                <div className='mt-8.5 flex flex-col items-start gap-3.25'>
                  {/* 타이틀 */}
                  <h2 className='text-xl leading-[24.02px] font-bold text-[#111827]'>
                    기술 스택
                  </h2>

                  {/* 기술 스택 리스트 */}
                  <div className='flex items-start gap-7.5'>
                    {/* 기술 스택 아이템 */}
                    <div className='flex flex-col items-start gap-2.5'>
                      {/* 타이틀 */}
                      {/* <span className='text-sm leading-[16.94px] font-medium text-[#4C4C4C]'>
                        Frontend
                      </span> */}

                      {/* 기술 스택 리스트 */}
                      <div className='flex items-center gap-2'>
                        {resume.resume.skills.map((skill) => (
                          <div className='flex h-5 items-center justify-center rounded-[10px] bg-[#F3F4F6] px-2.5 text-xs leading-[16.34px] font-semibold text-[#414B5A]'>
                            {skill.skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 기술 스택 아이템 */}
                    <div className='flex flex-col items-start gap-2.5'>
                      {/* 타이틀 */}
                      {/* <span className='text-sm leading-[16.94px] font-medium text-[#4C4C4C]'>
                        Backend
                      </span> */}

                      {/* 기술 스택 리스트 */}
                      {/* <div className='flex items-center gap-3'>
                        <div className='flex h-5 items-center justify-center rounded-[10px] bg-[#F3F4F6] px-2.5 text-xs leading-[16.34px] font-semibold text-[#414B5A]'>
                          Node.js
                        </div>
                        <div className='flex h-5 items-center justify-center rounded-[10px] bg-[#F3F4F6] px-2.5 text-xs leading-[16.34px] font-semibold text-[#414B5A]'>
                          Express
                        </div>
                        <div className='flex h-5 items-center justify-center rounded-[10px] bg-[#F3F4F6] px-2.5 text-xs leading-[16.34px] font-semibold text-[#414B5A]'>
                          Nest.js
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* 구분선 */}
                <hr className='mt-8.5 w-full text-[#CFCFCF]' />

                {/* 경험 */}
                <div className='mt-8.5 flex flex-col items-start'>
                  {/* 타이틀 */}
                  <h2 className='text-xl leading-[24.02px] font-bold text-[#111827]'>
                    경험
                  </h2>

                  {/* 경험 아이템 */}
                  {resume.resume.activities.map((activity) => (
                    <div className='mt-4.5 flex flex-col items-start'>
                      {/* 경험 제목 */}
                      <span className='text-lg leading-[21.78px] font-semibold text-[#4C4C4C]'>
                        {activity.activity}
                      </span>

                      {/* 기간 */}
                      <span className='mt-0.5 text-sm leading-[16.94px] font-medium text-[#898989]'>
                        {activity.dates}
                      </span>

                      {/* 내용 */}
                      <span className='mt-3.25 leading-[19.36px] font-medium text-[#4C4C4C]'>
                        {activity.description}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 구분선 */}
                <hr className='mt-8.5 w-full text-[#CFCFCF]' />

                {/* 학력 */}
                <div className='mt-8.5 flex flex-col items-start'>
                  {/* 타이틀 */}
                  <h2 className='text-xl leading-[24.02px] font-bold text-[#111827]'>
                    학력
                  </h2>

                  {/* 학력 내용 */}
                  {resume.resume.education.map((education) => (
                    <div className='mt-4.5 flex flex-col items-start'>
                      {/* 학교명 */}
                      <span className='text-lg leading-[21.78px] font-semibold text-[#4C4C4C]'>
                        {education.name}
                      </span>

                      {/* 전공 */}
                      <span className='mt-0.75 text-lg leading-[21.78px] font-medium text-[#898989]'>
                        {education.major}
                      </span>

                      {/* 기간 */}
                      <span className='mt-1.25 text-sm leading-[16.94px] font-medium text-[#898989]'>
                        {education.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeCreate;
