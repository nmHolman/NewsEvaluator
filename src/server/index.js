const dotenv = require('dotenv');
dotenv.config();

// API Credentials
let apiKey = {
    meaningCloud_key: process.env.API_Key
};


var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Pulling sentence from site and pushing to api
const siteText = [];

console.log(`::: Current Text: ${siteText} :::`);

app.post('/add', (req, res) => {
    siteText.push(req.body);
})



app.get('/sentiment', function (request, response) {
    var https = require('follow-redirects').https;
    var fs = require('fs');

    let txt = encodeURIComponent(siteText.slice(-1)[0].info);
    console.log(txt);

    var options = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': `/sentiment-2.1?key=${apiKey.meaningCloud_key}&lang=en&txt=${txt}`,
        'headers': {},
        'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks).toString();
            var JSONres = JSON.parse(body);
            response.send(JSONres);
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.end();
})