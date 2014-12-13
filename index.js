var express = require('express');

var JSONReader = require('json-streamer');
var SerialPort = require("serialport").SerialPort
var util = require('util');
var Transform = require('stream').Transform;

var app = express();

var jsonReader = new JSONReader();
jsonReader.pipe(process.stdout);

var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 115200
});


serialPort.on('open', function() {

    app.post('/samples', function(req,res) {
        console.log(req.body)
        console.log(req.param('samples'));
    })

    serialPort.on('data', function(data) {
        jsonReader.write(data);
    })

    setInterval(function() {
        serialPort.write('s100 \n', function(err, result) {
        })
    }, 1000);


});
