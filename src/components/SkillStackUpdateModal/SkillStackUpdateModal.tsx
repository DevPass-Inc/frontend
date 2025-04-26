import { useState } from 'react';
import { MdCancel } from 'react-icons/md';

interface SkillStackUpdateModalProps {
  existingStacks: string[];
  onClose: () => void;
  onConfirm: (updatedStacks: string[]) => void;
}

function SkillStackUpdateModal(props: SkillStackUpdateModalProps) {
  const { onClose, existingStacks, onConfirm } = props;

  const [stacks, setStacks] = useState<string[]>([...existingStacks]); // 기존 스택 목록 복사

  // 스택 삭제 핸들러
  const handleDelete = (stackToDelete: string) => {
    setStacks((prev) => prev.filter((s) => s !== stackToDelete));
  };

  // 스택 수정 확인 핸들러
  const handleConfirm = () => {
    onConfirm(stacks);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* 모달 배경 (반투명) */}
      <div className='absolute inset-0 bg-black/30' onClick={onClose}></div>

      {/* 모달 컨텐츠 */}
      <div className='relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
        {/* 모달 헤더 */}
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>기술 스택 수정</h2>
        </div>

        {/* 모달 콘텐츠 */}
        <div className='mb-4'>
          {/* 기술 스택 목록 */}
          <div className='gap flex w-full flex-wrap gap-x-4 gap-y-6'>
            {stacks.map((stack, idx) => (
              <div
                key={`${stack}-${idx}`}
                className='relative flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.25'
              >
                {/* 기술 스택명 */}
                <span className='text-xs font-semibold text-[#1D40AF]'>
                  {stack}
                </span>

                {/* 삭제 버튼 */}
                <button
                  type='button'
                  className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full p-1.5'
                  onClick={() => handleDelete(stack)}
                >
                  <MdCancel
                    className='text-[#e95656] transition-all duration-200 hover:text-[#FF0000]'
                    size={16}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className='flex justify-end'>
          <button
            type='button'
            className='mr-2 cursor-pointer rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-300'
            onClick={onClose}
          >
            취소
          </button>
          <button
            type='button'
            className='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-600'
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkillStackUpdateModal;
