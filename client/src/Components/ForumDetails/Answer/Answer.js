import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Avatar, Paper, Divider } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbDownAltOutlined from '@material-ui/icons/ThumbDownAltOutlined';
import { useDispatch } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import { useNavigate } from "react-router-dom";
import { PlusVote, MoinVote, deleteAnswer } from "../../../actions/answers";

const Answer = ({ answer }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user-info'));
    const [votesPlus, setVotesPlus] = useState(answer?.votesPlus);
    const [votesMoin, setVotesMoin] = useState(answer?.votesMoin);
    const userId = user?.user?._id
    const hasVotedPlus = answer?.votesPlus?.find((votesPlus) => votesPlus === userId);
    const hasVotedMoin = answer?.votesMoin?.find((votesMoin) => votesMoin === userId);
    const votes = votesPlus?.length - votesMoin?.length;
    
    const handleVotesPlus = async () => {
        dispatch(PlusVote(userId, answer?._id));
        if(hasVotedPlus) {
            setVotesPlus(answer?.votesPlus.filter((id) => id !== userId));
        } else {
            setVotesPlus([ ...answer?.votesPlus, userId ]);
        }
    };

    const VotesPlus = () => {
        if (votesPlus.length > 0) {
          return votesPlus.find((votesPlus) => votesPlus === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" /></>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" /></>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" /></>;
      };

    const handleVotesMoin = async () => {
        dispatch(MoinVote(userId, answer?._id));
        if(hasVotedMoin) {
            setVotesMoin(answer?.votesMoin.filter((id) => id !== userId));
        } else {
            setVotesMoin([ ...answer?.votesMoin, userId ]);
        }                                                                                                                                      
    };
  
    const VotesMoin = () => {
        if (votesMoin.length > 0) {
            return votesMoin.find((votesMoin) => votesMoin === userId)
                ? (
                    <><ThumbDownAltIcon fontSize="small" /></>
                ) : (
                    <><ThumbDownAltOutlined fontSize="small" /></>
                );
        }
      
        return <><ThumbDownAltOutlined fontSize="small" /></>;
    };

      return (
        
            <div>
            <Divider style={{ margin: '20px 0' }} />
                <div style={{display: 'flex', marginRight: '100px', padding: '10px'}}>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                    <button disabled={answer.votesMoin == userId} style={{ fontSize: '2rem', color: '#133e3f', backgroundColor: 'white', border: '0' }} onClick={handleVotesPlus}><VotesPlus /></button>
                    <p style={{ fontSize: '2rem', color: '#133e3f', padding: '10px' }}>{votes}</p>
                    <button disabled={answer.votesPlus == userId} style={{ fontSize: '2rem', color: '#133e3f', backgroundColor: 'white', border: '0' }} onClick={handleVotesMoin}><VotesMoin /></button>
                    </div>
                    <div style={{display: 'flex', flexDirection:'row', padding: '10px'}}>
                    <Avatar alt={answer?.name}>{answer?.name?.charAt(0)}</Avatar>
                    <p style={{ color: 'black' }}><strong style={{ padding: '10px', color: '#133e3f' }}>{answer?.name} : </strong> {answer.answer.split("\n").map((i,key) => { return <div key={key}>{i}</div>; })}</p>
                    </div>
                </div>
                </div>
            
      );
};

export default Answer;