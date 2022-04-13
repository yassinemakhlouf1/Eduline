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
import Course from './Components/course/Course';
import Chatbot from "./Components/chatbot/chatbot";



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
            <Route path="/forums/:id" element={<ForumDetails />} />
            <Route path="/form" exact element={<Form />} />
            <Route path="/course" exact element={<Course />} />
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
        <Chatbot />
      <Footer />
    </>
  );
}

export default App;
