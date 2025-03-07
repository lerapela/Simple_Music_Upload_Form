const express = require('express');
const path = require('path');
const fs = require('fs');
const Track = require('../models/Track');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) return res.status(404).send('Track not found');
        
        const filePath = path.join(__dirname, '..', track.filePath);
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(filePath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'audio/mpeg',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'audio/mpeg',
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
