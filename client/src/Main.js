import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App.js";
import LeaderBoard from "./LeaderBoard.js";
import Profile from './Profile.js';
import './Main.css';

function Main() {
  return (
      <Router>
          <div className="header">
              <nav style={{ margin: 10 }}>
                  <Link to='/' style={{ padding: 10 }}>
                      App
                  </Link>
                  <Link to='/LeaderBoard' style={{ padding: 10 }}>
                      LeaderBoard
                  </Link>
                  <Link to='/Profile' style={{ padding: 10 }}>
                      Profile
                  </Link>
              </nav>
              <Route path='/' exact component={App} />
              <Route path='/LeaderBoard' component={LeaderBoard} />
              <Route path='/Profile' component={Profile}/>
          </div>
      </Router>
  )
}

export default Main