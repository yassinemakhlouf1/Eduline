import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from './styles';
import { createForum, updateForum } from "../../actions/forums";

const Form = ({ currentId, setCurrentId }) => {
    const [forumData, setForumData] = useState({ title: '', description: '', tags: '', selectedFile: '' });
    const forum = useSelector((state) => currentId ? state.forums.forums.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
        if(forum) setForumData(forum);
    }, [forum]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (currentId) {
            dispatch(updateForum(currentId, { ...forumData, name: user?.result?.username }));
        } else {
            dispatch(createForum({ ...forumData, name: user?.result?.username }, history));
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        setForumData({ title: '', description: '', tags: '', selectedFile: '' });
    };
    if(!user?.result.username) {
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
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Forum</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={forumData.title} onChange={(e) => setForumData({ ...forumData, title: e.target.value })} />
                <TextField multiline rows={8} name="description" variant="outlined" label="Description" fullWidth value={forumData.description} onChange={(e) => setForumData({ ...forumData, description: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={forumData.tags} onChange={(e) => setForumData({ ...forumData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setForumData({ ...forumData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;