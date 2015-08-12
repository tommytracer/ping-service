

var serviceObj = {

    proxyServer : 'https://xxxxxxxxxxxxxx',
    cdnServer : 'https://xxxxxxxxxxxxxx',
    pingPath : '/xxxxxxx',
    prod1path: 'https://xxxxxxxxxxxxxx',
    prod2path: 'https://xxxxxxxxxxxxxx',
    devicesPath: 'xxxx/xxxx',
    timeout: 5000,

    pingApi: function(req, res) {

        var url = this.prod1path + this.pingPath,
            verb = 'GET',
            headers = { 'content-type' : 'application/json' };

        return serviceObj.serviceRequest(req, res, url, verb, headers);
    },

    pingProxy: function(req, res) {

        var url = this.proxyServer + this.pingPath,
            verb = 'GET';

        return serviceObj.getToken(req, res)
        .then(function(data, error) {

            var parsedResponse = JSON.parse(data),
            headers = { 'Authorization' : 'Bearer ' + parsedResponse.access_token, 'content-type' : 'application/json' };

            return serviceObj.serviceRequest(req, res, url, verb, headers);
        });
    },

    pingCdn: function(req, res) {

        var url = this.cdnServer + this.pingPath,
            verb = 'GET';

        return serviceObj.getToken(req, res)
        .then(function(data, error) {

            var parsedResponse = JSON.parse(data),
            headers = { 'Authorization' : 'Bearer ' + parsedResponse.access_token, 'content-type' : 'application/json' };

            return serviceObj.serviceRequest(req, res, url, verb, headers);
        });
    },

    getToken: function(req, res) {
        var deferred = req.app.get('Q').defer(),
            apiCredentials = req.app.get('proxyCredentials'),
            url = this.proxyServer + this.accessTokenPath,
            verb = 'POST',
            headers = { 'Authorization' : ("Basic " + new Buffer(apiCredentials.key + ":" + apiCredentials.secret).toString("base64")),
                        'content-type' : 'application/x-www-form-urlencoded'},
            body = 'grant_type=client_credentials';


        serviceObj.serviceRequest(req, res, url, verb, headers, body)
        .then(function(data, error) {
            if(data) deferred.resolve(data);
            if(error) deferred.reject(error);
        }, function() {
            deferred.reject(503);
        });

        return deferred.promise;
    },

    /*
     * This provides all GET and POST api calls
     * @url     complete url of request
     * @auth    object with access_token key and token value
     * @data    POST data if there is any, should default to null
     */

    serviceRequest: function(req, res, url, verb, headers, body) {

        var deferred = req.app.get('Q').defer(),
            request = req.app.get('request'),
            verb = verb || "GET",
            headers = headers || null,
            body = body || null,
            requestOptions = {
                'method'    : verb,
                'uri'       : url,
                'timeout'   : serviceObj.timeout
            };


        if(headers) {
            requestOptions.headers = headers;
        }

        if(body) {
            requestOptions.body = body;
        }

        request(requestOptions, requestCallback);


        function  requestCallback(error, response, body) {


            if(error) {
                deferred.reject(503);
                return;
            }

            if(response) {
                if(response.statusCode && response.statusCode === 200) {

                    deferred.resolve(response.statusCode);
                    
                } else {

                    deferred.reject(503);

                }
            }
        }

        return deferred.promise;
    },
};

//########################## exports ##############################

exports.api = function(req, res) {

    serviceObj.pingApi(req, res)
    .then(function(success, fail) {

        if(success) {
            res.send(success);
        } else {
            res.send(503);
        }

    }, function(){
        res.send(503);
    });
};

exports.proxy = function(req, res) {

    serviceObj.pingProxy(req, res)
    .then(function(success, fail) {

        if(success) {
            res.send(success);
        } else {
            res.send(503);
        }

    }, function(){
        res.send(503);
    });
};

/*
 * Waterfall routine
 * Call api
 * If api call fails, return 200 since we know the problem is with the api 
 * If api call succeeds, call proxy
 * If proxy call fails, return 200 since we know the problem is with the proxy
 * If proxy call succeeds, call cdn
 * respond with status
*/

exports.cdn = function(req, res) {

    serviceObj.pingApi(req, res)
    .then(function(success, fail) {

        if(success) {
            pingProxy();
        } else {
            res.send(200);
        }

    }, function(){
        res.send(200);
    });

    function pingProxy() {
        serviceObj.pingProxy(req, res)
        .then(function(success, fail) {

            if(success) {
                pingCdn();
            } else {
                res.send(200);
            }

        }, function(){
            res.send(200);
        });
    }

    function pingCdn() {
        serviceObj.pingCdn(req, res)
        .then(function(success, fail) {

            if(success) {
                res.send(200);
            } else {
                res.send(fail);
            }

        }, function(){
            res.send(503);
        });
    }
};

exports.devices1 = function(req, res) {

    var url = serviceObj.prod1path + serviceObj.devicesPath,
        verb = 'GET',
        headers = { 'content-type' : 'application/json' };

    serviceObj.serviceRequest(req, res, url, verb, headers)
    .then(function(data, error) {
        if(data) res.send(200);
        if(error) res.send(error);
    }, function() {
        res.send(503);
    });
};

exports.devices2 = function(req, res) {

    var url = serviceObj.prod2path + serviceObj.devicesPath,
        verb = 'GET',
        headers = { 'content-type' : 'application/json' };

    serviceObj.serviceRequest(req, res, url, verb, headers)
    .then(function(data, error) {
        if(data) res.send(200);
        if(error) res.send(error);
    }, function() {
        res.send(503);
    });
};