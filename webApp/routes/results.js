const express = require('express')
const {route, process_params} = require("express/lib/router");
const router = express.Router()
const axios = require("axios");

const http = require("https");

console.log('results.js LOG')
const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: {term: 'kiss the rain', locale: 'en-US', offset: '0', limit: '5'},
    headers: {
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
        'x-rapidapi-key': '7ae14268e5msh241a0d6655ae5fdp1aaa57jsnefdf711c7928'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
    res.render('dashboard', {data:response.data})
}).catch(function (error) {
    console.error(error);
});

// req.end();

module.exports = router