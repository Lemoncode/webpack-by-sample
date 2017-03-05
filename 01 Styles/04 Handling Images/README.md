# 04 Handling Images

In this demo we are going to include images in our project in two flavours: via
javascript and via HTML. On the javascript side we will see is something
straightforward (using the same plugins we used for fonts), for the HTML we will use a new loader html-loader

We will start from sample _01 Styles/03 SASS_.

Summary steps:
 - Add two images to our project.
 - Add the code to load the first image via javascript.
 - Configure the loader.
 - Add the second image to the HTML file.
 - Install html-loader.
 - Configure the html loader in the webpack.config.js

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _03 SASS_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- Let's start by making some cleanup in our *index.html*, we are going to remove
the Bootstrap's *jumbotron* component and add a `<div>` with a given "id".

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
-   <div class="jumbotron">
-     <h1>Testing Bootstrap</h1>
-     <p>
-       Bootstrap is the most popular ...
-     </p>
-   </div>
+   <div id="imgContainer"></div>
    Hello Webpack 2!
    <div class="red-background ">
      RedBackground stuff
    </div>
  </body>
</html>

```

- We will continue by creating a folder named **content** and adding two images there: [logo_1](./content/logo_1.png) and [logo_2](./content/logo_2.png).

- Let's jump into *students.js* and import *logo_1.png* using JavaScript.
Let's place it under a given `<div>`:

### ./students.js
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

- Add some styles to image:

### ./mystyles.scss
```diff
$blue-color: teal;

.red-background {
 background-color: $blue-color;
}

+ img {
+   width: 200px;
+ }

```

- We have already installed *url-loader* plugin, so we only need to configure the
extension png/jpeg in the *webpack.config.js* loaders section. One thing to note down is that
we are adding an additional parameter to the url-loader called **limit**. By using this
parameter we are telling the loader to encode the image if its size is less than
5KB approx and embed it directly in the HTML file.

### ./webpack.config.js
```diff
...

module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
+     {
+       test: /\.(png|jpg)$/,
+       exclude: /node_modules/,
+       loader: 'url-loader?limit=5000',
+     },
    ],
  },
  ...
};

```

- Now if run the app (`npm start`) we can check that the first logo is being shown.

![result logo 1](../../99 Readme Resources/01 Styles/04 Handling Images/result logo 1.png)


- That's fine but what if we had already the image referenced inside a HTML
`<img>` tag? Let's add *logo_2.png* into the *index.html* file:

```html
<body>
  Hello webpack !

  <img src="./content/logo_2.png"/>
```

- Since *logo_2.png* is not directly imported from a JavaScript file it will not be
processed. For this case we can use a plugin called [html-loader](https://github.com/webpack/html-loader).
This loader will search in the HTML for `<img>` tags and process them.
Let's install *html-loader*:

```
npm install html-loader --save-dev
```

- Let's update *webpack.config.js* to use this loader:

```javascript
module: {
  loaders: [
    {			  
      test: /\.html$/,
      loader: 'html-loader'
    },
```

- Now if we run the app (npm start) we can see the second logo appearing:

![Demo01_04_app2.png](../../99 Readme Resources/02 Webpack/Demo01_04_app2.png "Demo01_04_app2.png")

- Finally if we open the developer tools in our browser we can see that the
*src* attribute of the `<img>` has changed:

![Demo01_04_app3.png](../../99 Readme Resources/02 Webpack/Demo01_04_app3.png "Demo01_04_app3.png")
