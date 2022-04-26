import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import React,{ useState } from "react";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  timer,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const Navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  

  /*const intervalRef = useRef (null);
  const [timer, setTimer] = useState('00:00:00');
  function getTimeReaming(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total/1000)%60);
    const minutes = Math.floor((total/1000/60)%60);
    const hours = Math.floor((total/1000*60*60)%24);
    const days = Math.floor(total/(1000*60*60*24));
    return {
      total,days,hours,minutes,seconds
    };
    }

    function startTimer(deadline){
      let {total, days, hours , minutes , seconds} = getTimeReaming(deadline);
      if (total>=0){
        setTimer(
          (hours > 9 ? hours : '0'+hours) + ':' + 
          (minutes > 9 ? minutes : '0'+minutes) + ':' + 
          (seconds > 9 ? seconds : '0'+seconds)
        )
      } else {
        clearInterval(intervalRef.current);
      }
    }

    function clearTimer(endtime){
      setTimer('00:00:10');
      if (intervalRef.current) clearInterval(intervalRef.current);
      const id = setInterval(()=>{
        startTimer(endtime);
      },1000)
      intervalRef.current = id;
    }
    function getDeadlineTime(){
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds()+10);
      return deadline;
    }*/

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (currQues > 8) {
      Navigate("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>

      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
