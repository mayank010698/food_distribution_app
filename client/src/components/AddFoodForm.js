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


function AddFoodForm() {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');

    const handleChange2 = (event) => {
        setAge(event.target.value);
    };

    const handleChange = (event) => {
        setName(event.target.value);
    };
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
                        <Input id="component-simple" type='number'/>
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
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Veg</MenuItem>
                    <MenuItem value={20}>Non Veg</MenuItem>
                    <MenuItem value={30}>Some food type</MenuItem>
                    </Select>
                    <FormHelperText>With label + helper text</FormHelperText>
                </FormControl>
                </div>
                    
                </Box>
                <Button variant="contained" sx={{ mt: 3, mb: 2 }}>Submit</Button>
                
        </div>
    </Container>
  );
}

export default AddFoodForm;
