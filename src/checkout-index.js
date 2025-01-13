import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Checkout from './Checkout';


const root = ReactDOM.createRoot(document.querySelector('#checkout-root'));
root.render(
  <React.StrictMode>
    <Checkout/>
  </React.StrictMode>
);


reportWebVitals();
