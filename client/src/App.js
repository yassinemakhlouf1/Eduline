import {BrowserRouter,Routes,Route} from "react-router-dom";
import React, { useState } from "react";
import './App.css';
import Home from './Components/Home';
import { Outlet } from 'react-router-dom';
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
import Chatbot from "./Components/chatbot/chatbot";
import Contact from "./Components/Contact/Contact";
import AddCourseAS from "./Components/CourseAs/AddCourseAS";
import CourseAsDetails from "./Components/CourseAs/CourseAsDetails";
import Testimg from "./Components/CourseAs/Testimg";
import DomainsDetail from "./Components/CourseAs/DomainsDetail";
import AddDomain from "./Components/CourseAs/AddDomain";
import AskStackoverflow from "./Components/Form/AskStackoverflow";
import Answers from "./Components/Form/Answers/Answers";
import axios from "axios";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import Home1 from "./Pages/Home/Home1";
import Header from "./Components/static/Header";
import Join from "./Components/meet/Join";
import Meeting from "./Components/meet/Meeting"


function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Layout />} >
          <Route path="/CoursASCH/" element={<CoursASCH />} />
             <Route path="/img" element={<Testimg />} />
             <Route path="/reset" element={<Reset />} />
             <Route path="/reset/:id" element={<Forgot />} />
            <Route path="/DomainsAs" element={<DomainsAs />} />
            <Route path="/ListDomainsAs" element={<AddDomain />} />
            <Route path="/domain/:id/:title" exact element={<DomainsDetail />} />
            <Route path="/AddCourseAS" element={<AddCourseAS />} />
            <Route path="/Chp/:id/:title" element={<CourseAsDetails/>}/>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/forums" exact element={<ForumsHome />} />
            <Route path="/forums/search" exact element={<ForumsHome />} />
            <Route path="/forums/:userId" exact element={<ForumsHome />} />
            <Route path="/forums/forum/:id" element={<ForumDetails />} />
            <Route path="/form" exact element={<Form />} />
            <Route path="/askstack" exact element={<AskStackoverflow />} />
            {/*<Route path="/forums/stackoverflow/:query" exact element={<Answers />} />*/}
            <Route path="/contact"  element={<Contact />} />
            {/* <div className="app" style={{ backgroundImage: 'url("/ques1.png")' }}> */}
        {/* <Header /> */}
          <Route path="/Home1" exact 
            element={<Home1
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />} />
          <Route path="/quiz"
            element={<Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />} />
          <Route path="/result"
            element={<Result name={name} score={score} />} />
      {/* </div> */}
      
      <Route  path="/meet" element={<Join/>} />
     
          </Route>
          <Route path="/" element={<Meet />} >
          <Route  path="/video/:id" element={<Meeting/>} />
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
      < Footer />
    </>
  );
}
function Meet() {
  return (
    <>
       <Header /> 
      <div >
        <Outlet />
      </div>
    </>
  );
}

export default App;
