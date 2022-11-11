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
import { deleteFeedback, foodOptionsApi, getFeedbacksApi, submitFoodForm } from './functions';
import { useNavigate  } from "react-router-dom";

function Feedback() {
    const [feedbacks, setFeedbacks] = React.useState([])
    const navigate = useNavigate()

    const handleDelete = async (fid) => {
        const data = {
            "inputData": {
                FeedbackID: fid
            }
        }
        const response = await deleteFeedback(data)
        console.log("After deleting ")
        console.log(response)
        // if(response.message == "OK") {
        let updatedFeedbacks = []//feedbacks.filter(f => f.FeedbackID !== fid)
        for(let i=0;i<feedbacks.length;i++) {
            if(feedbacks[i].FeedbackID !== fid) {
                updatedFeedbacks.push(feedbacks[i])
            }
        }
        setFeedbacks(updatedFeedbacks)
        alert("Delete successful")
        navigate('/')
        // }
    }

    React.useEffect(() =>  {
        async function getFeedbacks() {
            const data = {
                "inputData": {
                    "UserID": "U87"//localStorage.getItem("UserID") || "U1"    
                }
            }
            const response = await getFeedbacksApi(data)
            console.log(response)
            setFeedbacks(response.rows)
        }
        getFeedbacks()
    }, [])

  return (
    <Container>
        <div className='main__main'>
            <h1>Feedback</h1>
            {feedbacks.map(f => {
                return <div>
                    ID: {f[0]} <br></br>
                    ProviderID: {f[2]} <br></br>
                    Comment: {f[3]} <br></br>
                    Rating: {f[4]} <br></br>
                    Date: {f[5]}<br></br>
                    <button onClick={() => handleDelete(f[0])}>Delete</button>
                </div>
            })}
        </div>
    </Container>
  );
}

export default Feedback;
