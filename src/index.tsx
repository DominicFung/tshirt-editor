import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';

/**
 * For Shopify's use case, we need to render the app into a div with id "react-shopify-test"
 * Usually its: "root"
 */
const root = ReactDOM.createRoot(
  document.getElementById('react-shopify-test') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
