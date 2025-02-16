import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Main />,
      },
    ],
  },
]);

export default router;
