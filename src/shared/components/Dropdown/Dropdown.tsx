import { useEffect, useState } from 'react';
import downArrowRoundIcon from '/images/svg/icons/down_arrow_round.svg';

interface DropdownProps {
  width: number | string;
  height: number | string;
  title: string;
}

function Dropdown(props: DropdownProps) {
  const { width, height, title } = props;

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
      className='flex cursor-pointer items-center justify-between overflow-hidden rounded-[5px] border border-solid border-[#E5E7EB] bg-white px-4'
      style={{ width: dropdownWidth, height: dropdownHeight }}
    >
      <span className='font-scd font-medium'>{title}</span>
      <button
        type='button'
        className='flex h-6 w-6 items-center justify-center'
      >
        <img src={downArrowRoundIcon} alt='Open' className='w-3' />
      </button>
    </div>
  );
}

export default Dropdown;
