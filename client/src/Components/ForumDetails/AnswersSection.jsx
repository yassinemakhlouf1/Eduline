import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Avatar, Paper, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import useStyles from './styles';
import { useNavigate } from "react-router-dom";
import { createAnswer, deleteAnswer } from "../../actions/answers";
import { PlusVote, MoinVote } from "../../actions/answers";
import CommentSection from "./CommentSection";

const AnswersSection = ({ forum }) => {
    const classes = useStyles();
    const [answerData, setAnswerData] = useState({ answer: '' });
    const [answers, setAnswers] = useState(forum?.answersDetails);
    const user = JSON.parse(localStorage.getItem('user-info'));
    //const result = JSON.parse(user);
    const dispatch = useDispatch();
    const answersRef = useRef();
    const history = useNavigate();
    const [votesPlus, setVotesPlus] = useState(forum?.answersDetails?.votesPlus);
    const [votesMoin, setVotesMoin] = useState(forum?.answersDetails?.votesMoin);
    const userId = user?.user?._id
    const hasVotedPlus = forum?.answersDetails?.votesPlus?.find((votesPlus) => votesPlus === userId);
    const hasVotedMoin = forum?.answersDetails?.votesMoin?.find((votesMoin) => votesMoin === userId);

    const handleClick = async () => {
        
        const newAnswers = await dispatch(createAnswer({ ...answerData, name: user?.user?.username, creator: user?.user?._id, forumid: forum?._id }));;
        setAnswers(newAnswers);
        setAnswerData({ answer: '' });
        //answersRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePlusVote = async () => {
        dispatch(PlusVote(userId, forum._id));
        if(hasVotedPlus) {
            setVotesPlus(forum?.answersDetails?.votesPlus.filter((id) => id !== userId));
        } else {
            setVotesPlus([ ...forum?.answersDetails?.votesPlus, userId ]);
        }
    };
    const handleMoinVote = async (i) => {
        dispatch(MoinVote(userId, forum._id));
        if(hasVotedMoin) {
            setVotesMoin(forum?.answersDetails[i]?.votesMoin.filter((id) => id !== userId));
        } else {
            setVotesMoin([ ...forum?.answersDetails[i]?.votesMoin, userId ]);
        }
    };

    return (
        <div>
            <div>
                <div>
                    <Typography gutterBottom variant="h6">Answers</Typography>
                    <div>
                        {answers?.map((c, i) => (
                        <div key={i}>
                        <Divider style={{ margin: '20px 0' }} />
                            <div style={{display: 'flex', marginRight: '100px', padding: '10px'}}>
                                <div style={{display: 'flex', flexDirection:'column'}}>
                                <button style={{ fontSize: '2rem', color: 'grey', backgroundColor: 'white', border: '0' }} onClick={handlePlusVote}>▲</button>
                                <p style={{ fontSize: '2rem', color: 'grey', padding: '10px' }}>{forum?.answersDetails[i]?.votesPlus?.length - forum?.answersDetails[i]?.votesMoin?.length}</p>
                                <button style={{ fontSize: '2rem', color: 'grey', backgroundColor: 'white', border: '0' }} onClick={handleMoinVote}>▼</button>
                                </div>
                                <div style={{display: 'flex', flexDirection:'row', padding: '10px'}}>
                                <Avatar alt={c?.name}>{c?.name?.charAt(0)}</Avatar>
                                <p><strong style={{ padding: '10px' }}>{c?.name} : </strong> {c.answer}</p>
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent:'flex-end', marginRight: '100px'}}>
                                <div style={{ marginRight: '50px'}}>{moment(c.createdAt).fromNow()}</div>
                            {/*<CommentSection forum={forum} style={{ width: '100%'}} />*/}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
                {user?.user?.username && (
                <div>
                    <h3>Your Answer</h3>
                    <div style={{ marginLeft: '100px', width: '70%' }}>
                        <TextField 
                            fullWidth 
                            rows={4} 
                            multiline
                            variant="outlined" 
                            label="Write your answer" 
                            value={answerData.answer}
                            onChange={(e) => setAnswerData({ ...answerData, answer: e.target.value })}
                        />
                        <Button style={{ marginTop: '10px', backgroundColor: '#133e3f', color: 'white' }} fullWidth disabled={!answerData.answer} variant="contained" onClick={handleClick}>
                            Answer
                        </Button>
                    </div>
                </div>
                )}
        </div>
    );
};

export default AnswersSection;