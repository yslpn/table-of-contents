import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { HomePage } from './pages/home';

import './global.css';

const rootElement = document.getElementById('root');

const router = createBrowserRouter([
  {
    path: '/*',
    element: <HomePage />,
  },
]);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
} else {
  console.error("Could not find the 'root' element.");
}
