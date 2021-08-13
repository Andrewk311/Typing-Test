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
              <nav className="nav">
                  <Link to='/' activeClassName="navbar__link--active" className="navbar__link">
                      App
                  </Link>
                  <Link to='/LeaderBoard' activeClassName="navbar__link--active" className="navbar__link">
                      Leaderboard
                  </Link>
                  <Link to='/Profile' activeClassName="navbar__link--active" className="navbar__link">
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