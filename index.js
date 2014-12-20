/*
 * (C) 2014 Seth Lakowske
 */

var JSONReader = require('json-streamer');
var SerialPort = require("serialport").SerialPort
var util = require('util');
var Transform = require('stream').Transform;
var WsStaticServer = require('websocket-express').WsStaticServer;

var jsonReader = new JSONReader();
jsonReader.pipe(process.stdout);

var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 115200
});

serialPort.on('open', function() {

    serialPort.on('data', function(data) {
        jsonReader.write(data);
    })

    setInterval(function() {
        serialPort.write('s100 \n', function(err, result) {
        })
    }, 1000);

});

//setup a web socket server that also serves static content
var server = new WsStaticServer({
    path : '.',
    wsPath : '/webSocket'
});

server.listen(3333, function() {

    server.app.post('/samples', function(req,res) {
        console.log(req.body)
        console.log(req.param('samples'));
    })

    server.wss.on('connection', function(ws) {

        var stream = websocket(ws);
        jsonReader.pipe(stream);

    })

})
