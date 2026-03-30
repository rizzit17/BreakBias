import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/globals.css';
import { AppProvider } from './context/AppContext.jsx';
import { ModeProvider } from './context/ModeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ModeProvider>
  </StrictMode>
);
