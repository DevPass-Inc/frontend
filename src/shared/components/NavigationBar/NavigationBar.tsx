import { Link } from 'react-router-dom';
import NavigationMenu from '../NavigationMenu';

function NavigationBar() {
  return (
    <nav className='border-main h-nav flex w-full justify-center border-b border-solid bg-white'>
      {/* 네비게이션 바 */}
      <div className='w-main flex h-full items-center justify-between'>
        {/* 로고 */}
        <Link to={'/'} className='flex cursor-pointer items-center gap-2'>
          <img
            src='/images/svg/devpass_logo.svg'
            alt='DevPass logo'
            className='h-6 w-6'
          />
          <h1 className='text-lg leading-6 font-semibold text-black'>
            DevPass
          </h1>
        </Link>

        {/* 네비게이션 메뉴 */}
        <div className='flex h-10 gap-3.5'>
          <NavigationMenu link={'/dashboard'} title={'대시보드'} />
          <NavigationMenu link={'/manage'} title={'경험 관리'} />
          <NavigationMenu link={'/explore'} title={'기업 탐색'} />
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
