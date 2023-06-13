import React from 'react';
 import { createRoot } from 'react-dom/client';
 import { BrowserRouter } from 'react-router-dom';
import WebPage from './components/webpage';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <WebPage />
    </BrowserRouter>
  );