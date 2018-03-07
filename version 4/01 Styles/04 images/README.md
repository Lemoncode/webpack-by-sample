# 04 Handling Images

In this demo we are going to include images in our project in two flavours: via JavaScript and via HTML.
On the JavaScript side we will see it's something straightforward (using the same plugins we used for fonts), for the HTML we will use a new loader: [html-loader](https://github.com/webpack-contrib/html-loader).

We will start from sample _01 Styles/03 SASS_.

Summary steps:
 - Add two images to our project.
 - Add first image from JavaScript.
 - Add second image from HTML.
 - Install `html-loader`.
 - Configure the loader.

# Steps to build it

## Prerequisites

You will need to have nodejs installed in your computer (at least v 8.9.2). If you want to follow the steps of this guide you must take as starting point the sample _03 SASS_.

## Steps

- Run `npm install` to install previous sample packages:

```
npm install
```
- Let's start by cleaning up our *`index.html`*. We are going to remove the Bootstrap's *jumbotron* component and add a `<div>` element with a given `id`:

_./src/index.html_
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
-   <div class="jumbotron">
-     <h1>Testing Bootstrap</h1>
-     <p>
-       Bootstrap is the most popular ...
-     </p>
-   </div>
+   <div id="imgContainer"></div>
    Hello Webpack 3!
    <div class="red-background">
      RedBackground stuff
    </div>
  </body>
</html>
```

- We will continue by creating a folder named **content** inside the **src** folder, and adding two images there: [logo_1](./src/content/logo_1.png) and [logo_2](./src/content/logo_2.png).

- Let's jump into *`students.js`* and import *`logo_1.png`* using JavaScript. 
Then, let's place it under a `<div>` with a given `id`:

_./src/students.js_

```diff
import {getAvg} from "./averageService";
+ import logoImg from './content/logo_1.png';

$('body').css('background-color', 'lightSkyBlue');

const scores = [90, 75, 60, 99, 94, 30];
const averageScore = getAvg(scores);

const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);

+ const img = document.createElement('img');
+ img.src = logoImg;

+ document.getElementById('imgContainer').appendChild(img);
```

- Let's install _url-loader_ this will let us include in the bundle or split into a separate file a given file
depending on it's size and _file-loader_ this loader will let us manage with raw folder.

```bash
npm install url-loader file-loader -d
```

- Now that We have already installed *url-loader* plugin, we only need to configure the extension png/jpeg in the *`webpack.config.js`* loaders section. One thing to note down is that we are adding an additional parameter to the url-loader called **limit**. By using this parameter we are telling the loader to encode the image if its size is less than 5KB approx and embed it directly in the HTML file.

```diff
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
          use: [
            { loader: 'css-loader', },
            { loader: 'sass-loader', },
          ],
        }),
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
+     {
+       test: /\.(png|jpg)$/,
+       exclude: /node_modules/,
+       loader: 'url-loader?limit=5000',
+     },      
    ],
  },
```

- Next, we will add some styles for the images in our CSS file:

_./src/mystyles.scss_

```diff
$blue-color: teal;

.red-background {
 background-color: $blue-color;
}

+ img {
+   display: block;
+   width: 200px;
+ }
```

- And run `npm start`. We should be able to view the image in the browser.

```bash
npm start
```
- That's fine but what if we had already the image referenced inside a HTML <img> tag? Let's add logo_2.png into the index.html file:

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
    <div id="imgContainer"></div>
    Hello Webpack 4!
+   <img src="./src/content/logo_2.png"/>
    <div class="red-background">
      RedBackground stuff
    </div>
  </body>
</html>
```

- Now if run the app (`npm start`) we can check that both logo images are being shown.

```bash
npm start
```

- Finally, if we open the developer tools in our browser we can see that a `<img>` has been inserted under the `<div>` element, and also that its `src` attribute has changed:

- But we are referencing `logo 2` from `./src..` path. Whats if we upload to production? We loose the reference so we need to process this kind of files using `html-loader`:

```bash
npm install html-loader --save-dev
```

- And configre the loader for the _.html_ files

_wepback.config.js_

```diff
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=5000',
      },
+     {
+      test: /\.html$/,
+      loader: 'html-loader',
+     },      
    ],    
  },
```

- And remember that the wepback `context` is over `./src` so:

_./src/index.html_

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
    <div id="imgContainer"></div>
    Hello Webpack 3!
-   <img src="./src/content/logo_2.png" />
+   <img src="./content/logo_2.png" />
    <div class="red-background">
      RedBackground stuff
    </div>
  </body>
</html>
```

- We can see now that image is auto referenced (F12 developer tools...).





