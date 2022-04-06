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
    const [votesPlus, setVotesPlus] = useState(answers?.votesPlus);
    const [votesMoin, setVotesMoin] = useState(answers?.votesMoin);
    const userId = user?.user?._id
    const hasVotedPlus = answers?.votesPlus?.find((votesPlus) => votesPlus === userId);
    const hasVotedMoin = answers?.votesMoin?.find((votesMoin) => votesMoin === userId);

    const handleClick = async () => {
        
        const newAnswers = await dispatch(createAnswer({ ...answerData, name: user?.user?.username, creator: user?.user?._id, forumid: forum?._id }));;
        setAnswers(newAnswers);
        setAnswerData({ answer: '' });
        //answersRef.current.scrollIntoView({ behavior: 'smooth' });
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
                                <button disabled={answers[i].votesMoin == userId} style={{ fontSize: '2rem', color: 'grey', backgroundColor: 'white', border: '0' }} onClick={
                                    () => {
                                        dispatch(PlusVote(userId, answers[i]?._id));
                                        if(hasVotedPlus) {
                                            setVotesPlus(answers?.votesPlus.filter((id) => id !== userId));
                                        } else {
                                            setVotesPlus([ ...answers?.votesPlus, userId ]);
                                        }
                                        console.log(votesPlus);
                                    }
                                }>▲</button>
                                <p style={{ fontSize: '2rem', color: 'grey', padding: '10px' }}>{Number(answers[i]?.votesPlus?.length - answers[i]?.votesMoin?.length)}</p>
                                <button disabled={answers[i].votesPlus == userId} style={{ fontSize: '2rem', color: 'grey', backgroundColor: 'white', border: '0' }} onClick={
                                    () => {
                                        dispatch(MoinVote(userId, answers[i]?._id));
                                        if(hasVotedMoin) {
                                            setVotesMoin(answers?.votesMoin.filter((id) => id !== userId));
                                        } else {
                                            setVotesMoin([ ...answers?.votesMoin, userId ]);
                                        }
                                    }
                                }>▼</button>
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