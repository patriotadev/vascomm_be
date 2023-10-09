const express = require('express');
const bodyParser = require('body-parser');
const AppRouter = require('./routes/index');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors());

app.use(AppRouter);

app.listen(process.env.PORT, () => {
    console.log('\x1b[36m', `Server is running at ${process.env.HOST}:${process.env.PORT}`);
}).on("error", (error) => console.log('\x1b[31m', error));