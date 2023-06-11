require('dotenv').config()
const config = require('config');

const Joi = require('joi');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));



const log_entries = require('./routes/log_entries');
const app = express();
const port = process.env.PORT || 4000;



console.log(config.get('name'));
console.log(process.env.Node_Env);
console.log(app.get('env'));





//====Express built in package
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//this allows us to explore public folder with out writing path
//app.use(express.static('public'));



//====Express middleware package
app.use(helmet());
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    console.log("Morgan enabled...");

}



//====Express custom middleware
app.use(function(req, res, next) {
    console.log("Logging...");
    next();
});



//====Express routing
app.get('', (req, res) => {
    res.send("Hello world this is logbook project!");
});

//app.use('/api/', log_entries);




app.listen(port, () => console.log(`Listening on port ${port}...`));


  
