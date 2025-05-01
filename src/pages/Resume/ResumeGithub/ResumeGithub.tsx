import { useLocation, useNavigate } from 'react-router-dom';
import Stepper from '../../../shared/components/Stepper';
import githubLogoLightIcon from '/images/svg/logo/github_logo_light.svg';
import { fetchGithubInfo, GithubInfo } from '../../../api/github';
import { useState } from 'react';

// Step
const STEP = [
  '내 경험 선택',
  '깃허브 연동',
  '기업 선택',
  'AI 이력서 생성',
  'Success',
];

function ResumeGithub() {
  const navigate = useNavigate();
  const { selectedExpId } = useLocation().state; // 선택된 경험 ID 가져오기

  const [isConnecting, setIsConnecting] = useState<boolean>(false); // 깃허브 연동 중
  const [isConnected, setIsConnected] = useState<boolean>(false); // 깃허브 연동 완료
  const [githubInfo, setGithubInfo] = useState<GithubInfo | null>(null); // 깃허브 정보

  // 깃허브 연동하기 버튼 클릭 핸들러
  const handleConnectGithubButtonClick = () => {
    setIsConnecting(true); // 깃허브 연동 중

    // 로그인된 사용자의 깃허브 정보 조회 API 호출
    fetchGithubInfo()
      .then((res) => {
        console.log('깃허브 정보 조회 성공', res);
        setIsConnecting(false); // 깃허브 연동 완료
        setIsConnected(true); // 깃허브 연동 완료
        setGithubInfo(res); // 깃허브 정보 저장
      })
      .catch((err) => {
        console.error('깃허브 정보 조회 실패', err);
        setIsConnecting(false); // 깃허브 연동 실패
      });
  };

  // 건너뛰기 / 다음 버튼 클릭 시
  const handleNextButtonClick = () => {
    // 다음 단계로 이동 및 선택된 경험 ID, 깃허브 정보 전달
    navigate('/resume/company', { state: { selectedExpId, githubInfo } });
  };

  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-8.75 mb-12'>
        <div className='flex flex-col items-center'>
          {/* Step Progress Bar */}
          <Stepper step={STEP} currentStep={2} width={700} />

          {/* 깃허브 연동 */}
          <div className='mt-15.25 flex h-132 w-210 flex-col items-start rounded-[10px] border-2 border-solid border-[#DFDFDF] bg-white p-9.25'>
            {isConnecting ? (
              <>
                {/* 깃허브 연동 중 (로딩스피너) */}
                <div className='flex h-full w-full flex-col items-center justify-center'>
                  <div className='flex items-center justify-center'>
                    <div className='h-10 w-10 animate-spin rounded-full border-b-4 border-gray-900'></div>
                  </div>
                  <p className='mt-10 text-2xl leading-[29px] font-bold text-[#111827]'>
                    깃허브 데이터를 가져오는 중입니다
                  </p>
                  <p className='mt-6 text-xl leading-6 font-medium text-[#1E1E1E]'>
                    레포지토리와 커밋 기록을 분석하고 있습니다...
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* 타이틀 */}
                <div className='flex flex-col items-start gap-4.25'>
                  <h1 className='text-2xl leading-[29.05px] font-bold text-[#111827]'>
                    깃허브 연동하기
                  </h1>
                  <p className='text-lg leading-[21.78px] font-medium text-[#6B7280]'>
                    깃허브 연동을 통해 더 풍부한 이력서를 만들 수 있습니다
                  </p>
                </div>

                {/* 연동 시 제공되는 정보*/}
                <div className='mt-8.75 flex w-full flex-col gap-4 rounded-[10px] border-2 border-solid border-[#DFDFDF] bg-transparent px-8 pt-8.75 pb-6'>
                  <h2 className='text-xl leading-[24.2px] font-semibold text-[#4C4C4C]'>
                    연동 시 제공되는 정보
                  </h2>

                  {/* 제공 정보 리스트 */}
                  <div className='ml-2 flex flex-col items-start'>
                    <div className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#4B5563]'></div>
                      <p className='leading-9 text-[#4B5563]'>
                        주요 레포지토리 정보
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#4B5563]'></div>
                      <p className='leading-9 text-[#4B5563]'>
                        커밋 기록 및 활동량
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#4B5563]'></div>
                      <p className='leading-9 text-[#4B5563]'>
                        사용 중인 기술 스택
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#4B5563]'></div>
                      <p className='leading-9 text-[#4B5563]'>프로필 정보</p>
                    </div>
                  </div>
                </div>

                {/* 연동 / 다음 버튼 */}
                <div className='mt-8.75 flex h-15.75 w-full gap-3.5'>
                  <button
                    type='button'
                    className={`${isConnected ? 'cursor-not-allowed bg-[#87A1E7]' : 'bg-main-blue cursor-pointer'} flex h-full flex-1 items-center justify-center gap-2 rounded-[10px]`}
                    onClick={handleConnectGithubButtonClick}
                    disabled={isConnecting || isConnected} // 깃허브 연동 중일 때 버튼 비활성화
                  >
                    <img
                      src={githubLogoLightIcon}
                      alt='Github Logo'
                      className='h-6 w-6'
                    />
                    <p className='text-xl font-semibold text-white'>
                      {isConnected ? '연동 완료' : '깃허브 연동하기'}
                    </p>
                  </button>
                  <button
                    type='button'
                    className='flex h-full flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#F3F4F6] text-xl font-semibold text-[#374151]'
                    onClick={handleNextButtonClick}
                  >
                    {isConnected ? '다음 단계로' : '건너뛰기'} &gt;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeGithub;
