'use strict';

// ======= Server Start ==========

const express = require('express');
const cors = require('cors');
const { static } = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ======== Middleware =========

app.use(cors());

// ======== Routes ==========

app.get('/location', function(req,res){
    res.send('./index.html');
})

// ========== Callback FUnctions =============

app.use(express.static('./public'));
app.listen(PORT, () => console.log('server is working on'));