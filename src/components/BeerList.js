import React, { useState, useEffect } from 'react';
import BeerCard from "./pages/BeerCard";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const BeerList = () => {
    const [beers, setBeers] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL+'/api/beers')
            .then((response) => response.json())
            .then((data) => setBeers(data));
    }, []);

    return (

        <div>
            <h2>Beer List</h2>

            <Grid container spacing={2}>
                {beers.map((beer) => (
                    <Grid item xs={12} sm={6}  key={beer._id}>
                        <BeerCard beer={beer}/>
                    </Grid>
                ))}

            </Grid>
        </div>
    );
};

export default BeerList;
