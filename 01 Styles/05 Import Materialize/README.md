# 05 Import Materialize

In this demo we will install and configure webpack to import the Google framework [Materialize](http://materializecss.com/).

We will start from sample _01 Styles / 01 Custom CSS_.

Summary steps:
 - Fix jQuery dependency version.
 - Install Materialize.
 - Import the CSS and JS library.
 - Use a card element from Materialize in our HTML.
 - Check that we get errors when running webpack.
 - Install additional loaders in order to manage fonts and other
 files required by Materialize.
 - Check results.

# Steps to build it

## Prerequisites

You will need to have [Node.js](https://nodejs.org/en/) installed in your computer. If you want to follow this step guide you will need to take sample _01 Custom CSS_ as a starting point.

## Steps
- **IMPORTANT**: First of all, lets modify jQuery dependency version. Materialize does not support jQuery version 3 and above. So, change `package.json` as follows:

  ### ./package.json
  ```diff
  - "jquery": "^3.1.1",
  + "jquery": "^2.1.4",
  ```

- `npm install` to install previous sample packages:

  ```
  npm install
  ```

- Let's start by installing Materialize:

  ```
  npm install materialize-css --save
  ```

- Now, let's import the CSS and JS library in order to include it in our project:

  ### ./webpack.config.js
  ```diff
  ...

  module.exports = {
    entry: {
      app: './students.js',
      appStyles: [
        './mystyles.css',
      ],
      vendor: [
        'jquery',
  +     'materialize-css',
      ],
  +   vendorStyles: [
  +     './node_modules/materialize-css/dist/css/materialize.css',
  +   ],
    },
    ...
  };

  ```

- Since we are going to dig into *node_modules*, on the CSS loader section, let's remove the node_modules ignore:

  ### ./webpack.config.js
  ```diff
  ...

  module.exports = {
    ...
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
  -       exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: {
              loader: 'css-loader',
            },
          }),
        },
      ],
    },
    ...
  };

  ```

- Let's modify our *index.html* and include some specific Materialize component. Also, let's add some special effects that requires the JavaScript part of Materialize:

  ### ./index.html
  ```diff
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Webpack 2.x by sample</title>
    </head>
    <body>
  +   <div class="card-panel orange accent-2 waves-effect waves-light">
  +     <h1>Testing Materialize</h1>
  +     <p class="flow-text">
  +       Materialize is so good looking!
  +     </p>
  +   </div>
  -   Hello Webpack 2!
  +   <p>Hello Webpack 2!</p>
      <div class="red-background ">
        RedBackground stuff
      </div>
    </body>
  </html>

  ```

- Try to run webpack now, just type in the command line:
  ```
  npm start
  ```
  We will get errors! Webpack is complaining that it's not able to process fonts that are being used by Materialize by default, thus, we need to set an appropiate font loader:

  ![fail to load Roboto font](../../99%20Readme%20Resources/01%20Styles/05%20Import%20Materialize/fail%20to%20load%20font.png)

- Let's set up the appropriate font loaders, combining [file-loader](https://github.com/webpack/file-loader) with [url-loader](https://github.com/webpack/url-loader). With both loaders working together, we can improve data loading performance by embedding files into our HTML under a certain condition: encode only files that are smaller than a given size.
  ```
  npm install file-loader url-loader --save-dev
  ```

- Now let's include these loaders in `webpack.config.js`:

  ### ./webpack.config.js
  ```diff
  ...

  module.exports = {
    ...
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: {
              loader: 'css-loader',
            },
          }),
        },
  +     // Loading default Materialize font (Roboto)
  +     // Using here url-loader and file-loader
  +     {
  +       test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
  +       loader: 'url-loader?limit=65000&mimetype=application/font-woff'
  +     },
  +     {
  +       test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
  +       loader: 'url-loader?limit=65000&mimetype=application/octet-stream'
  +     },
  +     {
  +       test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
  +       loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject'
  +     },
      ],
    },
  ...
  };

  ```

- Finally, let's launch the application:
  ```
  npm start
  ```
  Check that our page is being displayed using Materialize Card component (see [Materialize's cards](http://materializecss.com/cards.html)). Click on the new component to make sure that you see a wave effect over it. Cool!

  ![result](../../99%20Readme%20Resources/01%20Styles/05%20Import%20Materialize/result.png)
