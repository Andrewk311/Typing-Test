import React from "react";
import './LeaderBoard.css'
import { useState, useEffect } from "react";
import axios from "axios";
// import { response } from "express";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useTable } from 'react-table';
import Box from '@material-ui/core/Box';

//add 3 tables that each call a different get request of the data and sort it.
export default function LeaderBoard() {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [rows, setRows] = useState([]);
    // const useStyles = makeStyles({
    //     table: {
    //       minWidth: 650,
    //     },
    //   });


    // const useStyles = makeStyles({
    //     table: {
    //       minWidth: 650,
    //     },
    //   });


    useEffect(() => {
        allTime();
    }, []);

    function createData(username, wpm, id) {
        return { username, wpm, id };
      }

    async function findUser(gleId){
        let res = await axios.get(`http://localhost:3001/findUser/${gleId}`)
        let data = res.data.username;
        return data; 
    }
    
    async function allTime(){
        if(showLeaderboard) {setShowLeaderboard(false); return}
        let res = await axios.get(`http://localhost:3001/Leaderboard/`)
        let tempRows = [];
        for(let i = 0; i < res.data.length; i++){
            tempRows.push(createData( await findUser(res.data[i].gleId).then((result) => {return result}), res.data[i].wpm, res.data[i]._id));
        }
        setRows(tempRows);
        setShowLeaderboard(true);
    }

    // const classes = useStyles();

    function DisplayBoard() {
        return(
            <Box className="Box" >
               <TableContainer style={{width: 600, position:"fixed", left:640, top: 200}} className="Table" component={Paper}>
                    <Table  className="Table" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell><b>Username</b></TableCell>
                            <TableCell><b>WPM</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                    {row.username}
                                    </TableCell>
                                    <TableCell >{row.wpm}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }

    return (
        <div className="leaderboard">
            {/* <button onClick={allTime}>Personal Leaderboard</button> */}
            <h1 style={{position:"fixed", left:815, bottom:730}}>All Time Scores</h1>
            {showLeaderboard && DisplayBoard()}
        </div>
    )
}