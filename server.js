const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname,'/public/')));

//routes 
app.use('/', require('./routes/rootCtr.js')); 
app.use('/contacts', require('./routes/api/contactsCtr'));
app.use('/actions', require('./routes/api/actionsCtr'));
app.use('/patients', require('./routes/api/patientsCtr'));

app.listen(PORT, ()=> console.log(`Server started on http://localhost:${PORT}`));
