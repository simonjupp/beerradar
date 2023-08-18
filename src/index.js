import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import './index.css';
import HomePage from './components/pages/HomePage';
import BeerPage from './components/pages/BeerPage';
import CreateBeer from './components/CreateBeer';
import reportWebVitals from './reportWebVitals';
import HomeIcon from '@mui/icons-material/Home';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
import TastingPage from "./components/pages/TastingPage";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfUse from "./components/pages/TermsOfUse";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


root.render(
        <React.StrictMode>
            <Router>
                <Box sx={{ flexGrow: 3 }}>
                    <AppBar position="static">
                        <Toolbar style={{ justifyContent: 'center' }}>
                            <IconButton  component={Link} to="/" color="inherit" aria-label="home">
                                <HomeIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                Beer Tasting App
                            </Typography>
                            {/*<Search>*/}
                            {/*    <SearchIconWrapper>*/}
                            {/*        <SearchIcon />*/}
                            {/*    </SearchIconWrapper>*/}
                            {/*    <StyledInputBase*/}
                            {/*        placeholder="Search…"*/}
                            {/*        inputProps={{ 'aria-label': 'search' }}*/}
                            {/*    />*/}
                            {/*</Search>*/}
                        </Toolbar>
                    </AppBar>
                    <Routes>
                        <Route path="/" exact element={<HomePage/>} />
                        <Route path="/create-beer" element={<CreateBeer/>} />
                        <Route path="/beer/:beerId" element={<BeerPage />} />
                        <Route path="/beer/:beerId/tasting" element={<TastingPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-use" element={<TermsOfUse />} />

                        {/*<Route path="/beers" element={<App />} />*/}
                    </Routes>
                </Box>

                <footer style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p>
                        &copy; {new Date().getFullYear()} Beer Tasting App. All rights reserved.
                    </p>
                    <p>
                        <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-use">Terms of Use</Link>
                    </p>
                </footer>
            </Router>
        </React.StrictMode>
);

reportWebVitals();
