import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import useStyles from './styles';
import { CircularProgress, Divider, Paper, Typography } from "@material-ui/core";

import CommentSection from "./CommentSection";
//import Comment from "./Comment";
import { getForum, getForumsBySearch } from "../../actions/forums";

const ForumDetails = () => {
    const { forum, forums, isLoading } = useSelector((state) => state.forums);
    const dispatch = useDispatch();
    const history = useNavigate();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getForum(id));
    }, [id]);

    useEffect(() => {
        if(forum) {
            dispatch(getForumsBySearch({ search: 'none', tags: forum?.tags }));
        }
    }, [forum]);

    if(!forum) return null;
    if(isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
                    <CircularProgress size="7em" />
                </Paper>
    };

    const recommandedForums = forums.filter(({ _id }) => _id !== forum._id);
    
    const openForum = (_id) => history(`/forums/${_id}`);
    return (
        <Paper styles={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{forum.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{forum.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{forum.description.split("\n").map((i,key) => { return <div key={key}>{i}</div>; })}</Typography>
                    <Typography variant="h6">Created by: {forum.name}</Typography>
                    <Typography variant="body1">{moment(forum.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    {/*<Comment forum={forum} />*/}
                    <CommentSection forum={forum} />
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Anser - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={forum.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={forum.title} />
                </div>
            </div>
            {(recommandedForums.length) && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedForums}>
                        {recommandedForums.map(({ title, name, likes, selectedFile , _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openForum(_id)} key={_id}>
                            <Typography gutterBottom variant="h6">{name}</Typography>
                            <Typography gutterBottom variant="subtitle1">{title}</Typography>
                            <Typography gutterBottom variant="subtitle2">Likes: {likes.length}</Typography>
                            <img src={selectedFile} width="200px" alt="forumImage" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
        
    );
};
export default ForumDetails;