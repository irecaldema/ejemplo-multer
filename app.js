/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
 * View engine
*/
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

/**
 * Controladores
 */
var indexCtrl = require('./controllers/Index');
var mediaCtrl = require('./controllers/Media');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', indexCtrl.index);
app.get('/lista_pdfs', indexCtrl.lista_pdfs);
app.get('/muestra_pdfs', indexCtrl.muestra_pdfs);
app.post('/guardarImagen', mediaCtrl.guardarImagen);
app.post('/guardarPdf', mediaCtrl.guardarPdf);
app.post('/guardarZip', mediaCtrl.guardarZip);

app.use("*", function(req, res) {
  res.send("ko");
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function() {
  console.log("Listening on " + server_ip_address + ", server_port " + server_port);
});