import { motion } from 'framer-motion';
import closeRoundBlackIcon from '/images/svg/icons/close_round_black.svg';
import devPassLogoIcon from '/images/svg/logo/devpass_logo.svg';
import userLightIcon from '/images/svg/icons/user_light.svg';
import phoneLightIcon from '/images/svg/icons/phone_light.svg';
import mortarboardLightIcon from '/images/svg/icons/mortarboard_light.svg';
import { useState } from 'react';

interface SignUpModalProps {
  onClose: () => void;
}

function SignUpModal(props: SignUpModalProps) {
  const { onClose } = props;

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');

  // 프로필 이미지 등록 버튼 클릭 이벤트
  const handleProfileImageUploadButtonClick = () => {
    // 파일 업로드 창 열기
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    // 파일 업로드 창에서 파일 선택 시
    fileInput.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        setProfileImage(file);
      } else {
        setProfileImage(null);
        // TODO: 파일 업로드 실패 알림
      }
    };
  };

  // 이름 입력 이벤트
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 이름이 5자 이상일 때
    if (event.target.value.length > 5) {
      return;
    }

    setUserName(event.target.value);
  };

  // 휴대폰 번호 입력 이벤트
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawPhoneNumber = event.target.value.replace(/\D/g, '');

    if (rawPhoneNumber.length > 11) {
      return;
    }

    const formattedPhoneNumber = rawPhoneNumber.replace(
      /(\d{3})(\d{3,4})(\d{4})/,
      '$1-$2-$3'
    );

    setPhoneNumber(formattedPhoneNumber);
  };

  // 학교명 입력 이벤트
  const handleSchoolNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // 학교명이 20자 이상일 때
    if (event.target.value.length > 20) {
      return;
    }

    setSchoolName(event.target.value);
  };

  return (
    <div className='fixed flex h-screen w-screen items-center justify-center bg-[#00000080]'>
      {/* 회원가입 모달 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='relative z-1 flex w-115 flex-col items-center rounded-lg bg-white p-12.5'
      >
        {/* 회원가입 모달 제목 */}
        <h2 className='w-full text-left text-[22px] leading-[27px] font-semibold text-black'>
          회원가입
        </h2>

        {/* 프로필 이미지 등록 */}
        <div className='mt-8.75 flex flex-col items-center gap-3.75'>
          {/* 프로필 이미지 */}
          <div className='flex h-25 w-25 items-center justify-center overflow-hidden rounded-full border border-solid border-[#C9C9C9]'>
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt='Profile Image'
                className='h-full w-full object-cover'
              />
            ) : (
              <img
                src={devPassLogoIcon}
                alt='Profile Image'
                className='h-8 w-8 opacity-50'
              />
            )}
          </div>

          {/* 프로필 이미지 등록 버튼 */}
          <button
            type='button'
            className='h-6.25 w-29.75 cursor-pointer rounded-[20px] bg-[#E2E2E2] text-xs font-semibold'
            onClick={handleProfileImageUploadButtonClick}
          >
            프로필 이미지 등록
          </button>
        </div>

        {/* 회원가입 양식 */}
        <div className='mt-8.75 flex w-full flex-col gap-5'>
          {/* 이름 */}
          <div className='flex h-11 w-full items-center gap-2.5 border-b border-solid border-black'>
            <img src={userLightIcon} alt='User Name' className='w-7' />
            <input
              type='text'
              placeholder='이름을 입력해주세요'
              value={userName}
              onChange={handleUserNameChange}
              className='mt-1 flex-1 outline-none placeholder:text-[#939393]'
            />
          </div>

          {/* 휴대폰 번호 */}
          <div className='flex h-11 w-full items-center gap-2.5 border-b border-solid border-black'>
            <img src={phoneLightIcon} alt='Phone Number' className='w-7' />
            <input
              type='text'
              placeholder='휴대폰 번호를 입력해주세요'
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className='mt-1 flex-1 outline-none placeholder:text-[#939393]'
            />
          </div>

          {/* 학교명 */}
          <div className='flex h-11 w-full items-center gap-2.5 border-b border-solid border-black'>
            <img src={mortarboardLightIcon} alt='School Name' className='w-7' />
            <input
              type='text'
              placeholder='학교명을 입력해주세요'
              value={schoolName}
              onChange={handleSchoolNameChange}
              className='mt-1 flex-1 outline-none placeholder:text-[#939393]'
            />
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <button
          type='button'
          className='bg-main-blue mt-8.75 h-11.25 w-full cursor-pointer rounded-[5px] text-xl font-semibold text-white'
        >
          회원가입
        </button>

        {/* 닫기 버튼 */}
        <button
          type='button'
          className='absolute top-3.75 right-3.75 flex h-6 w-6 cursor-pointer items-center justify-center'
          onClick={onClose}
        >
          <img
            src={closeRoundBlackIcon}
            alt='Close'
            className='h-full w-full'
          />
        </button>
      </motion.div>
    </div>
  );
}

export default SignUpModal;
