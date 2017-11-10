/*
WEBPACK is a module bundler for modern JavaScript applications. 
When webpack processes your application, it recursively builds a dependency graph,
that includes every module your application needs, then packages all of those modules into one or more bundles.

There are a lot of statements that have been standardized in ES2015. 
Although they are not supported in most browsers yet, webpack does support them out of the box.

Webpack integrated well with transpilers like babel or typescript, they allow us that older browsers can also run it.

We'll build our directory structure, separating the "source" code (/src) from our "distribution" code (/dist). 
The "source" code is the code that we'll write and edit. 
The "distribution" code is the minimized and optimized output of our build process that will eventually be loaded in the browser
*/

// We will require the "path" package to get some helpers to manipulate paths. 
var path = require('path');

// We need to require a webpack plugin for use it.
var HtmlWebpackPlugin = require('html-webpack-plugin');

//We will also create a member variable that will hold the basePath (current path where webpack.config is being placed):
var basePath = __dirname;

module.exports = {
  //An entry point indicates which module webpack should use to begin building out its internal dependency graph
  // So, webpack will start reading on this entry to build our app, web, etc.
  // In this sample app "students.js" is the starting point, usually you will find a more generics root file name like index.js, app.js....
  entry: ['./students.js'],
  //The output property tells webpack where to emit the bundles it creates and how to name these files
  // in this case, we are saing to wepack that built our app in the file: "bundle.js", located in directory /dir, 
  // and this will be the file served to clients how enter in our resources (our app, our web, etc. depending on our development)
  // IMPORTANT: we can chop into several bundles, not only a single file.
  output: {
    // We'll use path's method "join" to indicate webpack the url where will be the bundle
    path: path.join(basePath, 'dist'),
    filename: 'bundle.js',
  },
    // this section is for configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)
      // module.rules => allows you to specify several loaders within your webpack configuration. 
      // This is a concise way to display loaders, and helps to maintain clean code
      //Loaders enable webpack to process more than just JavaScript files (webpack itself only understands JavaScript).
      //webpack loaders transform all types of files into modules that can be included in your application's dependency graph.
    rules: [
      // The next rule add support for es6, we will ask webpack to handle all js files under the project folder 
    // (excluding the node_modules subfolder) and transpile them from es6 to es5 (using the babel-loader).
      {
        //test: Identify which file or files should be transformed by a certain loader
        // We can use regular expressions, so here we are saying to webpack that process any files with extension starting in ".js_" with babe's loader
        test: /\.js$/,  //with exclude we can say to webpack where don't proceess files to build our app/web.
        exclude: /node_modules/,
          //charge babel's loader for "transpilar" from ES6 to ES5
        loader: 'babel-loader',
      },
    ],
  },
  // This option controls if and how source maps are generated. (This affect to build and rebuild process)
  // This option allow us a way to let the browser link our original files and let us debug directly on es6 mode
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',  // A SourceMap is added as a DataUrl to the bundle (NOT for production's envioroment)
  // If we have installed with npm i webpack-dev-server -D, we'll have a local lite server (based on Node.js and Express) that we can use as dev web server.
  // If we open a browser we can point the url to http://localhost:8080 and we will browse our web app
  // this dev server allows live reloading, so any changes introduced in any of the JavaScript files will be automatically detected 
  // and webpack dev server will launch the build process and once finished automatically refresh the page being display in the browser.
  devServer: {
    //Local port where we'll serve our app
    port: 8080,
  },
  // Plugins can be leveraged to perform a wider range of tasks.
  // to use a plugin, you need to require() it and add it to the plugins array and you need to create an instance of it by calling it with the new operator
  plugins: [
     // We did the plugin's required at the begining, now, we instance it
     // This plugin (html-webpack-plugin) will take as template input our index.html, and we will point an output destination (index.html under dist folder). 
     // The plugin will copy index.html into destination and inject the script tag including a hash tag to avoid browser caching when new versions are being deployed
    // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
  ],
};
