import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Experience from './pages/Experience';
import Company from './pages/Company';
import Search from './pages/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Main /> },
      { path: 'search', element: <Search /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'experience', element: <Experience /> },
      { path: 'company', element: <Company /> },
    ],
  },
]);

export default router;
