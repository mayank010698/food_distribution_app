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

function Main() {
  const [searchInput, setSearchInput] = useState("")
  const [offers, setOffers] = useState([])
  const [kinds, setKinds] = useState(['VEG breakfast 20','Non Veg lunch 10','Vegan breakfast 44','VEG meal 22','Non Veg 31','Vegan 11'])

  useEffect(() => {
    // setOffers([])
  },[])

  const handleTagClick = (k) => {
    // k -> kind
  }

  const handleSearch = () => {
    // axios request here
    // Input is "searchInput" variable
  }

  return (
    <Container>
        <div className='main__main'>
            <TextField onChange={(e) => setSearchInput(e.target.value)} style={{width: "450px"}} id="outlined-basic" label="Enter food item" variant="outlined" value={searchInput} />
            <div className='horizontal-center'>
                <div className='main__main__tags'>
                  {kinds.map(k => {
                    return <span onClick={() => handleTagClick(k)}>{k}</span>
                  })}
                </div>
            </div>
            <Button onClick={() => handleSearch()} variant="contained">Search</Button>
            
            <br></br>
            <hr></hr>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Item Description</StyledTableCell>
                        <StyledTableCell align="right">Quantity available</StyledTableCell>
                        <StyledTableCell align="right">Food Type</StyledTableCell>
                        <StyledTableCell align="right">ODate</StyledTableCell>
                        <StyledTableCell align="right">Link</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="right">
                          <Link to={`/offer/1`}>Link</Link>  
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

export default Main;
