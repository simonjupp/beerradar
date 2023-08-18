import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useNavigate, useParams} from "react-router-dom";
import {saveTastingData} from "../LocalStorage";

const TastingSection = () => {
    const { beerId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [tastingResults, setTastingResults] = useState([]);
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('Anonymous User'); // Default value

    const navigate = useNavigate();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL+'/api/questions')
            .then((response) => response.json())
            .then((data) => {
                // Initialize tastingResults with default values for each question
                setTastingResults(data.map((question) => ({ question: question._id, rating: 0 })));
                setQuestions(data);
            });    }, []);

    const handleSliderChange = (question, value) => {
        // Implement your logic to handle slider value changes
        // console.log(`Question ${question} - Rating: ${value}`);
        const updatedTastingResults = tastingResults.map((result) =>
        result.question === question
                ? { ...result, rating: value }
                : result

    );
        setTastingResults(updatedTastingResults);
    };

    const handleSubmit = async () => {

        const totalRating = tastingResults.reduce((total, result) => total + result.rating, 0);

        if (totalRating === 0) {
            alert('Please rate at least one flavor');
            return;
        }
        // Create a tasting object with beerId, date, tastingResults, and comment
        const tastingObject = {
            beerId,
            date: new Date().toISOString(),
            userName,
            tastingResults,
            comment,
        };

        // Send the tasting object to the API endpoint
        const response = await fetch(process.env.REACT_APP_API_BASE_URL+'/api/beers/'+beerId+'/tastings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tastingObject),
        }, []);

        if (response.ok) {
            // Implement your success logic here

            const tastingResponse = await response.json();
            console.log('Tasting submitted successfully');

            saveTastingData(beerId, tastingResponse.tastingResults);
            navigate(`/beer/${beerId}`, { state : { tastingData: tastingResponse} })

        } else {
            // Implement your error handling logic here
            console.error('Error submitting tasting');
        }


    };

    return (
        <div>
            <h2>Submit your tasting notes</h2>
            {questions?.map((question) => (
                <div key={question._id} style={{ marginBottom: '30px' }}>
                    <Typography gutterBottom>{question.flavor}</Typography>
                    {/*<Typography variant="body2">{question.question}</Typography>*/}
                    <Typography variant="caption">{question.description}</Typography>
                    <Box sx={{ marginTop: '20px' }}  display="flex" alignItems="center" justifyContent="center">
                        <Typography sx={{ marginRight: '10px' }} variant="body2">None</Typography>
                        <Slider
                            defaultValue={0}
                            step={1}
                            marks
                            min={0}
                            max={5}
                            valueLabelDisplay="auto"
                            onChange={(event, value) =>
                                handleSliderChange(question._id, value)
                            }
                            sx={{ width: '60%', marginLeft: '10px' }} // Adjust width and margin
                        />
                        <Typography sx={{ marginLeft: '10px' }} variant="body2">Strong</Typography>
                    </Box>
                </div>
            ))}
            <TextField
                label="Your Name (optional)"
                variant="outlined"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <TextField
                label="Additional Comments"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit Tasting
            </Button>
        </div>
    );
};

export default TastingSection;
