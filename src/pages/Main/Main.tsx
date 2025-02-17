import MainNavItem from '../../shared/components/MainNavItem';

const MAIN_NAV_ITEMS = [
  {
    link: '/exp/new',
    color: '#DBEAFE',
    title: '경험 등록',
    desc: '프로젝트, 인턴십 등의 개발 경험을 등록해 관리하세요.',
  },
  {
    link: '/resume/new',
    color: '#D1FAE5',
    title: '이력서 생성',
    desc: '등록된 경험을 바탕으로 맞춤형 이력서를 생성하세요.',
  },
  {
    link: '/company/matching',
    color: '#E9D5FF',
    title: '기업 매칭',
    desc: '이력서를 기반으로 최적의 기업을 추천받으세요.',
  },
];

function Main() {
  return (
    <div className='flex w-full flex-col items-center'>
      {/* 배너 */}
      <div className='h-100.25 w-full bg-black'></div>

      {/* 메인 컨텐츠 */}
      <div className='w-main'>
        <div className='mt-10.25 flex w-full flex-col items-center gap-11.75'>
          {/* 메뉴 */}
          <div className='flex h-27.5 gap-10'>
            {MAIN_NAV_ITEMS.map((item, idx) => (
              <MainNavItem key={`${item.title}-${idx}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
