const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

dotenv.config()

app.use(cors())

// to use json
app.use(bodyParser.json())

// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

// API Credentials
let apiKey = {
    meaningCloud_key: process.env.API_Key
};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// Pulling sentence from site and pushing to api
const siteText = [];

app.post('/add', (req, res) => {
    siteText.push(req.body);
})


app.get('/sentiment', function (request, response) {

    const https = require('follow-redirects').https;
    const fs = require('fs');

    let txt = encodeURIComponent(siteText.slice(-1)[0].info);

    let options = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': `/sentiment-2.1?key=${apiKey.meaningCloud_key}&lang=en&txt=${txt}`,
        'headers': {},
        'maxRedirects': 20
    };

    const req = https.request(options, function (res) {
        let chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            let body = Buffer.concat(chunks).toString();
            let JSONres = JSON.parse(body);
            response.send(JSONres);
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.end();
})