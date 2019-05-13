var express = require('express');
var compression = require('compression');
var path = require('path');

var port = 8081;
var app = express();
var distPath = path.resolve(__dirname, '../dist');

app.use(compression());
app.use(express.static(distPath, {
  maxAge: '1y',
}));
app.listen(port, function() {
  console.log('Server running on port ' + port);
});
