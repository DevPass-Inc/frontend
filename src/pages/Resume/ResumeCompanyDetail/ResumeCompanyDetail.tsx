import { useLocation, useNavigate } from 'react-router-dom';
import { Recruitment } from '../../../api/recruitment';
import { GithubInfo } from '../../../api/github';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const buttonTap = { scale: 0.97 };

function ResumeCompanyDetail() {
  const navigate = useNavigate();

  const { selectedExpId, githubInfo, recruitments } = useLocation().state as {
    selectedExpId: number;
    githubInfo: GithubInfo | null;
    recruitments: Recruitment;
  };

  // 이 기업 선택하기 버튼 클릭 핸들러
  const handleSelectCompanyButtonClick = () => {
    // 페이지 이동 및 상태 전달
    navigate('/resume/create', {
      state: {
        selectedExpId,
        githubInfo,
        recruitmentId: recruitments.recruitmentId,
      },
    });
  };

  return (
    <motion.div
      className='w-main overflow-hidden'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
    >
      <div className='mt-8.75 mb-12'>
        <div className='flex w-full items-start justify-center gap-5'>
          {/* 채용공고 상세 */}
          <motion.div
            className='w-201.75 rounded-lg border border-[#dfdfdf] bg-white shadow-sm'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {/* 헤더 */}
            <div className='p-6'>
              <div className='flex items-start gap-4'>
                {/* 기업 이미지 */}
                <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-[#3d4c62]'>
                  <img
                    src={recruitments.imageUrl}
                    alt='기업 이미지'
                    className='h-full w-full object-cover'
                  />
                </div>

                {/* 타이틀 */}
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <h1 className='text-lg font-bold'>
                      [{recruitments.companyName}] {recruitments.position} (
                      {recruitments.career})
                    </h1>
                  </div>
                  <p className='text-sm text-[#6b7280]'>
                    {recruitments.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className='grid grid-cols-2 gap-4 bg-[#f7f7fb] p-6 text-sm'>
              <div>
                <p className='mb-1 text-[#898989]'>직무</p>
                <p className='font-medium'>{recruitments.position}</p>
              </div>
              <div>
                <p className='mb-1 text-[#898989]'>지원 마감</p>
                <p className='font-medium'>{recruitments.deadline}</p>
              </div>
              <div>
                <p className='mb-1 text-[#898989]'>고용 형태</p>
                <p className='font-medium'>정규직</p>
              </div>
              <div>
                <p className='mb-1 text-[#898989]'>경력</p>
                <p className='font-medium'>{recruitments.career}</p>
              </div>
              <div>
                <p className='mb-1 text-[#898989]'>근무 위치</p>
                <p className='font-medium'>{recruitments.location}</p>
              </div>
            </div>

            {/* Job Description */}
            <div className='p-6'>
              <h2 className='mb-4 text-lg font-bold'>업무 소개</h2>

              {[
                recruitments.mainTask,
                recruitments.qualification,
                recruitments.preferred,
                recruitments.benefit,
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className='mb-4 text-sm'
                  variants={fadeInUp}
                  initial='hidden'
                  animate='visible'
                  custom={i}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* 채용공고 선택하기 */}
          <motion.div
            className='flex-1 rounded-lg border border-[#dfdfdf] bg-white shadow-sm'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className='p-8'>
              {/* 기업 이미지 */}
              <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-[#3d4c62]'>
                <img
                  src={recruitments.imageUrl}
                  alt='기업 이미지'
                  className='h-full w-full object-cover'
                />
              </div>

              {/* 타이틀 */}
              <div className='mt-4 flex flex-col gap-1'>
                <span className='text-lg leading-6 font-bold'>
                  [{recruitments.companyName}] {recruitments.position} (
                  {recruitments.career})
                </span>

                {/* 위치 */}
                <p className='text-sm text-[#6b7280]'>
                  {recruitments.location}
                </p>
              </div>

              {/* 이 기업 선택하기 버튼 */}
              <motion.button
                whileTap={buttonTap}
                whileHover={{ scale: 1.01 }}
                className='bg-main-blue mt-4 w-full cursor-pointer rounded-sm py-2 text-white transition-all duration-200 hover:brightness-95 active:scale-[0.97]'
                onClick={handleSelectCompanyButtonClick}
              >
                이 기업 선택하기
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ResumeCompanyDetail;
