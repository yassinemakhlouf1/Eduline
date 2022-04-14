import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";
import './App.css';
import Home from './Components/Home';
import Header from './Components/static/Header';
import {Outlet } from 'react-router-dom';
import Footer from './Components/static/Footer';
import Login from './Components/login/Login';
import Register from './Components/login/Register';
import ForumDetails from './Components/ForumDetails/ForumDetails';
import ForumsHome from './Components/ForumsHome/ForumsHome';
import Form from './Components/Form/Form';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Layout />} >
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/forums" exact element={<ForumsHome />} />
            <Route path="/forums/search" exact element={<ForumsHome />} />
            <Route path="/forums/:userId" exact element={<ForumsHome />} />
            <Route path="/forums/forum/:id" element={<ForumDetails />} />
            <Route path="/form" exact element={<Form />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}
function Layout() {
  return (
    <>
      <Header />
      <div >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
