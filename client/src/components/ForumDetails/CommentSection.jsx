import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Avatar, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import useStyles from './styles';
import { useNavigate } from "react-router-dom";
import { createComment, deleteComment } from "../../actions/comments";
import { getForum } from "../../actions/forums";

const CommentSection = ({ forum }) => {
    const classes = useStyles();
    const [commentData, setCommentData] = useState({ content: '' });
    const [comments, setComments] = useState(forum?.comments);
    const user = JSON.parse(localStorage.getItem('user-info'));
    //const result = JSON.parse(user);
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const history = useNavigate();

    const handleClick = async () => {
        
        const newComments = await dispatch(createComment({ ...commentData, name: user?.user?.username, creator: user?.user?._id }, forum?._id));;
        setComments(newComments);
        setCommentData({ content: '' });
        //commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeleteComment = (i) => {
        return (user?.user?._id === forum?.comments[i]?.creator) && (
        <Button size="small"  style={{ color: '#4bc5b8' }} disabled={!user?.user} onClick={() => {dispatch(deleteComment(forum?.comments[i]?._id)); const newForum = dispatch(getForum(forum._id)); setComments(newForum);}} >
            <DeleteIcon fontSize="small" />
        </Button>
    )};

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Paper className={classes.profile} elevation={3} key={i} spacing={1} style={{minHeight: '100px'}}>
                            <div style={{ padding: '10px', display: 'flex', flexDirection:'row' }}>
                                <Avatar alt={c.name}>{c.name.charAt(0)}</Avatar>
                                <strong style={{ padding: '10px' }}>{c.name} : </strong>
                                {c.content.split("\n").map((i,key) => {
                                    return <div key={key} style={{ padding: '10px' }}>{i.length > 50 ? i.split(' ').map((j,key) => { return <div key={key}>{j}</div>; }) : i}</div>;
                                })}
                            </div>
                            <div style={{display: 'flex', justifyContent:'flex-end'}}>{moment(c.createdAt).fromNow()}</div>
                            <div>
                                {handleDeleteComment(i)}
                            </div>
                        </Paper>
                    ))}
                    <div ref={commentsRef} />
                    {user?.user?.username && (
                        <div style={{ marginLeft: '100px', width: '87%' }}>
                            <TextField 
                                fullWidth 
                                rows={4} 
                                variant="outlined" 
                                label="Add comment" 
                                value={commentData.content}
                                onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                            />
                            <Button style={{ marginTop: '10px', backgroundColor: '#133e3f', color: 'white' }} fullWidth disabled={!commentData.content} variant="contained" onClick={handleClick}>
                                Comment
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;