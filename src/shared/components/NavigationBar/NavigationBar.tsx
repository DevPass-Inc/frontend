import { Link } from 'react-router-dom';
import NavigationMenu from '../NavigationMenu';
import devPassLogo from '/images/svg/devpass_logo.svg';

function NavigationBar() {
  return (
    <nav className='border-nav h-nav flex w-full justify-center border-b border-solid bg-white'>
      {/* 네비게이션 바 */}
      <div className='w-main flex h-full items-center justify-between'>
        {/* 로고 */}
        <Link to={'/'} className='flex cursor-pointer items-center gap-2'>
          <img src={devPassLogo} alt='DevPass logo' className='h-6 w-6' />
          <h1 className='text-lg leading-6 font-semibold text-black'>
            DevPass
          </h1>
        </Link>

        {/* 네비게이션 메뉴 */}
        <div className='flex h-10 gap-3.5'>
          <NavigationMenu link={'/dashboard'} title={'대시보드'} />
          <NavigationMenu link={'/experience'} title={'경험 관리'} />
          <NavigationMenu link={'/company'} title={'기업 탐색'} />
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
