import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { LoggedIn } from './components/LoggedIn/LoggedIn';
import { NotFound } from './components/NotFound/NotFound';
import { Signup } from './components/Signup/Signup';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path="/signup" element={<Signup></Signup>} />
                <Route path="/loggedIn" element={<LoggedIn></LoggedIn>} />
                <Route path="*" element={<NotFound></NotFound>} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
