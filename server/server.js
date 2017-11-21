const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index')
const input = require('./routes/input');
const search = require('./routes/search');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

// for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    next();
});

app.use('/', index);
app.use('/input', input);
app.use('/search', search);

app.get('/', (req, res) => {
    res.send("<p>hello world!</p>");
});

app.listen(port, (err) => {
    if(err) {
        console.error(err);
    }
    console.log('Server is running on port ' + port);
});
