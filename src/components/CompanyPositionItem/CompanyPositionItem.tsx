import careerLightGrayIcon from '/images/svg/icons/career_light_gray.svg';
import locationLightGrayIcon from '/images/svg/icons/location_light_gray.svg';
import scrapeIcon from '/images/svg/icons/scrape.svg';

function CompanyPositionItem() {
  return (
    <div className='relative flex h-25 w-98.5 flex-col gap-2 rounded-[5px] border border-solid border-[#D7D7D7] bg-white p-3.75'>
      {/* 포지션 이름 */}
      <span className='font-noto text-sm leading-[19.07px] font-semibold'>
        안드로이드 개발자(Android Developer)
      </span>

      {/* 경력 / 위치 */}
      <div className='flex items-center gap-2'>
        {/* 경력 */}
        <div className='flex items-center'>
          <img src={careerLightGrayIcon} alt='Career' className='w-4.25' />
          <span className='font-noto text-xxs ml-1.25 leading-[13.62px] font-semibold text-[#D7D7D7]'>
            3 ~ 7년
          </span>
        </div>

        {/* 위치 */}
        <div className='flex items-center'>
          <img src={locationLightGrayIcon} alt='Location' className='w-4.25' />
          <span className='font-noto text-xxs ml-0.25 leading-[13.62px] font-semibold text-[#D7D7D7]'>
            서울 중구
          </span>
        </div>
      </div>

      {/* 태그 */}
      <div className='flex h-4 items-center gap-2.5'>
        <div className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 leading-[10.9px] font-semibold text-[#333D4B]'>
          안드로이드
        </div>
        <div className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 leading-[10.9px] font-semibold text-[#333D4B]'>
          사물인터넷(IoT)
        </div>
        <div className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 leading-[10.9px] font-semibold text-[#333D4B]'>
          Android
        </div>
        <div className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 leading-[10.9px] font-semibold text-[#333D4B]'>
          외 2개
        </div>
      </div>

      {/* 스크랩 버튼 */}
      <button className='absolute top-3.75 right-3.75 h-6 w-6 cursor-pointer'>
        <img src={scrapeIcon} alt='Scrape' className='h-full w-full' />
      </button>
    </div>
  );
}

export default CompanyPositionItem;
