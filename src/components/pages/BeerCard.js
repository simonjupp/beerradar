import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import {Link, useParams} from "react-router-dom";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';
import IconButton from "@mui/material/IconButton";
import {SocialIcon} from "react-social-icons";
import {Chip, Container, Divider, Menu, MenuItem} from "@mui/material";
import BeerRadar from "./BeerRadar";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Favorite} from "@mui/icons-material";
import {loadLikedData, saveLikedData} from "../LocalStorage";
import Box from "@mui/material/Box";

const BeerCard = ({ beer , hideradar}) => {

    const [ratingCount, setRatingCount] = useState({});
    const { beerId } = useParams();
    let bid = beer._id ? beer._id : beerId;
    const [liked, setLiked] = useState(!!loadLikedData(bid));

    const [anchorEl, setAnchorEl] = useState(null);

    const shareUrl = window.location.origin +'/beer/'+ bid
    const copyPageUrl = (beerId) => {
        navigator.clipboard.writeText(shareUrl);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike = () => {
        if (!liked) {
            // Make an API call to increment the likes count for the beer
            // You can use the beer._id to identify the beer in the backend
            // Update the state after a successful API call
            fetch(process.env.REACT_APP_API_BASE_URL+'/api/beers/'+bid+'/like', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }} )
                .then((response) => response.json())
                .then((data) => setRatingCount(data));
            beer.likes= beer.likes + 1;
            saveLikedData(bid)
            setLiked(true);
        }

    };

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL+'/api/beers/'+bid+'/tastingCount' )
            .then((response) => response.json())
            .then((data) => setRatingCount(data));
    }, []);


    return (

        <Card variant="outlined">
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar style={{ marginRight: 10 }}>
                            <SportsBarIcon  />
                        </Avatar>
                        <div>
                            <Typography variant="h5" component="div" >
                                <Link  style={{ textDecoration: 'none', color: 'gold', fontWeight: 'bold' }} to={`/beer/${beer._id}`}>{beer.name}</Link>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {beer.brewery}
                            </Typography>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                        <IconButton onClick={handleClick}>
                            <ShareIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem>
                                <FacebookShareButton url={shareUrl} quote="Come and taste this beer!">
                                    <SocialIcon network="facebook"  style={{ height: 25, width: 25, marginRight:"10px"}} />
                                    Share on Facebook
                                </FacebookShareButton>
                            </MenuItem>
                            <MenuItem>
                                <TwitterShareButton url={shareUrl}>
                                    <SocialIcon network="twitter" style={{ height: 25, width: 25, marginRight:"10px"}} />
                                    Share on Twitter
                                </TwitterShareButton>
                            </MenuItem>
                            <MenuItem>
                                <WhatsappShareButton url={shareUrl} title="Come and taste this beer!">
                                    <SocialIcon network="whatsapp" style={{ height: 25, width: 25, marginRight:"10px"}} />
                                    Share on WhatsApp
                                </WhatsappShareButton>
                            </MenuItem>
                            <MenuItem onClick={() => copyPageUrl()}>
                                <ContentCopyIcon style={{ height: 25, width: 25, marginRight:"10px"}} />
                                <Typography >
                                    Copy link
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    <Typography variant="body2">{beer.description}</Typography>
                </div>

                <Box m={1} pt={1}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {beer?.beer_style?.map(beer_style => (
                            <Chip key={beer_style} label={beer_style} />
                        ))}
                    </div>
                </Box>
                <Box  >
                    <div style={{ marginLeft: '10px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        <Typography variant="body2" color="text.secondary">
                            ABV: {beer.abv} %
                        </Typography>
                    </div>
                </Box>


                {
                    hideradar ? (<span></span> ): (<BeerRadar beer={beer}  />)
                }

                <Divider />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Tastings: {ratingCount.count}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <IconButton onClick={handleLike}>
                            {liked
                                ? (<Favorite style={{ color: "red", cursor: "pointer" }}/>)
                               :  (<FavoriteBorderIcon style={{  cursor: "pointer" }}/>)
                            }
                        </IconButton>
                        <Typography variant="subtitle1" color="text.secondary">
                            {beer.likes } Likes
                        </Typography>
                    </div>
                </div>

            </CardContent>

        </Card>
    );
};

export default BeerCard;
