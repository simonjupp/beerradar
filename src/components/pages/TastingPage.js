import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import BeerCard from "./BeerCard";
import TastingSection from "./TastingSection";
import {Container, Grid} from "@mui/material";

const TastingPage = () => {
    const { beerId } = useParams();

    const [beer, setBeer] = useState({});

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL+'/api/beers/'+beerId )
            .then((response) => response.json())
            .then((data) => setBeer(data));
    }, []);

    return (
        <Container maxWidth="sm">
            <div style={{ marginTop: '16px' }}>
                <Grid>
                    <BeerCard beer={beer} hideradar={true}/>
                </Grid>

            </div>
            <TastingSection />
        </Container>

);
};

export default TastingPage;
