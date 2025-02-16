import { Link } from 'react-router-dom';

function NavigationMenu({ link, title }: { link: string; title: string }) {
  return (
    <Link
      to={link}
      className='flex h-full w-20 items-center justify-center rounded bg-[#EFF6FF] text-sm font-medium text-[#2563EB]'
    >
      {title}
    </Link>
  );
}

export default NavigationMenu;
