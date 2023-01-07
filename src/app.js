const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;

const bodyParser = require('body-parser');

const router = require('./Routes/post');

const db = require('./Helpers/db');

db.connect(process.env.MONGO_URI);

// Middleware - Body Parser parse the request
app.use(bodyParser.json());

app.use('/post', router);

app.listen(5000, () => console.log(`App started - Listen Port: ${port}`));

