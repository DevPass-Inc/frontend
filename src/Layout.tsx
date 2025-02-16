import { Outlet } from 'react-router-dom';
import NavigationBar from './shared/components/NavigationBar';

function Layout() {
  return (
    <div className='flex h-full w-full flex-col'>
      <NavigationBar />
      <main className='h-main w-full'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
