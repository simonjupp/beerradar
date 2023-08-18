import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import BeerList from "../BeerList";
import {Container, Grid} from "@mui/material";

const HomePage = () => {
    return (
        <Container maxWidth="sm">
            <Grid container justifyContent="center">
                <h2>Welcome to The Beer Tasting App</h2>
                <p>
                    Submit your tasting notes for the beer you are drinking and see how they compare to other drinkers.
                    Pick an existing beer from the list below or simply add the beer you are drinking now and submit your tasting notes.
                </p>
                <Button component={Link} to="/create-beer" variant="contained" color="primary">
                    Add a new Beer
                </Button>
            </Grid>

            <BeerList  />


        </Container>
    );
};

export default HomePage;
