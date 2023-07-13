// imports
const express = require('express')
const cookieParser = require('cookie-parser')
const {v4: uuidv4 } = require('uuid')

const app = express();
app.use(cookieParser());
const port = 3000;

// listen on port
app.listen(port, () => console.info(`Listening on port ${port}`));

// loads your css folder
//app.use('/client', express.static(__dirname + '/client'));
app.use('/css', express.static(__dirname + '/client/css'));

app.use('/PreLaunch_Demo.html', express.static(__dirname + '/client/PreLaunch_Demo.html'));

//app.use('/Launch_Demo.html', express.static(__dirname + '/client/Launch_Demo.html'));

app.get('/', (req, res) => {
    /***
     * Your logic goes here
     * 
     * 
     * 
     * **/

    res.sendFile(__dirname + '/client/FPID_Demo.html');
});

app.get('/Launch_Demo.html', (req, res) => {
    var fpidCookieValue = req.cookies['FPID'];
    if(!!fpidCookieValue)
    {
        console.log(" *** FPID Cookie exists *** ", fpidCookieValue);
        console.log('Before Cookies: ', req.cookies);
        res.cookie('FPID', fpidCookieValue, {maxAge: 63072000000});
        console.log('After Cookies: ', req.cookies);
    }
    else
    {
        console.log('Cookies: ', req.cookies, " +++ FPID Cookie doesn't exists");
        let uuid = uuidv4();
        res.cookie('FPID', uuid, {maxAge: 63072000000});
        console.log('++++++ FPID Cookie Created...');
    }
    res.sendFile(__dirname + '/client/Launch_Demo.html');
});