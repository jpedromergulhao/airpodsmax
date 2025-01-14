import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Checkout from './Checkout';

console.log("Sucesso!");

const root = ReactDOM.createRoot(document.querySelector('#checkout-root'));
root.render(
  <React.StrictMode>
    <Checkout/>
  </React.StrictMode>
);


reportWebVitals();
