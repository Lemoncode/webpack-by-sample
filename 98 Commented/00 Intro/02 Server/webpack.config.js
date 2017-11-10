/*
WEBPACK is a module bundler for modern JavaScript applications. 
When webpack processes your application, it recursively builds a dependency graph,
that includes every module your application needs, then packages all of those modules into one or more bundles.

There are a lot of statements that have been standardized in ES2015. 
Although they are not supported in most browsers yet, webpack does support them out of the box.

Webpack integrated well with transpilers like babel or typescript, they allow us that older browsers can also run it.
*/

module.exports = {
  //An entry point indicates which module webpack should use to begin building out its internal dependency graph
  // So, webpack will start reading on this entry to build our app, web, etc.
  // In this sample app "students.js" is the starting point, usually you will find a more generics root file name like index.js, app.js....
entry: ['./students.js'],
  //The output property tells webpack where to emit the bundles it creates and how to name these files
  // in this case, we are saing to wepack that built our app in the file: "bundle.js", and this will be
  // the file served to clients how enter in our resources (our app, our web, etc. depending on our development)
  // IMPORTANT: we can chop into several bundles, not only a single file.
output: {
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
        test: /\.js$/,
          //with exclude we can say to webpack where don't proceess files to build our app/web.
          // In this case we are asking webpack to process js files under the node_modules folder
        exclude: /node_modules/,
          //charge babel's loader for "transpilar" from ES6 to ES5
        loader: 'babel-loader',
      },
    ],
  },
  // If we have installed with npm i webpack-dev-server -D, we'll have a local lite server (based on Node.js and Express) that we can use as dev web server.
  // If we open a browser we can point the url to http://localhost:8080 and we will browse our web app
  // this dev server allows live reloading, so any changes introduced in any of the JavaScript files will be automatically detected 
  // and webpack dev server will launch the build process and once finished automatically refresh the page being display in the browser.
  devServer: {
    //Local port where we'll serve our app
    port: 8080,
  },
};
