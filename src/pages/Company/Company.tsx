import CompanyPositionItem from '../../components/CompanyPositionItem';

function Company() {
  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-9.5 flex flex-col items-center'>
        <div className='flex w-313.75 flex-col items-start'>
          {/* 기업명 */}
          <div className='flex flex-col gap-1.5 pl-9.75'>
            <h1 className='text-[40px] leading-[48.41px] font-bold'>Riiid</h1>
            <p className='text-2xl leading-[29.05px] font-medium text-[#898989]'>
              Sam
            </p>
          </div>

          {/* 구분선 */}
          <hr className='mt-8.5 w-full text-[#CFCFCF]' />

          {/* 기업 정보 */}
          <div className='flex w-234.25 flex-col items-start border-r border-solid border-[#CFCFCF] py-11 pl-9.75'>
            {/* 채용 중인 포지션 */}
            <div className='flex flex-col items-start gap-3.75'>
              {/* 타이틀 */}
              <h2 className='text-lg leading-[21.78px] font-semibold'>
                채용 중인 포지션
              </h2>

              {/* 포지션 리스트 */}
              <div className='flex h-25 w-202 flex-wrap gap-5'>
                <CompanyPositionItem />
                <CompanyPositionItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
