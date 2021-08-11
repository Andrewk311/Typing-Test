import './App.css';
import useKeyPress from './useKeyPress';
import { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie';

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
  const [calcWpm, setCalcWpm] = useState(0);
  const [name, setName] = useState('');
  const [send, setSend]= useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gleId, setGleId] = useState('');
  const [username, setUsername] = useState('');
  const [completed, setCompleted] = useState(false);
  const cookies = new Cookies();

  
  const strArray = ['He comes to me in pieces as I watch the stillness of space, envisioning new constellations in the array of unrecognized stars. I trace the sparks of light with my finger, connecting the dots and smudging the glass as a result.  How many stars do you think there are in space? I imagine him asking. Can there really be other ones out there as big as or even bigger than the sun? I always admired his genuine curiosity, how he viewed things with a particular interest, how he saw me.',
  'I saw a tree and thought of you, or rather, thought of the way you see trees. I remembered when we walked through the Ramble in Central Park, a wild place in the center of a place wilder still, resplendent and emerald in the early summer sun. You stopped suddenly when you saw it. I remember how you cocked your head in appreciation, a tendril of hair escaped from behind your ear. You brushed it back with an unconscious hand. There it is, you said, with such earnest excitement that I could not help but feel I was missing something exceptional. I was, as it turns out.', 
  'I often think about the useless rooms now, and what they are, and I think the house is one big brain, mine only to think and feel as I please. I gave the living room chair away to charity. I never wanted to sit in it again. Each room is like a lobe of my mind, and I have no photos of you up on the walls. The wallpapers underneath where they used to hang are a little lighter and fresher, and I ask people to take pictures of me when we go out, when I holiday with friends, at family events, dates.', 
  'I used to get up so early. Some days I would go outside and watch the sunrise, warming my hands with a mug of herbal tea. The world was quiet, but not still. I admired the people moving about the streets, getting an early start. We had something in common, they and I. We all knew the feeling of the first light of day rising over the mountains and hitting our faces. We carried that feeling with us throughout the day, like a token. But I have not seen them, those people of the sun, for months now.', 
  'When I was a child I believed that in winter, as water froze, the fishes froze with it. I looked at the icy lakes and streams with curiosity, wondering how the fish survived. I mentioned this once to my mother, who smiled and told me that it is only the surface that freezes and not the fish. The ice forms a windowpane against the world, she told me. I could never decide which seemed worse, to be frozen or isolated. Now I feel that I am both, and it has been a long winter. I am unable to move.', 
  'Imagine how hard it is to break up asphalt with a pickaxe. Now imagine it is not even a very good pickaxe. And you have been doing it for days. The sun, hotter now, makes the sweat bead on your face, itchy like a bug landing on you. Sometimes enough water escapes your pores to form a little stream that carves a path down the black dust on your face. And it tortures you that your body is letting such a precious resource just drip onto the ground. This has been my existence for almost a full moon.',
  'Every time I put down my pickaxe, I feel the fear. The fear that I will not finish in time. That I will be so close but that it will be too late. I imagine being able to see the finish line and then getting word that it is too late. And that the finish line has moved or disappeared. And if I’d only kept going and not took that break, if I had swung a little harder, shoveled a little faster, I would have made it. And our lives could have begun. So, I pick up the pickaxe. Lift it and let it fall. I have to sleep soon.',
  'I am close now. The resting may have actually done me good and I am making progress. I plead with the monks to let me work more of the day. I contemplate sneaking out at night but can not risk censure. I can not be sent back when I am this close to finishing my plot. I can taste more than just the dust of the asphalt now. I can taste the paradise, it is so close to being ours. I can taste my wife. I fantasize about her lips and her skin and her belly, almost not seeing the black pavement I am ripping up, just feeling my arms lift and lower as my eyes see only her face.',
  'As the first light of day eased itself through the mist, I no longer noticed the slight chill in the air. Winter was closing its doors as we slowly started to move into spring. But still we sat there, wrapped together in a woolen blanket I had received when my grandfather had passed away. It was magical. Not just the sunrise. Not just the night before, but the events that had led up to this. Well, mostly magical. That was what my mind was allowing me to see at this time. The good times. I glanced over at him, blinked, and then looked back out to sea.',
  'Breathing heavily as he threw punches to the red and shabby punching bag hanging from the ceiling, ignoring the pain and exhaustion dwelling in his body that might overpower him at any given moment. A cold breeze of air brushed against his now clammy skin, making him shudder slightly and disrupting his clean punches. He pulled his arms to his chest wanting to continue, but they just could not handle anymore exertion, as he threw a weak punch towards the bag. Finally admitting that he was done for the day, his body collapsed on the hard and solid floor.',
  'As much as I hated to part with it as it took me back to my childhood I knew it was time. Toby was turning eight tomorrow and his father and I were planning to grant him his birthday wish. He was our fourth generation of Cub fans. My dad was a die-hard Cub fan who took me to my first game when I was six. We had seats directly behind the Cub dugout. I had found a ball before the game and after the game the entire team autographed it for me. I had decided it was time to pass it on to Toby.']
   
  const [str1, setStr1] = useState(strArray[parseInt((strArray.length - 1) * Math.random())]);
  let str2 = "";

  function randomPhrase(){
    setStr1(strArray[Math.floor(Math.random()*strArray.length)]);
  }

  function reset() {  //resets the timer
    setTimer(0);
    setIsActive(false);
  }

  function sendData(){
    if (send === true){
      console.log(send);  
      axios.post(`http://localhost:3001/UserScore/${gleId}/${calcWpm}`, {})
      .then((res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      });
    }
  }

  function calcWpmCalc(){
    if (index === 0){
      setCalcWpm(0);
    } else {
      setCalcWpm(Math.round(wpm * (accuracy/100)));
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

  function wpmCalc(){   //calculates words per minute [(character count/average length) / (time / 60)]
    if (index === 0){
      setWpm(0);
    } else if (index >= str1.length){
      setWpm(wpm);
      sendData();
      setSend(false);
      setCompleted(true);   
    }
    else {
      setWpm(Math.round((index/5)/(timer/60)));
    }
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
    calcWpmCalc();
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
        if (key === str1.charAt(index)){
          setCorrectCounter(correctCounter => correctCounter+1);
          setIsRight(isRight => isRight.concat(true));
        } else {
          setMistakeCounter(mistakeCounter => mistakeCounter+1);
          setIsRight(isRight => isRight.concat(false));
        }
      }
    }
  })

  function resetWord(){    //resets everything every time ~ is pressed
    randomPhrase();
    setKeys([]);
    setMistakeCounter(0);
    setCorrectCounter(0);
    setIndex(0);
    setIsRight([]);
    reset();
    setSend(true);
    setCompleted(false);
  }

  function printString(){   //prints the string and gets right of html elements
    return <h4 className="Text" dangerouslySetInnerHTML={{__html: str, }}/> ;
  }

  const handleSubmit = (e) => {
    setUsername(name);
    setName('');
    e.preventDefault(); 
    displayName();
    //search collection for username, if it passes dont add and alert it exists, if it fails add
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
  }

  function triggerPopup(){
    console.log('exist')
    document.getElementById("modalButton").click();
    
  }

  const responseSuccessGoogle = (response) => {
    setIsLoggedIn(true);
    setGleId(response.Os.$R);
    cookies.set('gleId', response.Os.$R, { path: '/' });
    console.log(response.Os.$R);
    console.log(response);
  }

  //make post request and push token to backend
  const responseFailureGoogle = (response) => {
    console.log(response);
  }

  const googleLogin = () => {
    return(
      <GoogleLogin  className = 'google'
      clientId="565884375585-2jpdbc390b42n87ig0c9vodu7tdgpdbf.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseSuccessGoogle}
      onFailure={responseFailureGoogle}
      cookiePolicy={'single_host_origin'}
    />
    );
  }

  function clickLogout(){
    cookies.set('gleId', '', { path: '/' });
    setIsLoggedIn(false);
    setGleId('');
    setUsername('');
  }

  const googleLogout = () => {
    return(
      <div>
      <button className="Logout" onClick={() => clickLogout()}>Log Out</button>
      </div>
    );
  }

  function checkLogin(){
    setGleId(cookies.get('gleId'));
    displayName();
    if((cookies.get('gleId') + "").length != 0){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {   
    checkLogin();
  });

  //if gleid lookup returns a username, keep the name input invisible. if it returns nothing, create the username field then search again. 
  function nameInput(){
    if (isLoggedIn){
      if(username === undefined){
        return(
          <div>
             {Modal}
          <form onSubmit = {handleSubmit}> 
            <input onChange = {(e) => setName(e.target.value)} value = {name} onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)}></input>
            <button type = 'submit'>Click to submit</button>
          </form>
          </div>
        );
      }
    }  
  }

  const Modal = () => (
    <Popup
      trigger={<button className="invisible" id="modalButton"></button>} position="right center">
        <div>The username {name} already exists, choose another one</div>
    </Popup>
  );

  async function displayName(){
    let res = await axios.get(`http://localhost:3001/findUser/${gleId}`)
    setUsername(res.data.username);
}

  function welcomeMessage(){
    if(username === undefined || !isLoggedIn){
      return(
        <h2>Please Login and Enter a Username to Save Your Score!</h2>
      );
    } else {
      console.log(username)
      return(
        <h2>Welcome to the typing test, {username}!</h2>
      );
    }
  }

  function completeTest(){
    if(completed === true){
      return(
        <h3 className="Completed">Score Saved!</h3>
      );
    } else {
      return (
        <h3></h3>
      );
    }
  }

  return (
    <div className="Typing-Test">
      <section>
        {!isLoggedIn && googleLogin()}
        {isLoggedIn && googleLogout()}
        {welcomeMessage()}
        
      </section>
      {completeTest()}
      <ul className="stats">
        <li>Raw WPM: {wpm}</li>
        <li>Accuracy: {accuracy}%</li>
        <li>Calculated WPM: {calcWpm}</li>
      </ul>
      <header className="Content">
        <Popup
          trigger={<button className="invisible" id="modalButton"></button>} position="right center">
          <div>The username {name} already exists, choose another one</div>
        </Popup>
        {nameInput()}
        {printString()} 
        <h6>*press ~ to restart the test!</h6>
      </header>
    </div>
  );
}

export default App;
