import React from "react";
import './LeaderBoard.css'
import { useState, useEffect } from "react";
import axios from "axios";
// import { response } from "express";
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import { useTable } from 'react-table';

//add 3 tables that each call a different get request of the data and sort it.
export default function LeaderBoard() {

    let rows = [];

    function findUser(gleId){
        let user; 
        axios.get(`http://localhost:3001/findUser/${gleId}`, {} )
        .then((res) => {
            user = res; 
            console.log(res.data);
        }, (error) => {
            console.log(error);
        });
        return user; 
    }
    
    function allTime(){
        axios.get(`http://localhost:3001/Leaderboard/`, {} )
        .then((res) => {
            console.log(res);
            // for(let i = 0; i < res.data.length; i++){
            //     rows.push(createData(response.data[i].gleId, response.data[i].wpm));
            // }
            }, (error) => {
            console.log(error);
          });
    }

    // const useStyles = makeStyles({
    //     table: {
    //       minWidth: 650,
    //     },
    //   });

      function createData(Username, WPM) {
        return { Username, WPM };
      }

    return (
        <div className="leaderboard">
            <button onClick={allTime}>Personal Leaderboard</button>
            <h1>LeaderBoard Component</h1>
        </div>
    )
}