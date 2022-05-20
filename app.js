var express = require('express');
var path = require('path');
var expressStaticGzip = require("express-static-gzip");
var app = express();
var compression = require('compression');

app.use(compression());

app.get("/", (req, res) => {
    const animal = 'elephant';
    // It will repeatedly send the word 'elephant' in a 
    // 'text/html' format file
    res.send(animal.repeat(1000));
});



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})