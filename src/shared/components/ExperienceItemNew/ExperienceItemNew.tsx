import { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { addDevExperience } from '../../../api/dev-experience';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ExperienceItemNewProps {
  onCancel: () => void;
  setSelectedExpId: (expId: number) => void;
}

function ExperienceItemNew(props: ExperienceItemNewProps) {
  const { onCancel, setSelectedExpId } = props;

  const [devExpTitle, setDevExpTitle] = useState<string>(''); // 경험 제목
  const [devExpDescription, setDevExpDescription] = useState<string>(''); // 경험 설명

  const queryClient = useQueryClient();

  // 개발 경험 등록 API 호출
  const mutation = useMutation({
    mutationFn: addDevExperience,
    onSuccess: (data) => {
      console.log('개발 경험 등록 성공', data);
      queryClient.invalidateQueries({ queryKey: ['devExperiences'] }); // 캐시 무효화 -> 목록 자동 refetch
      setSelectedExpId(data.id); // 등록된 경험으로 포커스 이동
    },
    onError: (err) => {
      console.error('개발 경험 등록 실패', err);
      alert('개발 경험 등록에 실패했습니다. 다시 시도해 주세요.');
    },
    onSettled: () => {
      onCancel(); // 입력 폼 닫기
    },
  });

  // 경험 제목 변경 핸들러
  const handleTitlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDevExpTitle(e.target.value);
  };

  // 경험 설명 변경 핸들러
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDevExpDescription(e.target.value);
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveButtonClick = () => {
    const newExp = {
      title: devExpTitle,
      description: devExpDescription,
    };

    mutation.mutate(newExp); // 개방 경험 등록 API 호출
  };

  return (
    <div
      className='relative flex h-18 w-full cursor-pointer items-center justify-between rounded-[5px] bg-white px-5 text-[#1E1E1E]'
      style={{
        boxShadow: '0px 2px 8px 0px #00000026',
      }}
    >
      {/* 경험 제목 & 설명 입력칸 */}
      <div className='flex w-3/4 flex-col gap-1.25'>
        {/* 경험 제목 입력 */}
        <input
          type='text'
          placeholder='경험 제목을 입력하세요.'
          className='w-full bg-transparent text-xl leading-6 font-semibold outline-none placeholder:text-[#959595]'
          onChange={handleTitlechange}
          value={devExpTitle}
          maxLength={20}
        />

        {/* 경험 설명 입력 */}
        <input
          type='text'
          placeholder='경험 설명을 입력하세요.'
          className='w-full bg-transparent leading-4.75 font-medium outline-none placeholder:text-[#959595]'
          onChange={handleDescriptionChange}
          value={devExpDescription}
          maxLength={50}
        />
      </div>

      {/* 저장 버튼 */}
      <button
        type='button'
        className='flex h-8.5 w-16 cursor-pointer items-center justify-center rounded-[5px] border border-solid border-[#B2B2B2] bg-white text-base font-semibold text-[#1E1E1E] transition-all duration-200 ease-in-out hover:border-[#2463EB] hover:bg-[#F0F9FF] hover:text-[#2463EB] active:scale-[0.97] active:bg-[#E0F2FE]'
        onClick={handleSaveButtonClick}
      >
        저장
      </button>

      {/* 취소 버튼 */}
      <button
        type='button'
        className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1.5'
        onClick={onCancel}
      >
        <MdCancel
          className='text-[#e95656] transition-all duration-200 hover:text-[#FF0000]'
          size={24}
        />
      </button>
    </div>
  );
}

export default ExperienceItemNew;
