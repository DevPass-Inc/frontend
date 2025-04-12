import stackIcon from '/images/svg/icons/stack.svg';
import companyIcon from '/images/svg/icons/company.svg';
import { useEffect, useState } from 'react';

interface SearchItemProps {
  type: 'stack' | 'company';
  width: number | string;
  height: number | string;
}

function SearchItem(props: SearchItemProps) {
  const { type, width, height } = props;

  const [searchIcon, setSearchIcon] = useState<string>(''); // 검색 아이콘
  const [searchWidth, setSearchWidth] = useState<string>(''); // 실제 width 값
  const [searchHeight, setSearchHeight] = useState<string>(''); // 실제 height 값
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>(''); // placeholder 값

  // type 값에 따라 검색 아이콘 변경
  useEffect(() => {
    if (type === 'stack') {
      setSearchIcon(stackIcon);
      setSearchPlaceholder('기술 스택 검색');
    } else if (type === 'company') {
      setSearchIcon(companyIcon);
      setSearchPlaceholder('회사 이름 검색');
    }
  }, [type]);

  // width, height 값이 변경될 때마다 state 값 변경
  useEffect(() => {
    // width
    if (width === 'full') {
      setSearchWidth('100%');
    } else {
      setSearchWidth(`${width}px`);
    }

    // height
    if (height === 'full') {
      setSearchHeight('100%');
    } else {
      setSearchHeight(`${height}px`);
    }
  }, [width, height]);

  return (
    <div
      className='flex items-center justify-start gap-2.5 overflow-hidden rounded-[5px] border border-solid border-[#E5E7EB] bg-white px-4'
      style={{ width: searchWidth, height: searchHeight }}
    >
      {/* 아이콘 */}
      <div className='h-7 w-7'>
        {searchIcon && (
          <img
            src={searchIcon}
            alt='Search Icon'
            className='h-full w-full object-contain'
          />
        )}
      </div>

      {/* 검색 공간 */}
      <input
        type='text'
        placeholder={searchPlaceholder}
        className='font-scd h-full w-full bg-transparent leading-[19.1px] font-medium placeholder:text-black focus:outline-none'
      />
    </div>
  );
}

export default SearchItem;
