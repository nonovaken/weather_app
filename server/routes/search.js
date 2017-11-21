const express = require('express');
const ApiHandler = require('../helper/apiHandler');

const router = express.Router();

// google api config
const googleApiKey = 'AIzaSyDCKlBw_gG-Ot_4Bc0IiaQh2eECqR8wVKw';
const googleGeocodeSearch = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json?',
    params: {
        address: '',
        key: googleApiKey
    }
};

// darksky api config
const darkskyApi= {
    url: 'https://api.darksky.net/forecast/',
    key: '79bd7893857e161cdc8b0c4b79761c53',
    params: {}
};

router.get('/', (req, res) => {

    let query = req.query.q.replace(/[^a-zA-Z\d]+/g, '+');
    const googleApiHandler = new ApiHandler(googleGeocodeSearch, 'google');

    googleApiHandler.setParams({address: query});
    googleApiHandler.makeRequest(response => {
        const geoLocation = response.data.results[0].geometry.location;
        const darkskyApiHandler = new ApiHandler(darkskyApi, 'darksky');
        let city = null;
        let state = null;

        response.data.results[0].address_components.forEach((component) => {
            if(component.types[0] === 'locality') {
                city = component.short_name;
            }
            if(component.types[0] === 'administrative_area_level_1') {
                state = component.short_name;
            }
        });

        darkskyApiHandler.setParams({lat: geoLocation.lat, lng: geoLocation.lng});
        darkskyApiHandler.makeRequest(response => {
            console.log(city + ', ' +state);
            res.json({
                data: response.data,
                location: city + ', ' +state
            });
        })
    });
});

module.exports = router;