import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Experience from './pages/Experience';
import Company from './pages/Company';
import Search from './pages/Search';
import ExperienceNew from './pages/ExperienceNew';
import CompanyMatchingResume from './pages/CompanyMatching/CompanyMatchingResume';
import CompanyMatchingResult from './pages/CompanyMatching/CompanyMatchingResult';
import CompanyMatchingDetail from './pages/CompanyMatching/CompanyMatchingDetail';
import ResumeExperience from './pages/Resume/ResumeExperience';
import ResumeGithub from './pages/Resume/ResumeGithub';
import ResumeCompany from './pages/Resume/ResumeCompany';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Main /> },
      { path: 'search', element: <Search /> },
      { path: 'exp/new', element: <ExperienceNew /> },
      {
        path: 'company/matching/',
        children: [
          { path: 'resume', element: <CompanyMatchingResume /> },
          { path: 'result', element: <CompanyMatchingResult /> },
          { path: 'result/:id', element: <CompanyMatchingDetail /> },
        ],
      },
      { path: 'company/:id', element: <Company /> },
      {
        path: 'resume/',
        children: [
          { path: 'exp', element: <ResumeExperience /> },
          { path: 'github', element: <ResumeGithub /> },
          { path: 'company', element: <ResumeCompany /> },
        ],
      },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'experience', element: <Experience /> },
    ],
  },
]);

export default router;
