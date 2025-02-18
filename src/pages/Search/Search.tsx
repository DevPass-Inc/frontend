import Dropdown from '../../shared/components/Dropdown';
import SearchItem from '../../shared/components/SearchItem';

function Search() {
  return (
    <div className='w-main'>
      <div className='mt-10.25 mb-22.5 flex w-full flex-col items-center'>
        {/* 검색 필터 */}
        <div className='flex h-30.5 w-250 items-center justify-center gap-2.5'>
          {/* 직무 / 경력 연봉 */}
          <div className='flex h-full w-full flex-col gap-2.5'>
            <Dropdown width={'full'} height={56} title={'직무'} />
            <div className='flex h-14 w-full gap-2'>
              <Dropdown width={'full'} height={'full'} title={'경력'} />
              <Dropdown width={'full'} height={'full'} title={'연봉'} />
            </div>
          </div>
          {/* 기술 스택 검색 / 직원 수 / 지역 */}
          <div className='flex h-full w-full flex-col gap-2.5'>
            <SearchItem type={'stack'} width={'full'} height={56} />
            <div className='flex h-14 w-full gap-2'>
              <Dropdown width={'full'} height={'full'} title={'직원 수'} />
              <Dropdown width={'full'} height={'full'} title={'지역'} />
            </div>
          </div>
          {/* 회사 이름 검색 / 포지션 테마 */}
          <div className='flex h-full w-full flex-col gap-2.5'>
            <SearchItem type={'company'} width={'full'} height={56} />
            <Dropdown width={'full'} height={56} title={'포지션 테마'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
