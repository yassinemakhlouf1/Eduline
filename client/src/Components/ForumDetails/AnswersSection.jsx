import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Avatar, Paper, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import useStyles from './styles';
import { useNavigate } from "react-router-dom";
import { createAnswer, deleteAnswer } from "../../actions/answers";
import { PlusVote, MoinVote } from "../../actions/answers";
import CommentSection from "./CommentSection";
import Answer from "./Answer/Answer";

const AnswersSection = ({ forum }) => {
    const [answers, setAnswers] = useState(forum?.answersDetails);
    
    const [answerData, setAnswerData] = useState({ answer: '' });
    const user = JSON.parse(localStorage.getItem('user-info'));
    //const result = JSON.parse(user);
    const dispatch = useDispatch();
    const answersRef = useRef();
    const userId = user?.user?._id


    const handleClick = async () => {
        
        const newAnswers = await dispatch(createAnswer({ ...answerData, name: user?.user?.username, creator: user?.user?._id, forumid: forum?._id }));
        setAnswers(newAnswers);
        setAnswerData({ answer: '' });
        //answersRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div>
                <div>
                    <Typography gutterBottom variant="h6" style={{ marginLeft: '10px' }}>Answers</Typography>
                    <div>
                        {answers?.map((answer) => (
                            <div>
                        <Answer answer={answer} />
                        <div style={{display: 'flex', justifyContent:'flex-end', marginRight: '100px'}}>
                        <div style={{ marginRight: '50px'}}>{moment(answer.createdAt).fromNow()}</div>
                        {(user?.user?._id === answer?.creator) && (
                        <Button size="small"  style={{ color: '#133e3f' }} disabled={!user?.user} onClick={async () => {
                            const newAnswers = await dispatch(deleteAnswer(answer._id));
                            setAnswers(newAnswers);
                        }}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                        )}
                        </div>
                    </div>
                        ))}
                    </div>
                </div>
            </div>
                {user?.user?.username && (
                <div>
                    <h3 style={{ marginLeft: '10px' }}>Your Answer</h3>
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