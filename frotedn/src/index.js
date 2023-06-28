import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SpeechProvider } from "@speechly/react-client";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <SpeechProvider appId="fd3ee9c6-f0c0-48e8-a756-b312a6d67c66"> */}
    {/* <SpeechProvider appId="d1b88ed7-ac8a-4281-bf38-83b5046e5f1a" language="es"> */}
    <SpeechProvider appId="d1b88ed7-ac8a-4281-bf38-83b5046e5f1a" language="es">
        <App />
    </SpeechProvider>
  </React.StrictMode>
);