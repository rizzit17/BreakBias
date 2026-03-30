import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/globals.css';
import { AppProvider } from './context/AppContext.jsx';
import { ModeProvider } from './context/ModeContext.jsx';
import { AudioProvider } from './context/AudioContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AudioProvider>
      <ModeProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ModeProvider>
    </AudioProvider>
  </StrictMode>
);
