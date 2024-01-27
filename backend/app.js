const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');

//databse connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("DB connected"))
    .catch((error) => console.log(error));

    
//port
const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});