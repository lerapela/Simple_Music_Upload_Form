const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/musicianDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error(err);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadRoute = require('./routes/upload');
const streamRoute = require('./routes/stream');
const tracksRoute = require('./routes/tracks');

app.use('/upload', uploadRoute);
app.use('/stream', streamRoute);
app.use('/tracks', tracksRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
