import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
createData('Provider Name', 'PAR Dining', 6.0, 24, 4.0),
createData('Item Description', 'Lorm ipsum Lorm ipsum Lorm ipsum Lorm ipsum Lorm ipsum Lorm ipsum Lorm ipsum Lorm ipsum Lorm ipsum Lorm ipsum Lorm ipsum Lorm ipsum ', 9.0, 37, 4.3)
];

function OrderDetails() {
    // const offerId = window.location.href()
  return (
    <Container>
        <div className='main__main'>

            <h1>Order Details</h1>
            

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Key</StyledTableCell>
                        <StyledTableCell>Value</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell>{row.calories}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <StyledTableRow key={"quantity"}>
                        <StyledTableCell component="th" scope="row">
                            Quantity
                        </StyledTableCell>
                        <StyledTableCell>
                            <FormControl className='input-medium-width' variant="standard">
                                <InputLabel htmlFor="component-simple">Quantity</InputLabel>
                                <Input id="component-simple" type='number'/>
                            </FormControl>
                        </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <br></br>
            <Button variant="contained">Place Order</Button>
        </div>
    </Container>
  );
}

export default OrderDetails;
