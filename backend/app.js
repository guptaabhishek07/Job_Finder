const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

//import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobsTypeRoute = require('./routes/jobsTypeRoutes');
const jobsRoute = require('./routes/jobsRoutes');


//databse connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false
}).then(() => console.log("DB connected"))
    .catch((error) => console.log(error));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

//ROUTES
//app.get('/', (req, res) => {
    //res.send("Hello from Node Js");
//})
app.use('/api', authRoutes);
app.use('/api',userRoutes);
app.use('/api',jobsTypeRoute);
app.use('/api',jobsRoute);

//error middleware
app.use(errorHandler);
    
//port
const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});