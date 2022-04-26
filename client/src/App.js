import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";
import './App.css';
import Home from './Components/Home';
import Header from './Components/static/Header';
import {Outlet } from 'react-router-dom';
import Footer from './Components/static/Footer';
import Login from './Components/login/Login';
import Register from './Components/login/Register';
import Forgot from './Components/login/Forgot';
import Reset from './Components/login/Reset';
import ForumDetails from './Components/ForumDetails/ForumDetails';
import ForumsHome from './Components/ForumsHome/ForumsHome';
import Form from './Components/Form/Form';
import DomainsAs from "./Components/CourseAs/DomainsAs";
import CoursASCH from "./Components/CourseAs/CoursASCH";
import Quiz from "./Components/quiz/Quiz";
import Course from './Components/course/Course';
import Chatbot from "./Components/chatbot/chatbot";
import Contact from "./Components/Contact/Contact";
import AddCourseAS from "./Components/CourseAs/AddCourseAS";
import CourseAsDetails from "./Components/CourseAs/CourseAsDetails";
import Testimg from "./Components/CourseAs/Testimg";
import DomainsDetail from "./Components/CourseAs/DomainsDetail";
import AddDomain from "./Components/CourseAs/AddDomain";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Layout />} >
          <Route path="/CoursASCH/" element={<CoursASCH />} />
             <Route path="/img" element={<Testimg />} />
             <Route path="/quiz" element={<Quiz />} />
             <Route path="/reset" element={<Reset />} />
             <Route path="/reset/:id" element={<Forgot />} />
            <Route path="/DomainsAs" element={<DomainsAs />} />
            <Route path="/ListDomainsAs" element={<AddDomain />} />
            <Route path="/domain/:id/:title" exact element={<DomainsDetail />} />
            <Route path="/AddCourseAS" element={<AddCourseAS />} />
            <Route path="/Chp/:id/:title" element={<CourseAsDetails/>}/>
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/forums" exact element={<ForumsHome />} />
            <Route path="/forums/search" exact element={<ForumsHome />} />
            <Route path="/forums/:userId" exact element={<ForumsHome />} />
            <Route path="/forums/forum/:id" element={<ForumDetails />} />
            <Route path="/form" exact element={<Form />} />
            <Route path="/course" exact element={<Course />} />
            <Route path="/contact"  element={<Contact />} />
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
