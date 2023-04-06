// Add this to the VERY top of the first file loaded in your app
var apm = require('elastic-apm-node').start({

  // Override the service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: 'nodeJS-service',

  // Use if APM Server requires a secret token
  secretToken: 'tf7fFCo2t4EU18Gmej',

  // Set the custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'https://984d89e88bfa4aacbdc68c356413c3fc.apm.eu-west-3.aws.elastic-cloud.com:443',

  // Set the service environment
  environment: 'dev'
})

var express = require('express');
var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

var domain = process.env.DOMAIN || '';
var port = process.env.PORT || 80;

app.get('/', function(req, res){
  res.render('index', {
    domain: domain
  });
});

app.get("/elk.js", (req, res) => {
  res.sendFile(__dirname + "/public/elastic-apm-rum.umd.min.js");
});

app.listen(port, function() {
  console.log("Listening on " + port);
});
