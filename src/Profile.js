import React from "react";
import "./Profile.css"
import App from "./App.js";
import Cookies from 'universal-cookie';
import { useState, useEffect } from "react";
import axios from "axios";
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
export default function Profile() {
    const cookies = new Cookies();
    const gleId = cookies.get('gleId');
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [rows, setRows] = useState([]);
    let user; 

    //add most recent 
    function createData(username, wpm, id) {
        return { username, wpm, id };
      }

      useEffect(() => {
        personalScores();
    }, []);

    async function getUser(gleId){
        let res = await axios.get(`http://localhost:3001/findUser/${gleId}`)
        let data = res.data.username; 
        return data;
    }

    async function personalScores(){
        if(showLeaderboard) {setShowLeaderboard(false); return}
        let res = await axios.get(`http://localhost:3001/Profile/${gleId}`)
        let tempRows = [];
        for(let i = 0; i < res.data.length; i++){
            tempRows.push(createData(await getUser(gleId).then((result) => {return result}), res.data[i].wpm, res.data[i]._id));
        }
        setRows(tempRows);
        console.log(rows);
        setShowLeaderboard(true);
    }

    function DisplayBoard() {
        return(
            <Box className="Box" display="flex" flexDirection="row" justifyContent="center" >
               <TableContainer style={{width: 400}} className="Table" component={Paper}>
                    <Table className="Table" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell><b>Username</b></TableCell>
                            <TableCell style={{width:25}} ><b>WPM</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                    {row.username}
                                    </TableCell>
                                    <TableCell style={{width:25}} >{row.wpm}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }

    return (
        <div className="profile">
            <h1 className="Title" >Personal Leaderboard</h1>
            {showLeaderboard && DisplayBoard()}
        </div>
    )
}