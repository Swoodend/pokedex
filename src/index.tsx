import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <main className="bg-gray-50 min-h-screen">
      <App />
    </main>
  </BrowserRouter>,
  document.getElementById('root')
);

