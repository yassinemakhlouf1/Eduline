import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ForumDetails from './components/ForumDetails/ForumDetails';
import Navbar from './components/Navbar/Navbar';
import ForumsHome from './components/ForumsHome/ForumsHome';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/forums" exact element={<ForumsHome />} />
                    <Route path="/forums/search" exact element={<ForumsHome />} />
                    <Route path="/forums/:id" element={<ForumDetails />} />
                    <Route path="/auth" exact element={(!user ? <Auth /> : <Navigate replace to="/forums" />)} />
                    <Route path="/form" exact element={<Form />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};
export default App;
