const axios = require('axios');

function ApiHandler(apiConfig, apiSource) {
    this.apiConfig = apiConfig;
    this.apiSource = apiSource;
    this.factories = {
        google: () => {
            let url = this.apiConfig.url;

            let i = 0;
            for(let param in this.apiConfig.params) {
                url += (i === 0 ? '' : '&') + param + '=' + this.apiConfig.params[param];
                i++;
            }
            console.log(url)
            return url;

        },
        darksky: () => {
            let url = this.apiConfig.url;
            url += apiConfig.key + '/' + apiConfig.params.lat + ',' + apiConfig.params.lng;
            console.log(url);
            return url;
        }
    };
}

ApiHandler.prototype.setParams = function (params) {
    for(let param in params) {
        this.apiConfig.params[param] = params[param];
    }
};

ApiHandler.prototype.makeRequest = function(callback) {
    let url = this.factories[this.apiSource]();
    const start = new Date();

    axios.get(url)
        .then(response => {
            const end = new Date();
            console.log(this.apiSource + ': ' + (end.getTime() - start.getTime()));
            callback(response);
        })
        .catch(err => {
            console.error(err);
        });
};

module.exports = ApiHandler;