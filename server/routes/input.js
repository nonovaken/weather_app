const express = require('express');
const ApiHandler = require('../helper/apiHandler');

const router = express.Router();
const googleApiKey = 'AIzaSyDCKlBw_gG-Ot_4Bc0IiaQh2eECqR8wVKw';
const googleAutoComplete = {
        url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?',
        params: {
            input: '',
            type: '(cities)',
            key: googleApiKey
        },
};

router.get('/', (req, res) => {
    const apiHandler = new ApiHandler(googleAutoComplete, 'google');
    apiHandler.setParams({input: req.query.q});
    apiHandler.makeRequest(response => {
        res.json(response.data.predictions);
    });
});

module.exports = router;