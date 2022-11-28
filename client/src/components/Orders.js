// import "./styles.css";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getOrdersApi } from "./functions";

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

function Orders() {

    const[rows, setRows] = useState([])

    useEffect(() => {
        async function getOrders() {
            const data = {
                "inputData": {
                    "userID": localStorage.getItem("userID")
                }
            }
            const response = await getOrdersApi(data)
            console.log(response)
            setRows(response.rows)
        }
        getOrders()
    },[])

  return (
    <Container>
        <div className='main__main'>
            <h1>Orders</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">{"Order ID"}</StyledTableCell>
                        <StyledTableCell align="right">{"Provider ID"}</StyledTableCell>
                        <StyledTableCell align="right">{"Food ID"}</StyledTableCell>
                        <StyledTableCell align="right">{"Quantity"}</StyledTableCell>
                        <StyledTableCell align="right">{"Date"}</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
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
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </Container>
  );
}

export default Orders;
