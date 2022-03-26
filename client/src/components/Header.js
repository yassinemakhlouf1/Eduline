import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <div className="navbar-fixed">
        <nav>
        <div className="nav-wrapper">        
        <Link to={'/'} className="brand-logo">EDULINE</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to={'/course'}>Course</Link></li>
            <li><Link to={'/about'}>About us</Link></li>
            <li><Link to={'/forum'}>Forum</Link></li>
            <li><Link to={'/test_evaluation'}>Test and Evaluation</Link></li> 
        </ul>
        </div>
        </nav>
    </div>
)

export default Header;