import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from './styles';
import { createForum, getStackoverflowAnswers, updateForum } from "../../actions/forums";

const AskStackoverflow = () => {
    const [forumData, setForumData] = useState({ title: '' });
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user-info'));
    const dispatch = useDispatch();
    const history = useNavigate();
    const [ answers, setAnswers ] = useState();

    const Answers = () => {
        const classes = useStyles();
        const user = JSON.parse(localStorage.getItem('user-info'));
        const dispatch = useDispatch();
        const history = useNavigate();
        
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
            <div>
            <h5>Here are some answers from people who have asked similar questions</h5>
            {answers.data?.map((answer, key) => (
                <div key={key}>
                    <div style={{display: 'flex', marginRight: '100px', padding: '10px'}}>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                        {/*<p style={{ fontSize: '2rem', color: '#133e3f', padding: '10px' }}>{votes}</p>*/}
                        </div>
                        <div style={{display: 'flex', width: '109%', flexDirection:'row', padding: '10px'}}>
                        {/*<Avatar alt={answer?.name}>{answer?.name?.charAt(0)}</Avatar>*/}
                        <pre style={{ color: 'black', fontSize: '14px' }}><strong style={{ padding: '10px', color: '#133e3f', fontSize: '16px' }}>{answer?.answer?.answerer} : </strong> {answer?.answer?.content}</pre>
                        </div>
                    </div>
                <Divider style={{ margin: '20px 0' }} />
                </div>
            ))}
            <h3>Does any of these answer your question?</h3>
            <Button onClick={(e) => history('/forums')} className={classes.buttonSubmit} variant="contained" size="large" type="submit" style={{ margin: '10px', backgroundColor: '#133e3f', color: 'white' }}>Yes, I found the answer</Button>
            <Button onClick={(e) => history('/form')} className={classes.buttonSubmit} variant="contained" size="large" type="submit" style={{ margin: '10px', backgroundColor: '#133e3f', color: 'white' }}>No! Let's ask Eduliners</Button>
            </div>
            
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAnswers(await dispatch(getStackoverflowAnswers(forumData.title)));
        //history(`/forums/stackoverflow/${forumData.title}`);
    };
    const clear = () => {
        setForumData({ title: '' });
    };
    if(!user?.user.username) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own forums and like other's forums.
                </Typography>
            </Paper>
        );
    }
    return (
        <Paper className={classes.paper} elevation={6} >
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Ask Question</Typography>
                <TextField multiline name="title" variant="outlined" label="Title" fullWidth value={forumData.title} onChange={(e) => setForumData({ ...forumData, title: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth  style={{ marginTop: '10px', backgroundColor: '#133e3f', color: 'white' }} >Submit</Button>
                <Button variant="contained" size="small" onClick={clear} fullWidth >Clear</Button>
            </form>
            {answers && (
                <div>
                    <Answers /> 
                    </div>
                
            )}
        </Paper>
    );
}

export default AskStackoverflow;