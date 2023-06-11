require('dotenv').config()
const Joi = require('joi');
const bodyParser = require('body-parser');
const express = require('express');


const app = express();
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 4000;


const log_entries = [
  { _id: 1, id: 'AP0001', remark: 'wheel change', stamp: 'MX0069' },  
  { _id: 2, id: 'AP0002', remark: 'brake change', stamp: 'MX0069' },  
];



function validate_log_req(log_entries_req_body) {    
    const schema =  Joi.object({
        id:  Joi.string(),
        remark:  Joi.string(),
        stamp: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required()
    });

    return schema.validate(log_entries_req_body);
}




app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.get('/api/log_entries', (req, res) => {
    res.send(log_entries);
});
  
app.post('/api/log_entries', (req, res) => {

    const { error } = validate_log_req(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
 
    const log_entry = {
        _id: log_entries.length + 1,
        id: req.body.id,
        remark: req.body.remark,
        stamp: req.body.stamp,
    };
   
    log_entries.push(log_entry);
    res.send(log_entry);

});

app.put('/api/log_entries/:id', (req, res) => {

    const log_entry = log_entries.find(
        l => l._id === parseInt(req.params.id) ||
             l.id === req.params.id 
    );

    if (!log_entry) return res.status(404).send('The log_entry with the given ID was not found.');

    const { error } = validate_log_req(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    log_entry.id = req.body.id,
    log_entry.remark = req.body.remark,
    log_entry.stamp = req.body.stamp,

    res.send(log_entries);
});

app.delete('/api/log_entries/:id', (req, res) => {

    const log_entry = log_entries.find(
        l => l._id === parseInt(req.params.id) ||
             l.id === req.params.id 
    );
    
    if (!log_entry) return res.status(404).send('The log_entry with the given ID was not found.');

    const index = log_entries.indexOf(log_entry);
    log_entries.splice(index, 1);

    res.send(log_entries);
});



  


app.listen(port, () => console.log(`Listening on port ${port}...`));