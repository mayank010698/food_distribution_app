import Container from '@mui/material/Container';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate  } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const handleRedirectAuth = async () => {
        navigate('/auth')
    }

    React.useEffect(() =>  {
        localStorage.removeItem("userID")
        localStorage.removeItem("userKind")
    }, [])

  return (
    <Container>
        <div className='main__main'>
            Logout successful 
            <br></br>
            <Button onClick={handleRedirectAuth} variant="contained" sx={{ mt: 3, mb: 2 }}>
                Go to authentication Page
            </Button>
                
        </div>
    </Container>
  );
}

export default Logout;
