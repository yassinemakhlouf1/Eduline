import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import About from './pages/About';
import Header from './Header';
import Chatbot from './chatbot/chatbot';
import Course from './course/Course';
import Footer from './Footer';
import Home from './pages/Home';
import Forum from './forum/Forum';
import Test from './test_evaluation/test';

const App = () => (
    <div>
       <BrowserRouter>
           <div className="">
               <Header />
               
               <Route exact path="/" component={Home} />
               <Route exact path="/about" component={About} />
               <Route exact path="/course" component={Course} />
               <Route exact path="/forum" component={Forum} />
               <Route exact path="/test_evaluation" component={Test} />

               <Chatbot />
               
           </div>
       </BrowserRouter>
    </div>
)

export default App;