import arrowLeftIcon from '/images/svg/icons/arrow_left.svg';

function CompanyMatchingDetail() {
  const navigtat;

  return (
    <div className='w-main flex justify-center overflow-hidden'>
      <div className='mt-12.75 w-200'>
        <div className='flex flex-col items-start gap-5.75'>
          {/* 매칭 결과로 돌아가기 */}
          <button
            type='button'
            className='flex cursor-pointer items-center gap-2.5'
          >
            <img src={arrowLeftIcon} alt='Go Back' className='w-6' />
            <span className='leading-[19.36px] font-medium'>
              매칭 결과로 돌아가기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyMatchingDetail;
