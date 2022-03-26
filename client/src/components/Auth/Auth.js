import React, { useState } from "react";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Icon from "./Icon";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import Input from "./Input.js";
import { signin, signup } from '../../actions/auth';

const initialState = { username: '', password: '' }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {
        e.preventDefault();
            dispatch(signin(formData, history));
            console.log(formData);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Sign In</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="username" label="User Name" handleChange={handleChange} type="text" />
                        <Input name="password" label="Possword" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
export default Auth;