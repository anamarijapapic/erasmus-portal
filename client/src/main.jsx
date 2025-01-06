import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Flowbite } from 'flowbite-react';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Flowbite>
        <App />
      </Flowbite>
    </AuthProvider>
  </StrictMode>
);
