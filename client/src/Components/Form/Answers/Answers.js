import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from '../styles';
import { getStackoverflowAnswers } from "../../../actions/forums";

const Answers = ({ query }) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user-info'));
    const dispatch = useDispatch();
    const history = useNavigate();

    const answers = dispatch(getStackoverflowAnswers(query));

    if(!user?.user.username) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In.
                </Typography>
            </Paper>
        );
    }
    return (
        <Paper className={classes.paper} elevation={6} >
            
            <div>
            <Divider style={{ margin: '20px 0' }} />
                <div style={{display: 'flex', marginRight: '100px', padding: '10px'}}>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                    {/*<p style={{ fontSize: '2rem', color: '#133e3f', padding: '10px' }}>{votes}</p>*/}
                    </div>
                    <div style={{display: 'flex', flexDirection:'row', padding: '10px'}}>
                    {/*<Avatar alt={answer?.name}>{answer?.name?.charAt(0)}</Avatar>*/}
                    <p style={{ color: 'black' }}><strong style={{ padding: '10px', color: '#133e3f' }}>user : </strong> answer</p>
                    </div>
                </div>
            </div>
            <div>
            <Divider style={{ margin: '20px 0' }} />
                <div style={{display: 'flex', marginRight: '100px', padding: '10px'}}>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                    {/*<p style={{ fontSize: '2rem', color: '#133e3f', padding: '10px' }}>{votes}</p>*/}
                    </div>
                    <div style={{display: 'flex', flexDirection:'row', padding: '10px'}}>
                    {/*<Avatar alt={answer?.name}>{answer?.name?.charAt(0)}</Avatar>*/}
                    <p style={{ color: 'black' }}><strong style={{ padding: '10px', color: '#133e3f' }}>user : </strong> answer</p>
                    </div>
                </div>
            </div>
            <div>
            <Divider style={{ margin: '20px 0' }} />
                <div style={{display: 'flex', marginRight: '100px', padding: '10px'}}>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                    {/*<p style={{ fontSize: '2rem', color: '#133e3f', padding: '10px' }}>{votes}</p>*/}
                    </div>
                    <div style={{display: 'flex', flexDirection:'row', padding: '10px'}}>
                    {/*<Avatar alt={answer?.name}>{answer?.name?.charAt(0)}</Avatar>*/}
                    <p style={{ color: 'black' }}><strong style={{ padding: '10px', color: '#133e3f' }}>user : </strong> answer</p>
                    </div>
                </div>
            </div>
        </Paper>
    );
}

export default Answers;