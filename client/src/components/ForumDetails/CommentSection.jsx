import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Avatar, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import useStyles from './styles';
import { commentForum } from '../../actions/forums';
import { useNavigate } from "react-router-dom";
import { createComment, deleteComment } from "../../actions/comments";

const CommentSection = ({ forum }) => {
    const classes = useStyles();
    const [commentData, setCommentData] = useState({ content: '' })
    const [comments, setComments] = useState(forum?.comments);
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const history = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(createComment({ ...commentData, name: user?.user?.username, creator: user?.user?._id }, forum?._id, history));
        console.log(forum?.comments);
        setComments(forum?.comments);
        setCommentData({ content: '' });
    };

    const handleDeleteComment = (i) => {
        return (user?.user?._id === forum?.comments[i]?.creator) && (
        <Button size="small" color="secondary" disabled={!user?.user} onClick={() => dispatch(deleteComment(forum?.comments[i]?._id))} >
            <DeleteIcon fontSize="small" />
        </Button>
    )};

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Paper className={classes.profile} elevation={6} key={i} spacing={1} style={{minHeight: '100px'}}>
                            <div style={{ padding: '10px' }}>
                                <strong>{c.name} : </strong>
                                {c.content.split("\n").map((i,key) => {
                                    return <div key={key}>{i.length > 50 ? i.split(' ').map((j,key) => { return <div key={key}>{j}</div>; }) : i}</div>;
                                })}
                            </div>
                            <div  style={{display: 'flex', justifyContent:'flex-end'}}>{moment(c.createdAt).fromNow()}</div>
                            <div>
                                {handleDeleteComment(i)}
                            </div>
                        </Paper>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.user?.username && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField 
                            fullWidth 
                            rows={4} 
                            variant="outlined" 
                            label="Comment" 
                            multiline
                            value={commentData.content}
                            onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!commentData.content} variant="contained" onClick={handleClick} color="primary">
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;