import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthProvider} from './context/AuthProvider';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();
ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/*" element={<App/>}/>
            </Routes>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);