import './App.css';
import useKeyPress from './useKeyPress';
import { useState, useEffect } from "react";

function App() {
 
  const [keys, setKeys] = useState([]);
  const [index, setIndex] = useState(0);
  const [mistakeCounter, setMistakeCounter] = useState(0);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [isRight, setIsRight] = useState([]);
  const [str, setStr] = useState();
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const str1 = "My mission may be futile. Perhaps I imagined the sighting. But the poignant call and the loon’s hesitant plunge persuaded me that I had, after all these years, found my grandmother. And this time I will not be diverted. This time I will honor my promise.";
  let str2 = "";

  function reset() {  //resets the timer
    setTimer(0);
    setIsActive(false);
  }

  function accuracyCalc(){  //calculates accuracy
    if (index === 0){
      setAccuracy(0);
    } else {
      setAccuracy(Math.round((correctCounter/index) * 100));
    }
  }

  function wpmCalc(){   //calculates words per minute
    if (index === 0){
      setWpm(0);
    } else if (index === str1.length){
      setWpm(wpm);
    }
    else {
      setWpm(Math.round((index/5)/(timer/60)));
    }
    //wpm is (character count/average length) / (time / 60)  
  }

  useEffect(() => {   //in charge of timer, wpm calc, and accuracy calc
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 0.5);
      }, 500);
    } else if (!isActive && timer !== 0){
      clearInterval(interval);
    }
    wpmCalc();
    accuracyCalc();
    return () => clearInterval(interval);
  }, [isActive, timer]);

  useEffect(() => {   //reprints string every time key is pressed
    resetString();
  }, [isRight]);

  function resetString(){   //set printed string to original and change it
    setStr(str1);
    changeString();
  }

  function changeString() {   //adds the color and underline to the string up until the number of characters typed every time it is reprinted
    str2 += "<h4>";
    for (var i = 0; i < str1.length; i++){
      var c = str1.charAt(i);
      if (c == " "){
        if (i === isRight.length){
          str2 += "<u>" + c + "</u>";
        } else {
          str2 += c;
        }
      } else if (isRight[i] === true){ 
        if (i === isRight.length-1){
          str2 += "<span style='color:green'>" + c + "</span>";
        } else {
          str2 += "<span style='color:green'>" + c + "</span>";
        }
      } else if (isRight[i] === false) {
        str2 += "<span style='color:red'>" + c + "</span>";
      } else {
          if(i === isRight.length){
            str2 += "<u>" + c + "</u>";
          } else {
            str2 += c;
          }
      }
    }
    str2 += "</h4>"
    setStr(str2);
  }

  useKeyPress(key => {    //keyPress hook in charge of keeping track of every key entered and checking to see if it matches the particular index in the string
    if (key === "Backspace") {
      setKeys(keys.splice(0,keys.length-1));
      setIsRight(isRight.splice(0,isRight.length-1));
      if (index > 0) {
        setIndex(index => index-1);
      }
    } else if (key === "~"){
      resetWord();
    } else {
      setIsActive(true);
      setKeys(keys.concat(key));
      setIndex(index => index+1);
      {printString()};
      if (key === str1.charAt(index)){
        setCorrectCounter(correctCounter => correctCounter+1);
        setIsRight(isRight => isRight.concat(true));
      } else {
        setMistakeCounter(mistakeCounter => mistakeCounter+1);
        setIsRight(isRight => isRight.concat(false)); //atomic operation
      }
    }
  })

  function resetWord(){    //resets everything every time ~ is pressed
    setKeys([]);
    setMistakeCounter(0);
    setCorrectCounter(0);
    setIndex(0);
    setIsRight([]);
    reset();
  }

  function printString(){   //prints the string and gets right of html elements
    return <h4 dangerouslySetInnerHTML={{__html: str, }}/> ;
  }

  return (
    <div className="Typing-Test">
      <header className="Content">
        {printString()} 
      {/* <p>Correct counter: {correctCounter}</p>
      <p>Mistake counter: {mistakeCounter}</p> */}
      {/* <p>index: {index}</p> */}
      {/* <p>Timer: {timer} </p> */}
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      </header>
    </div>
  );
}

export default App;
