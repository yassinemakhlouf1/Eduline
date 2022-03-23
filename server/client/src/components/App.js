import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import About from './pages/About';
import Header from './Header';
import Chatbot from './chatbot/chatbot';
import Course from './course/Course';
import Footer from './Footer';

const App = () => (
    <div>
       <BrowserRouter>
           <div className="">
               <Header />
               
               <Route exact path="/" component={Landing} />
               <Route exact path="/about" component={About} />
               <Route exact path="/course" component={Course} />

               <Chatbot />
               <Footer />
           </div>
       </BrowserRouter>
    </div>
)

export default App;