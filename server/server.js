const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import and use the beer routes
const beerRoutes = require('./routes/beers');
app.use('/api', beerRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

