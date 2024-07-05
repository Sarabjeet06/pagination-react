import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import SearchItem from './components/SearchItem';
import Cart from './components/Cart';
import CartContextProvider from './context/CartContextProvider';
import SearchContextProvider from './context/SearchContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<Home />}></Route>
      <Route path='/search' element={<SearchItem />} ></Route>
      <Route path='/cart' element={<Cart />} ></Route>
    </Route>
  )
)

root.render(
    <CartContextProvider>
      <SearchContextProvider>
        <RouterProvider router={router} />
      </SearchContextProvider>
    </CartContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
