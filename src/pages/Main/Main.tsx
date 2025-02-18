import JobPost from '../../shared/components/JobPost';
import MainNavItem from '../../shared/components/MainNavItem';
import SearchBar from '../../shared/components/SearchBar';

// COLORS 정의
const COLORS = {
  blue: '#DBEAFE',
  green: '#D1FAE5',
  purple: '#E9D5FF',
} as const;

// MainNavItem props 데이터
const MAIN_NAV_ITEMS = [
  {
    link: '/exp/new',
    color: COLORS.blue,
    title: '경험 등록',
    desc: '프로젝트, 인턴십 등의 개발 경험을 등록해 관리하세요.',
  },
  {
    link: '/resume/new',
    color: COLORS.green,
    title: '이력서 생성',
    desc: '등록된 경험을 바탕으로 맞춤형 이력서를 생성하세요.',
  },
  {
    link: '/company/matching',
    color: COLORS.purple,
    title: '기업 매칭',
    desc: '이력서를 기반으로 최적의 기업을 추천받으세요.',
  },
];

function Main() {
  return (
    <div className='flex w-full flex-col items-center overflow-hidden'>
      {/* 배너 */}
      <div className='h-100.25 w-full bg-black'></div>

      {/* 메인 컨텐츠 */}
      <div className='w-main'>
        <div className='mt-10.25 mb-16.5 flex w-full flex-col items-center gap-11.75'>
          {/* 메뉴 */}
          <div className='flex h-27.5 gap-10'>
            {MAIN_NAV_ITEMS.map((item, idx) => (
              <MainNavItem key={`${item.title}-${idx}`} {...item} />
            ))}
          </div>

          {/* 검색바 */}
          <div className='mt-11'>
            <SearchBar
              width={485}
              height={60}
              placeholder={'검색어를 입력하세요.'}
            />
          </div>

          {/* 기업 공고 그리드 */}
          <div className='mt-9.75 flex flex-col items-center gap-9.75'>
            <div className='grid h-105.75 w-250 grid-cols-2 grid-rows-3'>
              <JobPost />
              <JobPost />
              <JobPost />
              <JobPost />
              <JobPost />
              <JobPost />
            </div>
            <button className='font-scd text-main-blue border-main-blue h-9.25 w-35.5 cursor-pointer rounded-[18px] border-2 border-solid text-sm font-medium'>
              더 많은 기업 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
