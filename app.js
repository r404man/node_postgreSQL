const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const path = require('path');
const router = require('./routes/router');
const bodyParser = require('body-parser');



const PORT = 3000 || process.env.PORT;
const app = express();
app.use(morgan('dev'));

// Request parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Static files
app.use(express.static(__dirname + '/public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.listen(PORT, console.log(`Server has running on port ${PORT}`));



app.use('/', router);
app.use('/cats/:id', router);
app.use('cat/create', router);
app.use((req, res) => {
    res.status(404).render('errors/404', {title: '404'});
});
