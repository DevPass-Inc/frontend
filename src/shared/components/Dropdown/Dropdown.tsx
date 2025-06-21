import { useEffect, useState } from 'react';
import downArrowRoundIcon from '/images/svg/icons/down_arrow_round.svg';

// 포지션 리스트
const POSITION_LIST = [
  'AI',
  'Backend',
  'Data',
  'DevOps',
  'Frontend',
  'Mobile',
  'PM',
  'Security',
  'QA',
  'ETC',
];

// 경력 리스트
const CAREER_LIST = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// 지역 리스트
const REGION_LIST = ['서울', '경기'];

interface DropdownProps {
  width: number | string;
  height: number | string;
  title: string; // 기본 안내문구
  selected?: string; // 선택된 값
  onSelect?: (value: string) => void; // 선택 시 콜백
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

function Dropdown(props: DropdownProps) {
  const { width, height, title, selected, onSelect, isOpen, setIsOpen } = props;

  const [dropdownWidth, setDropdownWidth] = useState<string>(''); // 실제 width 값
  const [dropdownHeight, setDropdownHeight] = useState<string>(''); // 실제 height 값

  // width, height 값이 변경될 때마다 dropdownWidth, dropdownHeight 값 변경
  useEffect(() => {
    // width
    if (width === 'full') {
      setDropdownWidth('100%');
    } else {
      setDropdownWidth(`${width}px`);
    }

    // height
    if (height === 'full') {
      setDropdownHeight('100%');
    } else {
      setDropdownHeight(`${height}px`);
    }
  }, [width, height]);

  return (
    <div
      className='relative flex cursor-pointer items-center justify-between rounded-[5px] border border-solid border-[#E5E7EB] bg-white px-4'
      style={{ width: dropdownWidth, height: dropdownHeight }}
      onClick={() => setIsOpen?.(!isOpen)}
    >
      {/* 선택값이 있으면 보여주고, 없으면 title(포지션) */}
      <span className='font-scd font-medium'>{selected || title}</span>
      <button
        type='button'
        className='flex h-6 w-6 items-center justify-center'
        tabIndex={-1}
      >
        <img src={downArrowRoundIcon} alt='Open' className='w-3' />
      </button>

      {/* 포지션 드롭다운 */}
      {title === '포지션' && isOpen && (
        <div className='absolute top-full left-0 z-10 mt-1 w-full rounded-[5px] bg-white p-2 shadow-lg'>
          <ul className='flex h-fit max-h-[250px] flex-col gap-1.5 overflow-y-auto'>
            {POSITION_LIST.map((position) => (
              <li
                key={position}
                className='cursor-pointer px-3 py-1.5 text-sm font-medium hover:bg-[#F5F5F5]'
                onClick={() => {
                  onSelect?.(position);
                  setIsOpen?.(false);
                }}
              >
                {position}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 경력 드롭다운 */}
      {title === '경력' && isOpen && (
        <div className='absolute top-full left-0 z-10 mt-1 w-full rounded-[5px] bg-white p-2 shadow-lg'>
          <ul className='flex h-fit max-h-[250px] flex-col gap-1.5 overflow-y-auto'>
            {CAREER_LIST.map((career) => (
              <li
                key={career}
                className='cursor-pointer px-3 py-1.5 text-sm font-medium hover:bg-[#F5F5F5]'
                onClick={() => {
                  onSelect?.(career);
                  setIsOpen?.(false);
                }}
              >
                {career}년 이상
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 지역 드롭다운 */}
      {title === '지역' && isOpen && (
        <div className='absolute top-full left-0 z-10 mt-1 w-full rounded-[5px] bg-white p-2 shadow-lg'>
          <ul className='flex h-fit max-h-[250px] flex-col gap-1.5 overflow-y-auto'>
            {REGION_LIST.map((region) => (
              <li
                key={region}
                className='cursor-pointer px-3 py-1.5 text-sm font-medium hover:bg-[#F5F5F5]'
                onClick={() => {
                  onSelect?.(region);
                  setIsOpen?.(false);
                }}
              >
                {region}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
