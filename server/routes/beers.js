const express = require('express');
const router = express.Router();
const Beer = require('../models/beer');
const Rating = require('../models/tasting');
const Questions = require("../models/questions");
const Tasting = require("../models/tasting");
const { db } = require('../db'); // Adjust the path to match your directory structure

// Create a new beer
router.post('/beers', async (req, res) => {
    try {
        const { name, brewery, description, beer_style, abv, likes } = req.body;
        const newBeer = new Beer({ name, brewery, description, beer_style, abv, likes });
        await newBeer.save();
        res.status(201).json(newBeer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all beers
router.get('/beers', async (req, res) => {
    try {
        const beers = await Beer.find();
        res.json(beers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get beer by id
router.get('/beers/:id', async (req, res) => {
    try {
        const beerId = req.params.id;
        const beer = await Beer.findById(beerId);
        if (!beer) return res.status(404).json({ message: 'Beer not found' });
        res.json(beer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/beers/:id/like', async (req, res) => {
    try {
        const beerId = req.params.id;
        const beer = await Beer.findById(beerId);
        if (!beer) return res.status(404).json({ message: 'Beer not found' });
        console.log("likes " + beer.likes)
        if (beer.likes=== undefined) {
            beer.likes = 0;
        } else {
            beer.likes += 1;
        }

        await beer.save();
        return res.status(202).json({ message: 'Likes updated successfully', likes: beer.likes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all the questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Questions.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/beers/:id/tastingCount', async (req, res) => {
    try {
        const beerId = req.params.id;
        const tastingsCollection = db.collection('tastings'); // Assuming 'tastings' is your collection name

        const count = await tastingsCollection.countDocuments({ beerId });

        res.json({ count });
    } catch (error) {
        console.error('Error getting tasting count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a tasting to a beer
router.post('/beers/:id/tastings', async (req, res) => {
    try {
        const _beerId = req.params.id;
        const beer = await Beer.findById(_beerId);
        if (!beer) return res.status(404).json({ message: 'Beer not found' });

        const { beerId, date, userName, comment, tastingResults } = req.body;
        const newTasting = new Tasting({ beerId, date, userName, comment, tastingResults  });
        await newTasting.save();
        res.status(201).json(newTasting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get ratings for a beer

router.get('/beers/:id/tastings', async (req, res) => {
    try {
        const beerId = req.params.id;
        const beer = await Beer.findById(beerId);
        if (!beer) return res.status(404).json({ message: 'Beer not found' });

        const rating = await Tasting.find({ beerId: { $eq: beerId }});
        res.json(rating);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;

router.get('/beers/:id/tastings/:rid', async (req, res) => {
    try {
        const beerId = req.params.id;
        const ratingId = req.params.rid;
        const beer = await Beer.findById(beerId);
        if (!beer) return res.status(404).json({ message: 'Beer not found' });

        const rating = await Rating.findById(ratingId);

        if (!rating) return res.status(404).json({ message: 'Rating not found' });
        res.json(rating);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get average ratings for a beer
router.get('/beers/:beerId/averageRatings', async (req, res) => {
    try {
        const beerId = req.params.beerId;

        // Aggregation pipeline
        const aggregationPipeline = [
            // Match documents with the specified beer ID
            { $match: { beerId } },
            // Unwind the tasting results array
            { $unwind: '$tastingResults' },
            // Group by question ID and calculate the average rating
            {
                $group: {
                    _id: '$tastingResults.question',
                    averageRating: { $avg: '$tastingResults.rating' },
                },
            },
            // Optionally, you can add a lookup to get question details
            {
                $lookup: {
                    from: 'questions', // Replace with your questions collection name
                    localField: '_id',
                    foreignField: '_id',
                    as: 'questionDetails',
                },
            },
            // Round the averageRating to the nearest integer
            // {
            //     $addFields: {
            //         averageRating: { $round: ['$averageRating'] },
            //     },
            // },
            // Project the final result
            {
                $project: {
                    _id: 0,
                    questionId: '$_id',
                    averageRating: 1,
                    questionDetails: { $arrayElemAt: ['$questionDetails', 0] }

                },
            },
            // Sort the results by questionDetails.order
            {
                $sort: { 'questionDetails.order': 1 }
            }
        ];

        // Execute the aggregation pipeline
        const result = await db.collection('tastings').aggregate(aggregationPipeline).toArray();

        res.json(result);
    } catch (error) {
        console.error('Error getting average ratings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

