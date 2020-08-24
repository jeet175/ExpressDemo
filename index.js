const debug = require('debug')('app:startup');
const courses = require('./routes/courses');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const logger = require('./middleware/logger');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`ENV: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(express.static('publicFiles'));

app.use(logger);

//app.use(helmet());
if (process.env.NODE_ENV === 'development')
{
    app.use(morgan('tiny'));
    debug('Mrgan Enabled...');
    debug('Step 1 of process');
    debug('Steo 2 of process');
    debug('.................');
    debug('.................');
    debug('.................');
    debug('.................');
    debug('.................');
    debug('.................');
    debug('.................');
    debug('End of process');
}

app.use('/api/courses', courses);

// configuration
console.log(`Application name: ${config.get('name')}`);
console.log(`Application server: ${config.get('mail.host')}`);
console.log(`Application pwd: ${config.get('mail.password')}`);

// GET Endpoint
app.get('/', (req, res) => {
    res.send('Hello New World!!!');
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));



