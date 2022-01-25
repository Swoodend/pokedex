import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import FavouritePokemonProvider from './context/FavouritePokemonProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <FavouritePokemonProvider>
    <BrowserRouter>
      <main className="bg-gray-50 min-h-screen">
        <App />
        <ToastContainer
          autoClose={3500}
          hideProgressBar={true}
          closeOnClick={true}
          draggable={false}
          position="bottom-right"
        />
      </main>
    </BrowserRouter>
  </FavouritePokemonProvider>,
  document.getElementById('root')
);

