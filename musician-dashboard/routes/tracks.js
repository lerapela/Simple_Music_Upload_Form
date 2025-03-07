const express = require('express');
const Track = require('../models/Track');
const router = express.Router();

router.get('/', async (req, res) => {
    const tracks = await Track.find();
    res.json(tracks);
});

module.exports = router;
