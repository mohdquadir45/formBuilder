const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./db.js')
var cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
const formRoutes = require('./controllers/formInput.controller.js')

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());

app.use('/api/form-input', formRoutes);
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
  });
  app.listen(PORT,  function () {
        try {
            connectDb()
          console.log(`listening on port ${PORT}`);
        } catch (err) {
          console.error(err.message);
        }
      });
      

   
