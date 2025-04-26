import { Link } from 'react-router-dom';
import NavigationMenu from '../NavigationMenu';
import devPassLogo from '/images/svg/logo/devpass_logo.svg';
import { useState } from 'react';
import SignUpModal from '../../../components/Modal/SignUpModal';

function NavigationBar() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  // 로그인 버튼 클릭 이벤트
  const handleLoginButtonClick = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  // 회원가입 버튼 클릭 이벤트
  const handleSignUpButtonClick = () => {
    setIsSignUpModalOpen(true);
  };

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
          {/* <NavigationMenu link={'/dashboard'} title={'대시보드'} />
          <NavigationMenu link={'/experience'} title={'경험 관리'} />
          <NavigationMenu link={'/company'} title={'기업 탐색'} /> */}
          <button
            type='button'
            className='text-main-gray flex h-full w-20 cursor-pointer items-center justify-center rounded bg-transparent text-sm font-medium'
            onClick={handleLoginButtonClick}
          >
            로그인
          </button>
          {/* <button
            type='button'
            className='text-main-gray flex h-full w-20 cursor-pointer items-center justify-center rounded bg-transparent text-sm font-medium'
            onClick={handleSignUpButtonClick}
          >
            회원가입
          </button> */}
        </div>
      </div>

      {/* 회원가입 모달 */}
      {isSignUpModalOpen && (
        <SignUpModal onClose={() => setIsSignUpModalOpen(false)} />
      )}
    </nav>
  );
}

export default NavigationBar;
