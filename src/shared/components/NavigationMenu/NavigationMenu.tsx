import { Link, useLocation } from 'react-router-dom';

interface NavigationMenuProps {
  link: string;
  title: string;
}

function NavigationMenu(props: NavigationMenuProps) {
  const { link, title } = props;

  const location = useLocation();
  const isActive = location.pathname === link; // 현재 페이지인지 확인

  return (
    <Link
      to={link}
      className={`${isActive ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-main-gray bg-transparent'} flex h-full w-20 items-center justify-center rounded text-sm font-medium`}
    >
      {title}
    </Link>
  );
}

export default NavigationMenu;
