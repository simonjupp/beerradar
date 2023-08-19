import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {Autocomplete, Chip, Container, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import Box from "@mui/material/Box";

const CreateBeer = ({ onBeerCreated }) => {
    const [name, setName] = useState('');
    const [brewery, setBrewery] = useState('');
    const [beer_style, setStyle] = useState([]);
    const [abv, setAbv] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const beerStyles = [
        'West Coast IPA', 'New England IPA', 'Session IPA', 'Pale Ale',
        'American IPA', 'Double IPA', ' Triple IPA', 'Imperial IPA',
        'Stout', 'Porter', 'Belgian Dubbel',
        'Wheat Beer', 'Sour Ale', 'Lager',
        'Pilsner', 'Amber Ale', 'Red Ale',
        'Brown Ale', 'Barleywine', 'Saison',
        'Witbier', 'Weizenbock', 'Scottish Ale',
        // Add more styles as needed
    ];

    const handleStyleChange = (event, newValue) => {
        const uniqueStyles = Array.from(new Set(newValue));
        setStyle(newValue);
    };

    const handleCreate = async (e) => {
        e.preventDefault()

        const newBeer = { name, brewery, beer_style, abv, description };
        const response = await fetch(process.env.REACT_APP_API_BASE_URL+'/api/beers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBeer),
        });

        if (response.ok) {
            const createdBeer = await response.json();

            setName('');
            setBrewery('');
            setStyle([]);
            setAbv('');
            setDescription('');
            navigate(`/beer/${createdBeer._id}`);


        }
    };

    return (
        <div>
            <Container maxWidth="sm">
                <h2>Add a new beer</h2>
                {/*<Grid container>*/}

                <form onSubmit={handleCreate}>
                    <Stack spacing={2}>

                        <TextField
                            label="Beer name"
                            value={name}
                            required={true}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Brewery"
                            value={brewery}
                            required={true}
                            onChange={(e) => setBrewery(e.target.value)}
                        />
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={beerStyles}
                            value={beer_style}
                            onChange={handleStyleChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Beer Style"
                                    placeholder="Select Beer Styles"
                                />
                            )}
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            label="ABV %"
                            value={abv}
                            onChange={(e) => setAbv(e.target.value)}
                            type="number" // Restrict input to numbers

                            inputProps={{ step: '0.1', min: '0' }} // Allow decimal input
                        />
                        <Button variant="contained" type="submit">
                            Create beer
                        </Button>
                    </Stack>
                    {/*</Grid>*/}

                </form>

            </Container>


        </div>
    );
};

export default CreateBeer;
