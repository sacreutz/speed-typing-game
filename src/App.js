/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const STARTING_TIME = 5;
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const inputRef = useRef(null)

  function handleChange(e) {
    const { value } = e.target;
    setText(value);
  }

  function calculateWordCount(text) {
    const wordsArray = text.trim().split(" ");
    return wordsArray.filter((word) => word !== "").length;
  }

  function startClock() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("");
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function endGame() {
    setIsTimeRunning(false);
    const numWords = calculateWordCount(text);
    setWordCount(numWords);
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea onChange={handleChange} value={text} disabled={!isTimeRunning} ref={inputRef}/>
      <h4>Time remaining: {timeRemaining} </h4>
      <button onClick={startClock} disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
