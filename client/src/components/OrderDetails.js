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
import { useEffect, useState } from 'react';
import { getOfferDetail, placeOrder } from './functions';

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

function OrderDetails() {
  const [quantity, setQuantity] = useState(1)
  const [foodKind, setFoodKind] = useState()
  const [provider, setProvider] = useState()

  const handleSubmit = async () => {
    let urlList = window.location.href.split("/")
      let ProviderID = urlList[urlList.length-2]
      let FoodID = urlList[urlList.length-1]
    const data = {
      "inputData": {
        ProviderID: ProviderID,
        FoodID: FoodID,
        quantity: quantity,
        UserID: localStorage.getItem("UserID") || "U1"
      }
    }
    console.log("$$$$")
    console.log(data)
    const response = await placeOrder(data)
    if(response.message == "OK"){
      alert("Order placed successfully")
    }
  }
  
    useEffect(() => {
      // setOffers([])
      let urlList = window.location.href.split("/")
      let ProviderID = urlList[urlList.length-2]
      let FoodID = urlList[urlList.length-1]
      console.log("ProviderID",ProviderID)
      async function getData() {
        const data = {
          "inputData": {
            "ProviderID": ProviderID,
            "FoodID": FoodID
          }
        }

        console.log("Calling offer detil")
        console.log(data)
        const response = await getOfferDetail(data)
        console.log(response)
        setQuantity(response.quantityAvailable)
        setFoodKind(response.FoodKind)
        setProvider(response.Provider)
      }
      getData()
    },[])

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
                    
                      <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                          Name
                      </StyledTableCell>
                      <StyledTableCell>{provider ? provider.ProviderName: "Loading"}</StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                          Food Type
                      </StyledTableCell>
                      <StyledTableCell>{foodKind ? foodKind.Kind: "Loading"}</StyledTableCell>
                      </StyledTableRow>
                    
                    <StyledTableRow key={"quantity"}>
                        <StyledTableCell component="th" scope="row">
                            Quantity
                        </StyledTableCell>
                        <StyledTableCell>
                            <FormControl className='input-medium-width' variant="standard">
                                {/* <InputLabel htmlFor="component-simple">quantity</InputLabel> */}
                                <Input id="component-simple" type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                            </FormControl>
                        </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <br></br>
            <Button onClick={handleSubmit} variant="contained">Place Order</Button>
        </div>
    </Container>
  );
}

export default OrderDetails;
