import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
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
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
} else {
  console.error("Could not find the 'root' element.");
}
