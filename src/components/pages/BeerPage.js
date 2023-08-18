import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import BeerCard from "./BeerCard";
import {Alert, Container, Grid, List, ListItem, ListItemText} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import {loadTastingData} from "../LocalStorage";
const BeerPage = (  ) => {
    const { beerId } = useParams();
    const [beer, setBeer] = useState({});
    const [existingTastings, setExistingTastings] = useState([]);

    const metaTag = document.querySelector('meta[name="description"]');


    const [userStoredData, setUserStoredData] = useState([]);

    useEffect(() => {
        const loadedData = loadTastingData(beerId);
        if (loadedData) {
            setUserStoredData(loadedData.tastingResults)
        }
        fetch(process.env.REACT_APP_API_BASE_URL+'/api/beers/'+beerId )
            .then((response) => response.json())
            .then((data) => setBeer(data));
    }, []);

    useEffect(() => {
        // Fetch existing ratings data from API based on beerId
        // Replace this with your actual API call
        const fetchExistingTastings = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_BASE_URL+`/api/beers/${beerId}/tastings`);
                const data = await response.json();
                setExistingTastings(data);
            } catch (error) {
                console.error('Error fetching existing ratings:', error);
            }
        };
        fetchExistingTastings();
    }, []);

    return (
        <Container maxWidth="sm">


            <div style={{ marginTop: '16px' }}>
                <Grid >

                    {userStoredData.length > 0 ?
                        <div style={{ marginTop: '16px' }}>
                            <Alert severity="success">Thanks for submitting your tasting scores!</Alert>
                            <Grid style={{ marginTop: '16px' }} container justifyContent="center">
                                <Button component={Link} to="tasting" variant="contained" color="primary">
                                    Re-submit your tasting scores
                                </Button>
                            </Grid>
                        </div>

                        :

                        <div style={{ marginTop: '16px' }}>
                            <Grid style={{ marginTop: '16px' }} container justifyContent="center">
                                <Button component={Link} to="tasting" variant="contained" color="primary">
                                    Submit your tasting scores
                                </Button>
                            </Grid>
                        </div>

                    }
                    <div style={{ marginTop: '16px' }}>
                        <BeerCard beer={beer}/>
                    </div>


                    {/*<BeerRadar beer={beer} tastingData={userStoredData?.tastingResults} />*/}

                </Grid>

                <Typography variant="h5">Tasting history</Typography>
                <List>
                    {existingTastings.map((rating) => (
                        <ListItem key={rating._id}>
                            <ListItemText
                                primary={`${rating.userName || 'Anonymous User'} - Date: ${
                                    dayjs(rating.date).format("MM/DD/YYYY HH:mm:ss A")
                                }`}
                                secondary={rating.comment || 'No comment'}
                            />
                        </ListItem>
                    ))}
                </List>

            </div>
        </Container>

);
};

export default BeerPage;
