// prpl = require('prpl-server');
// express = require('express');

import prpl from 'prpl-server';
import express from 'express';
 
const app = express();
 
app.get('/*', prpl.makeHandler('.'));
   
app.listen(8000);
 
