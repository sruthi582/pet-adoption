import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the 'client' import
import './index.css';
import App from './App';
import { UserContextProvider } from './context/UserContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root element

root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
