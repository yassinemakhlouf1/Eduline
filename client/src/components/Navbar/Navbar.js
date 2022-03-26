import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from './styles';

import eduline from '../../images/eduline.jpg';
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        //console.log(user);
        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={eduline} alt="icon" height="60px" />
            </Link>
            <Link to="/" className={classes.links}>Home</Link>
            <Link to="/" className={classes.links}>Courses</Link>
            <Link to="/forums" className={classes.links}>Forums</Link>
            <Link to="/" className={classes.links}>About us</Link>
            <Link to="/" className={classes.links}>Contact us</Link>
            <Toolbar className={classes.toolbar}>
                
                {user ? (
                    <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.user.username} src={user.user.imageUrl}>{user.user.username.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.user.username}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
            </AppBar>
    );
}
export default Navbar;