# 02 Import Bootstrap

In this demo we will install and configure webpack to import the well known
[Bootstrap](https://getbootstrap.com/) CSS library.

We will start from sample _01 Styles / 01 Custom CSS_.

Summary steps:
 - Install Bootstrap.
 - Import the CSS library.
 - Use a jumbotron element from Bootstrap in our HTML.
 - Check that we get errors when running webpack.
 - Install additional loaders in order to manage fonts and other
 files required by Bootstrap.
 - Check results.

# Steps to build it

## Prerequisites

You will need to have [Node.js](https://nodejs.org/en/) installed in your computer. If you want to follow this step guide you will need to take sample _01 Custom CSS_ as a starting point.

## Steps

- `npm install` to install previous sample packages:

  ```
  npm install
  ```

- Let's start by installing Bootstrap:

  ```
  npm install bootstrap --save
  ```

- Now, let's import the CSS library in order to include it in our project:

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
      ],
  +   vendorStyles: [
  +     './node_modules/bootstrap/dist/css/bootstrap.css',
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

- Let's modify our *index.html* and include some specific Bootstrap component:

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
  +   <div class="jumbotron">
  +     <h1>Testing Bootstrap</h1>
  +     <p>
  +       Bootstrap is the most popular ...
  +     </p>
  +   </div>
      Hello Webpack 2!
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
  We will get errors! Webpack is complaining that it's not able to process fonts that are being used by Bootstrap, thus, we need to set an appropiate font loader:

  ![fail to load icons](../../99%20Readme%20Resources/01%20Styles/02%20Import%20Bootstrap/fail%20to%20load%20icons.png)

- Let's set up the appropriate font / glyphicon loaders. We will install first [file-loader](https://github.com/webpack/file-loader). It will produce a new file into our build directory `/dist` and return the public url.

  ```
  npm install file-loader --save-dev
  ```

- Although we are used to produce all the resources (images, fonts) in separate files, what will happen if we have to fetch a lot of small files? Initial load of the page will be slower requesting such a big bunch of small files. In order to improve loading performance we can use a loader such as [url-loader](https://github.com/webpack/url-loader). With this tool, files will be encoded as data embedded inside the HTML, so, we can combine *file-loader* / *url-loader* by adding a condition: encode only files that are smaller than a given size.

  ```
  npm install url-loader --save-dev
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
  +     // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
  +     // Using here url-loader and file-loader
  +     {
  +       test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
  +       loader: 'url-loader?limit=10000&mimetype=application/font-woff'
  +     },
  +     {
  +       test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
  +       loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
  +     },
  +     {
  +       test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
  +       loader: 'file-loader'
  +     },
  +     {
  +       test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  +       loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
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
  Check that our page is being displayed using Bootstrap styles (see [Bootstrap's jumbotron](https://getbootstrap.com/components/#jumbotron)).

  ![result](../../99%20Readme%20Resources/01%20Styles/02%20Import%20Bootstrap/result.png)
