
/*
 * Used for self signed certs.
 * Eventually we should determine dev and prod environments
*/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/*
 * Used to pick up api credentials
 * from either environmet variables or a js file
 * for local dev make and save a apigee_credentials.js file at ../../
 * give it the following code
 * process.env.PARAM1 = "the api key, can be found in AWS Software Configuration"
 * process.env.PARAM2 = "the api secret, can be found in AWS Software Configuration"
 * Doing this to keep the credentials out of the git repos
*/
if(!process.env.PARAM1 || !process.env.PARAM2) {
    require('./apigee_credentials.js');
}

var httpPort = process.env.PORT || 3000,
    httpsPort = process.env.SSLPORT || 3443,
    proxyCredentials = { key:process.env.PARAM1, secret:process.env.PARAM2 },
    express = require('express'),
    request = require('request'),
    http = require('http'),
    mxservice = require('./routes/mxservice.js'),
    Q = require('q'),
    app = express();


// configure Express
//
// modules
app.set('Q', Q);
app.set('request', request);

// project
app.set('proxyCredentials', proxyCredentials);
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));


// routes
var router = express.Router();

router.get('/', function(req, res){
    res.sendfile('public/index.html');
});

router.get('/downtest', function(req, res){
    res.send(500);
});

router.get('/api', mxservice.api); 
router.get('/proxy', mxservice.proxy); 
router.get('/cdn', mxservice.cdn);
router.get('/devices1', mxservice.devices1);
router.get('/devices2', mxservice.devices2);
router.get('/*', function(req, res) {
    res.send(404);
});
router.post('/*', function(req, res) {
    res.send(404);
});

app.use('/', router);

http.createServer(app).listen(httpPort);
