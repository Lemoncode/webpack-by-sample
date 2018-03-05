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

You will need to have [Node.js](https://nodejs.org/en/) installed in your computer (at least v 8.9.2). If you want to follow this step guide you will need to take sample _01 Custom CSS_ as a starting point.

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

```diff
module.exports = {
  entry: {
    app: './students.js',
    appStyles: [
      './mystyles.css',
    ],
    vendor: [
      'jquery',
    ],
+     vendorStyles: [
+       './node_modules/bootstrap/dist/css/bootstrap.css',
+     ],
  },
```

- Since we are going to dig into *node_modules*, on the CSS loader section, let's remove the node_modules ignore:

```diff
      {
        test: /\.css$/,
-        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
        }),
      },
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
      <title>Webpack 3.x by sample</title>
    </head>
    <body>
+    <div class="jumbotron">
+      <h1>Testing Bootstrap</h1>
+      <p>
+        Bootstrap is the most popular ...
+      </p>
+    </div>
      Hello Webpack 3!
      <div class="red-background">
        RedBackground stuff
      </div>
    </body>
  </html>
```

- Let's try to run wepback and see what happens

```bash
npm start
```

