const express = require('express');
const app = express();
const { router } = require('./config/routes');
const port = process.env.port || 8080;

app.use(express.json());
app.use('/', router);

app.listen(port, ()=>{
    console.log('Listening port no : '+ port);
});