import Container from '@mui/material/Container';
import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { deleteFeedback, foodOptionsApi, getFeedbacksApi, submitFoodForm } from './functions';
import { useNavigate  } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
  }));

function Feedback() {
    const [feedbacks, setFeedbacks] = React.useState([])
    const navigate = useNavigate()

    const handleDelete = async (fid) => {
        const data = {
            "inputData": {
                FeedbackID: fid
            }
        }
        const response = await deleteFeedback(data)
        console.log("After deleting ")
        console.log(response)
        // if(response.message == "OK") {
        let updatedFeedbacks = []//feedbacks.filter(f => f.FeedbackID !== fid)
        for(let i=0;i<feedbacks.length;i++) {
            if(feedbacks[i].FeedbackID !== fid) {
                updatedFeedbacks.push(feedbacks[i])
            }
        }
        setFeedbacks(updatedFeedbacks)
        alert("Delete successful")
        navigate('/')
        // }
    }

    React.useEffect(() =>  {
        async function getFeedbacks() {
            const data = {
                "inputData": {
                    "UserID": localStorage.getItem("userID") || "U87"    
                }
            }
            const response = await getFeedbacksApi(data)
            console.log(response)
            setFeedbacks(response.rows)
        }
        getFeedbacks()
    }, [])

  return (
    <Container>
        <div className='main__main'>
            <h1>Feedback</h1>
            {/* {feedbacks.map(f => {
                return <div>
                    ID: {f[0]} <br></br>
                    ProviderID: {f[2]} <br></br>
                    Comment: {f[3]} <br></br>
                    Rating: {f[4]} <br></br>
                    Date: {f[5]}<br></br>
                    <button onClick={() => handleDelete(f[0])}>Delete</button>
                </div>
            })} */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">{"ID"}</StyledTableCell>
                        <StyledTableCell align="right">{"Provider ID"}</StyledTableCell>
                        <StyledTableCell align="right">{"Comment"}</StyledTableCell>
                        <StyledTableCell align="right">{"Rating"}</StyledTableCell>
                        <StyledTableCell align="right">{"Date"}</StyledTableCell>
                        <StyledTableCell align="right">{"Delete"}</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {feedbacks.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row[0]}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row[2]}</StyledTableCell>
                        <StyledTableCell align="right">{row[3]}</StyledTableCell>
                        <StyledTableCell align="right">{row[4]}</StyledTableCell>
                        <StyledTableCell align="right">
                         {row[5]}  
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <button onClick={() => handleDelete(row[0])}>Delete</button>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </Container>
  );
}

export default Feedback;
