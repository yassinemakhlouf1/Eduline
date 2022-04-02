import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from "react-router-dom";

import './App.css';
import Home from './Components/Home';
import Header from './Components/static/Header';
import {Outlet } from 'react-router-dom';
import Footer from './Components/static/Footer';
import Login from './Components/login/Login';
import Register from './Components/login/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Layout />} >
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

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
