import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { HomePage } from './pages';

import './global.css';

const rootElement = document.getElementById('root');

if (rootElement instanceof HTMLElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <HomePage />
    </StrictMode>,
  );
} else {
  console.error("Could not find the 'root' element.");
}
