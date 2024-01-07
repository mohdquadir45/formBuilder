const express = require('express');
const router = express.Router();

const FormInput = require('../models/formInput.model')

router.get('/',async (req, res) => {
  
  try{
    const formInputs=await FormInput.find()
  return res.status(200).send({data:formInputs});
}catch(err){
    return res.status(500).send({message: 'Internal Server Error'});
}

})

router.get('/:formInputId' ,async (req, res) => {
    const formInputId = req.params.formInputId;
   
    try {
      const formInput = await FormInput.findOne({id:formInputId});
  
      if (!formInput) {
        return res.status(404).json({ message: 'FormInput not found' });
      }
  
      res.status(200).json({data:formInput});
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
// POST create formInput
router.post('/', async (req, res) => {
   
    try {
     
      const formInput = await FormInput.create(req.body);
      res.status(201).json({data:formInput});
    } catch (error) {
      res.status(500).json({ err:error,message: 'Internal Server Error' });
    }
  });
  
  // PUT update formInput by ID
  router.patch('/:formInputId', async (req, res) => {
    const formInputId = req.params.formInputId;
  
    try {
      const formInput = await FormInput.findOneAndUpdate({id:formInputId});  
      res.status(200).json(formInput);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // DELETE formInput by ID
  router.delete('/:formInputId', async (req, res) => {
    const formInputId = req.params.formInputId;
  
    try {
      const formInput = await FormInput.findOneAndDelete({id:formInputId});
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


  module.exports = router;
