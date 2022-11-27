import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginApi, registerApi } from './functions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate  } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Auth() {

  const [isLogin, setIsLogin] = React.useState(true)
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [zip, setZip] = React.useState('')
  const [social, setSocial] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [userKind, setUserKind] = React.useState("user")
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      "inputData": {
        name: name,
        password: password,
        kind: userKind
      }
    }
    console.log(data);
    if(isLogin) {
      const response = await loginApi(data)
      console.log(response)
      navigate("/");
    }
    else{
      data = {
        "inputData": {
          "name": name,
          "password":password,
          "kind": userKind,
          "email": email,
          "PhoneNumber": phone,
          "socialHandle": social,
          "address": address,
          "zipcode": zip
        }
      }
      const response = await registerApi(data)
      console.log(response)
      navigate("/");
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {isLogin ? "Log In" : "Sign Up"}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
            />
            {!isLogin && <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="name"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
            {!isLogin && <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />}
            {!isLogin && <TextField
              margin="normal"
              required
              fullWidth
              id="social"
              label="social"
              name="social"
              onChange={(e) => setSocial(e.target.value)}
              value={social}
            />}
            {!isLogin && <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />}
            {!isLogin && <TextField
              margin="normal"
              required
              fullWidth
              id="zip"
              label="zip"
              name="zip"
              onChange={(e) => setZip(e.target.value)}
              value={zip}
            />}

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={userKind}
              name="radio-buttons-group"
              style={{display: "flex", justifyContent:"center", flexDirection:"row"}}
              // className="horizontal-center"
            >
              
                <FormControlLabel onClick={() => setUserKind('user')} value="user" control={<Radio />} label="User" />
                <FormControlLabel onClick={() => setUserKind('provider')} value="provider" control={<Radio />} label="Food Provider" />
              
            </RadioGroup>
          </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => handleSubmit(e)}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogin ? "Sign In" : "Log In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <div onClick={() => setIsLogin(isLogin ? false : true)}>
                  <Link variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}