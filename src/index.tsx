import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/antd.css';
import App from './app/App';
// In your main entry file, e.g., index.js or App.js
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use a custom CSS file if needed

AOS.init();
/**
 * The root element of the application.
 */
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

/**
 * The root element of the application.
 */
const root = createRoot(container);

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

