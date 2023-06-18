const {LogEntryModel, LogEntryJoiValidate} = require('../model/log_entry');
const express = require('express');
const router = express.Router();



  
  router.get('/', async (req, res) => {
    const log = await LogEntryModel.find().sort('date');
    console.log(log[0]._id.toString())
    res.send(log);
  });
  


  router.get('/:id', async (req, res) => {
    const logs = await LogEntryModel.findByIdAndRemove(req.params.id);

    if (!logs) return res.status(404).send('The log with the given ID was not found.');
    res.send(logs);
  });


    
  router.post('/',  async (req, res) => {
   
    const { error } = LogEntryJoiValidate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let log = new LogEntryModel({ 
        id: req.body.id,
        remark: req.body.remark,
        stamp: req.body.stamp,
        action: req.body.action
     });

    log = await log.save();
    res.send(log);
  
  });


  
  router.put('/:id',  async (req, res) => {

      const { error } = LogEntryJoiValidate(req.body); 
      if (error) return res.status(400).send(error.details[0].message);
  
      
      const entry = { 
        id: req.body.id,
        remark: req.body.remark,
        stamp: req.body.stamp,
        action: req.body.action
      };

      const log = await LogEntryModel.findByIdAndUpdate(req.params.id, entry , {
        new: true
      });
    
      if (!log) return res.status(404).send('The log with the given ID was not found.');
  
      res.send(log);


  });


  
  router.delete('/:id',  async (req, res) => {

    const log = await LogEntryModel.findByIdAndRemove(req.params.id);

    if (!log) return res.status(404).send('The log with the given ID was not found.');
    res.send(log)
  });

  
  
  module.exports = router;