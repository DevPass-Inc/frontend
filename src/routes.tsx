import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Experience from './pages/Experience';
import Company from './pages/Company';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Main />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'experience', element: <Experience /> },
          { path: 'company', element: <Company /> },
        ],
      },
    ],
  },
]);

export default router;
