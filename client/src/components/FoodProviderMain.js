import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function FoodProviderMain(props) {
    const navigate = useNavigate()
  return (
    <Container>
        <div className='main__main'>
            <h1>Food Provider Dashboard</h1>
            <div className='horizontal-center' style={{cursor:"pointer"}} onClick={() => navigate('/food-wastage')}>
                <div className="big-btn">
                    {/* <Button>Check Food Wastage</Button> */}
                    Check Food Wastage
                </div>
            </div>
            <br></br>
            <div className='horizontal-center' style={{cursor:"pointer"}} onClick={() => navigate('/self-offers/2')}>
                <div className="big-btn">
                    {/* <Button>Check Food Wastage</Button> */}
                    Show available food items
                </div>
            </div>
            <br></br>
            <div className='horizontal-center' style={{cursor:"pointer"}} onClick={() => navigate('/food-form')}>
                <div className="big-btn">
                    {/* <Button>Check Food Wastage</Button> */}
                    Add Food Items
                </div>
            </div>
            <br></br>

        </div>
    </Container>
  );
}

export default FoodProviderMain;
