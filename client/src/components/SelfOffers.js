import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSelfOffers } from './functions';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
createData('Frozen yoghurt', 159, "VEG", 24, 4.0),
createData('Ice cream sandwich', 237, "VEG", 37, 4.3),
createData('Eclair', 262, "VEG", 24, 6.0),
createData('Cupcake', 305, "VEG", 67, 4.3),
createData('Gingerbread', 356, "VEG", 49, 3.9),
];

function SelfOffers() {
  const [searchInput, setSearchInput] = useState("")
  const [offers, setOffers] = useState([])
  const [kinds, setKinds] = useState(['VEG breakfast 20','Non Veg lunch 10','Vegan breakfast 44','VEG meal 22','Non Veg 31','Vegan 11'])
  const [rows, setRows] = useState([])
  const [cols, setCols] = useState([])

  useEffect(() => {
    // setOffers([])
    async function getData() {
      const data = {
        "inputData": {
          "searchInput": "p1"
        }
      }
      const response = await getSelfOffers(data)
      console.log(response.rows)
      setRows(response.rows)
      setCols(response.cols)
    }
    getData()
  },[])


  return (
    <Container>
        <div className='main__main'>
            <h1>Self Offers</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>{cols[0]}</StyledTableCell>
                        <StyledTableCell align="right">{cols[1]}</StyledTableCell>
                        <StyledTableCell align="right">{cols[2]}</StyledTableCell>
                        <StyledTableCell align="right">{cols[3]}</StyledTableCell>
                        <StyledTableCell align="right">{cols[4]}</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row[0]}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row[1]}</StyledTableCell>
                        <StyledTableCell align="right">{row[2]}</StyledTableCell>
                        <StyledTableCell align="right">{row[3]}</StyledTableCell>
                        <StyledTableCell align="right">
                          {row[4]}
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

export default SelfOffers;
