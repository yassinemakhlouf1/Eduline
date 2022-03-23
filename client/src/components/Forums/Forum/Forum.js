import React, { useState } from "react";
import { Card, CardActions, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import blue from '../../../images/blue.jpg';
import { deleteForum, likeForum } from "../../../actions/forums";

const Forum = ({ forum, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(forum?.likes);
    const userId = user?.result.googleId || user?.result?._id
    const hasLikedForum = forum.likes.find((like) => like === userId);
    
    const handleLike = async () => {
        dispatch(likeForum(forum._id));
        if(hasLikedForum) {
            setLikes(forum.likes.filter((id) => id !== userId));
        } else {
            setLikes([ ...forum.likes, userId ]);
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      const openForum = () => {
          history(`/forums/${forum._id}`);
      };

    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={!forum.selectedFile ? blue : forum.selectedFile} title={forum.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{forum.name}</Typography>
                <Typography variant="body2">{moment(forum.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === forum?.creator || user?.result?._id === forum?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={() => {
                        setCurrentId(forum._id);
                        history('/form');
                        }}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <ButtonBase className={classes.cardAction} onClick={openForum}>
                <Typography className={classes.title} variant="h5" gutterBottom>{forum.title}</Typography>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{forum.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === forum?.creator || user?.result?._id === forum?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deleteForum(forum._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Forum;