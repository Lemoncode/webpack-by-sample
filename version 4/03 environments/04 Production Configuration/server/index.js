const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');

const port = 8081;
const app = express();
const distPath = path.resolve(__dirname, '../dist');

app.use(
  expressStaticGzip(distPath, {
    maxAge: '1y',
  })
);
app.listen(port, function() {
  console.log('Server running on port ' + port);
});
