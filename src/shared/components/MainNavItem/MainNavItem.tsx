import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blueDoc from '/images/svg/doc/blue_doc.svg';
import greenDoc from '/images/svg/doc/green_doc.svg';
import purpleDoc from '/images/svg/doc/purple_doc.svg';

// props 타입
interface MainNavItemProps {
  link: string;
  color: string;
  title: string;
  desc: string;
}

function MainNavItem(props: MainNavItemProps) {
  const { link, color, title, desc } = props;

  const [docIcon, setDocIcon] = useState<string>(''); // 아이콘

  // props color에 따라 아이콘 변경
  useEffect(() => {
    if (color === '#DBEAFE') {
      setDocIcon(blueDoc);
    } else if (color === '#D1FAE5') {
      setDocIcon(greenDoc);
    } else if (color === '#E9D5FF') {
      setDocIcon(purpleDoc);
    }
  }, [color]);

  return (
    <Link
      to={link}
      className='border-main shadow-main flex h-full w-85.25 flex-col justify-between rounded-[10px] border-[3px] border-solid bg-white px-5.25 py-4.75'
    >
      {/* 아이콘 & 타이틀 */}
      <div className='flex items-center gap-3.5'>
        {/* 아이콘 */}
        <div
          className='flex h-10 w-10 items-center justify-center rounded-[7px]'
          style={{ backgroundColor: color }}
        >
          <img src={docIcon} alt='Link Icon' className='h-6 w-6' />
        </div>

        {/* 타이틀 */}
        <h3 className='text-main text-sm leading-[16.94px] font-semibold'>
          {title}
        </h3>
      </div>

      {/* 설명 */}
      <h4 className='text-main-gray text-xs leading-[14.52px] font-medium'>
        {desc}
      </h4>
    </Link>
  );
}

export default MainNavItem;
