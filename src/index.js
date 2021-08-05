const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');



const app = express();
mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
//settings
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/api/tasks', require('./routes/tasks'))
//static files
//console.log(__dirname+'/public');
app.use(express.static(__dirname + '/public'))
//server is listening
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
})