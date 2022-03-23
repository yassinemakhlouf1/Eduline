/*import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from './styles';
import { createComment, getComment } from '../../actions/comments';

const Comment = ({ forum }) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const comment = getComment();

    const handleClick = async () => {
        /*const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(createComment(finalComment, forum._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });*/ /*
    };

    return (
        <div>
            <div className={classes.commentsOutlerContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField 
                            fullWidth 
                            rows={4} 
                            variant="outlined" 
                            label="Comment" 
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;*/