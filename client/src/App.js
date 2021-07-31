import './App.css';
import useKeyPress from './useKeyPress';
import { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import Popup from 'reactjs-popup';

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
  const [wpm2, setWpm2] = useState(0);
  const [name, setName] = useState('');
  const [send, setSend]= useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gleId, setGleId] = useState('');
  const [username, setUsername] = useState('');
  
  const str1 = "My mission may be futile.";
  let str2 = "";
  function reset() {  //resets the timer
    setTimer(0);
    setIsActive(false);
  }

  function getData(){ //add parameter
    axios.get(`http://localhost:3001/LeaderBoard/${gleId}`, {} )
    .then((res) => {
      console.log(res.data);
    }, (error) => {
      console.log(error);
    });
  }

  function sendData(){
    if (send === true){
      console.log(send);  
      axios.post(`http://localhost:3001/UserScore/${gleId}/${wpm}`, {})
      .then((res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      });
    }
  }

  function wpm2Calc(){
    if (index === 0){
      setWpm2(0);
    } else {
      setWpm2(Math.round(wpm * (accuracy/100)));
    }
  }

  function accuracyCalc(){  //calculates accuracy
    if (index === 0){
      setAccuracy(0);
    } else if (index >= str1.length){
      setAccuracy(accuracy);
    } else {
      setAccuracy(Math.round((correctCounter/index) * 100));
    } 
  }

  function wpmCalc(){   //calculates words per minute
    if (index === 0){
      setWpm(0);
    } else if (index >= str1.length){
      setWpm(wpm);
      sendData();
      setSend(false);   
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
    wpm2Calc();
    // sendData();
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
      if (c === " "){
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
    if (!isFocused) {
      if (key === "Backspace") {
        setKeys(keys.splice(0,keys.length-1));
        setIsRight(isRight.splice(0,isRight.length-1));
        setCorrectCounter(correctCounter => correctCounter-1);
        if (index > 0) {
          setIndex(index => index-1);
        }
      } else if (key === "~"){
        resetWord();
      } else {
        setIsActive(true);
        setKeys(keys.concat(key));
        setIndex(index => index+1);
        // {printString()};
        if (key === str1.charAt(index)){
          setCorrectCounter(correctCounter => correctCounter+1);
          setIsRight(isRight => isRight.concat(true));
        } else {
          setMistakeCounter(mistakeCounter => mistakeCounter+1);
          setIsRight(isRight => isRight.concat(false)); //atomic operation
        }
      }
    }
  })

  //use effect to make it when the gleId changes, it searches the UserData db to see if a name goes with it, and assigns it if it does. and makes the name submit bar go away. 

  function resetWord(){    //resets everything every time ~ is pressed
    setKeys([]);
    setMistakeCounter(0);
    setCorrectCounter(0);
    setIndex(0);
    setIsRight([]);
    reset();
    setSend(true)
  }

  function printString(){   //prints the string and gets right of html elements
    return <h4 dangerouslySetInnerHTML={{__html: str, }}/> ;
  }

  const nameSub = (e) => {
    if (e.key === "Enter"){
      console.log(name);
    }
  }

  // const onInputChange = e => {
  //   setName(e.target.value);
  // }

  const responseSuccessGoogle = (response) => {
    setIsLoggedIn(true);
    setGleId(response.Os.$R);
    console.log(response.Os.$R);
    console.log(response);
  }
  //make post request and push token to backend
  const responseFailureGoogle = (response) => {
    console.log(response);
  }

  const handleSubmit = (e) => {
    setUsername(name);
    setName('');
    e.preventDefault(); 
    console.log(`Form submitted, ${name}`);
    //search collection for username, if it passes dont add and alert it exists, if it fails add
    //trigger another popup saying that username cannot be changed (or just make the name submission disappear) (or make it so when a person logs in, the username is auto saved)
    axios.get(`http://localhost:3001/UsernameCheck/${name}`, {})
      .then((res) => {
        if(res.data.length === 0){
          axios.post(`http://localhost:3001/UserData/${name}/${gleId}`, {})
          .then((res) => {
            console.log(res);
          }, (error) => {
            console.log(error);
          });
        } else {
          {triggerPopup()}
        }
        console.log(res.data);
      }, (error) => {
          console.log(error);
        })
          
    
    function triggerPopup(){
      console.log('exist')
      document.getElementById("modalButton").click();
    }

    // axios.post(`http://localhost:3001/UserData/${name}/${gleId}`, {})
    //   .then((res) => {
    //     console.log(res);

    //   }, (error) => {
    //     console.log(error);
    //   });
  }
  
  return (
    <div className="Typing-Test">
      <GoogleLogin  className = 'google'
        clientId="565884375585-2jpdbc390b42n87ig0c9vodu7tdgpdbf.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseFailureGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <header className="Content">
      <Popup trigger={<button className='invisible' id="modalButton"></button>} position="right center">
        <div>The username {name} already exists, choose another one</div>
      </Popup>
      <form onSubmit = {handleSubmit}>
        <input onChange = {(e) => setName(e.target.value)} value = {name} onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)}></input>
        <button type = 'submit'>Click to submit</button>
      </form>
        {printString()} 
      <p>Raw WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Calculated WPM: {wpm2}</p>
      <p>Username: {username}</p>
      <button onClick={getData}>Personal Leaderboard</button>
      </header>
      
    </div>
  );
}

export default App;
