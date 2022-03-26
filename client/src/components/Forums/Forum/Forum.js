import React, { useState } from "react";
import { Card, CardActions, CardMedia, Button, Typography, ButtonBase, CardContent, Avatar } from "@material-ui/core";
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
    const userId = user?.user?._id
    const hasLikedForum = forum.likes.find((like) => like === userId);
    
    const handleLike = async () => {
        dispatch(likeForum(userId, forum._id));
        if(hasLikedForum) {
            setLikes(forum.likes.filter((id) => id !== userId));
        } else {
            setLikes([ ...forum.likes, userId ]);
            //console.log(userId);
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

      const truncate = (str, n) => {
          return str?.length > n ? str.substr(0, n-1) + "..." : str;
      };

    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={!forum.selectedFile ? blue : forum.selectedFile} title={forum.title} />
            <div className={classes.overlay}>
                <div className={classes.profile}>
                    <Avatar alt={forum.name}>{forum.name.charAt(0)}</Avatar>
                    <Typography variant="h6">{forum.name}</Typography>
                </div>
                <Typography variant="body2">{moment(forum.createdAt).fromNow()}</Typography>
                <Typography variant="body2">{forum?.answersDetails?.length} Answers</Typography>
                <Typography variant="body2">{forum?.comments?.length} Comments</Typography>
            </div>
            <ButtonBase className={classes.cardAction} onClick={openForum}>
                <Typography className={classes.title} variant="h5" gutterBottom>{truncate(forum.title, 25)}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{truncate(forum.description, 90)}</Typography>
                    <Typography variant="body2" color="textSecondary">{forum.tags.map((tag) => `#${tag} `)}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.user} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.user?._id === forum?.creator) && (
                    <Button size="small" color="primary" disabled={!user?.user} onClick={() => dispatch(deleteForum(forum._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Forum;