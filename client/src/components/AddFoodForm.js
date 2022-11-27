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
import { foodOptionsApi, submitFoodForm } from './functions';
import { useNavigate  } from "react-router-dom";

function AddFoodForm() {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [kinds, setKinds] = React.useState([])
    const [quantity, setQuantity] = React.useState(1)
    const navigate = useNavigate();

    const handleChange2 = (event) => {
        setAge(event.target.value);
    };

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async () => {
        console.log(age, name, quantity)
        // age -> food type id
        // name -> item description
        // qunatity
        let providerid = "P1"//window.location.href.split("/")[window.location.href.split("/").length-1]
        if(localStorage.getItem("userID")) {
            providerid = localStorage.getItem("userID")
        }
        
        console.log("providerid",providerid)

        const data = {
            "inputData": {
                providerID: providerid,
                foodID: age,
                item_description: name,
                quantity: quantity
            }
        }
        const response = await submitFoodForm(data)
        navigate('/self-offers/'+providerid)
        console.log(response)
    }

    React.useEffect(() =>  {
        async function getFoodTypes() {
            const response = await foodOptionsApi()
            console.log(response)
            setKinds(response)
        }
        getFoodTypes()
    }, [])

  return (
    <Container>
        <div className='main__main'>
            <h1>Add Food Form</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                >
                <div className='horizontal-width'>
                    <FormControl className='input-medium-width' variant="standard">
                        <InputLabel htmlFor="component-simple">Item Description</InputLabel>
                        <Input id="component-simple" value={name} onChange={handleChange} />
                    </FormControl>
                </div>
                <div className='horizontal-width'>
                    <FormControl className='input-medium-width' variant="standard">
                        <InputLabel htmlFor="component-simple">Quantity</InputLabel>
                        <Input id="component-simple" type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    </FormControl>
                </div>

                <div className='horizontal-width'>
                <FormControl className='input-medium-width'  sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Food type</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    label="Food type"
                    onChange={handleChange2}
                    >
                    
                    {kinds.map(k => {
                        return <MenuItem value={k[0]}>{k[1]}</MenuItem>
                    })}
                    </Select>
                    <FormHelperText>With label + helper text</FormHelperText>
                </FormControl>
                </div>
                    
                </Box>
                <Button onClick={handleSubmit} variant="contained" sx={{ mt: 3, mb: 2 }}>Submit</Button>
                
        </div>
    </Container>
  );
}

export default AddFoodForm;
