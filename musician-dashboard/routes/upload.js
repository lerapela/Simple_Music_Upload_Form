const express = require('express');
const multer = require('multer');
const path = require('path');
const Track = require('../models/Track');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'file' }, { name: 'cover' }]), async (req, res) => {
    const { title, genre, releaseDate } = req.body;
    const filePath = req.files['file'][0].path;
    const coverPath = req.files['cover'] ? req.files['cover'][0].path : '';

    const newTrack = new Track({ title, genre, releaseDate, filePath, coverPath });
    await newTrack.save();

    res.send('File uploaded successfully');
});

module.exports = router;
