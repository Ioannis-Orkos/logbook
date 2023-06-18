require('dotenv').config()
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const log_entries = require('./routes/log_entries');



mongoose.connect('mongodb://127.0.0.1/logbook')
        .then(()=> console.log("DB connected"))
        .catch(()=> console.log("Couldn't connect to DB"));


const app = express();
      app.use(helmet());
      app.use(express.json());

      app.use('/api/log_entries', log_entries);



if(app.get('env')==='development'){
   app.use(morgan('tiny'));
   console.log("Morgan enabled...");
}


console.log( "The env is set to :" + process.env.Node_Env + " " +app.get('env') +  " -> Reading from config: " +config.get('name'));
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));


  
