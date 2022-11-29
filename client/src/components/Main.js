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
import { foodOptionsApi, getOffersAll, searchApi, searchByKindApi } from './functions';

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

function Main() {
  const [searchInput, setSearchInput] = useState("")
  const [offers, setOffers] = useState([])
  const [kinds, setKinds] = useState([])
  const [rows, setRows] = useState([])
  const [cols, setCols] = useState([])

  useEffect(() => {
    // setOffers([])
    async function getFoodTypes() {
      const response = await foodOptionsApi()
      console.log(response)
      setKinds(response)
    }
    getFoodTypes()

    async function getOffersAllFn() {
      const response = await getOffersAll()
      console.log(response)
      setRows(response.rows)
      setCols(response.cols)
      console.log(response.cols)
    }
    getOffersAllFn()
  },[])

  const handleTagClick = async(k) => {
    // k -> kind
    console.log(k)
    let data = {
      "inputData": {
        kindID: k[0]
      }
    }
    const response = await searchByKindApi(data)
    setRows(response.data.response.data.rows)
    setCols(response.data.response.data.cols)
  }

  const handleSearch = async () => {
    // axios request here
    // Input is "searchInput" variable
    let data = {
      "inputData": {
        description: searchInput
      }
    }
    const response = await searchApi(data)
    setRows(response.data.response.data.rows)
    setCols(response.data.response.data.cols)
  }

  return (
    <Container>
        <div className='main__main'>
            <TextField onChange={(e) => setSearchInput(e.target.value)} style={{width: "450px"}} id="outlined-basic" label="Enter food item" variant="outlined" value={searchInput} />
            <div className='horizontal-center'>
                <div className='main__main__tags'>
                  {kinds.map(k => {
                    return <span onClick={() => handleTagClick(k)}>{k[1]} {k[2]}</span>
                  })}
                </div>
            </div>
            <Button onClick={() => handleSearch()} variant="contained">Search</Button>
            
            <br></br>
            <hr></hr>
                  {/* {JSON.stringify(cols)} */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    {cols && cols.length == 5 && <TableRow>
                        <StyledTableCell>{cols[0]}</StyledTableCell>
                        <StyledTableCell align="right">{cols[1]}</StyledTableCell>
                        <StyledTableCell align="right">{cols[2]}</StyledTableCell>
                        <StyledTableCell align="right">{cols[3]}</StyledTableCell>
                        <StyledTableCell align="right">{cols[4]}</StyledTableCell>
                        <StyledTableCell align="right">Link</StyledTableCell>
                    </TableRow>}
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
                        <StyledTableCell align="right">{row[4]}</StyledTableCell>
                        <StyledTableCell align="right">
                          <Link to={`/offer/${row[0]}`+ "/" + `${row[1]}`}>Link</Link>  
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
