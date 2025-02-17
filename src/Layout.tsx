import { Outlet } from 'react-router-dom';
import NavigationBar from './shared/components/NavigationBar';

function Layout() {
  return (
    <div className='bg-main flex h-full w-full flex-col'>
      <NavigationBar />
      <main className='h-main flex w-full justify-center'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
