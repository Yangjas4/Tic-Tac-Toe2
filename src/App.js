import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';

export default function App(){
    return (
        <BrowserRouter >
                <Route to="/" element={Homepage} />
                <Route to="/" element={Homepage} />
                <Route to="/" element={Homepage} />
        </BrowserRouter>
    )
}