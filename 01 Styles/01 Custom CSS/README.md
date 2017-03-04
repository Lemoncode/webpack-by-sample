# 01 Custom CSS

Let's get started working with styles.

In this demo will create a custom CSS file (it will contain a simple css class
that will setup a background color to red).

We will start from sample _00 Intro/04 JQuery_.

Summary steps:
 - Create a custom css file.
 - Install style loader and css loader packages.
 - Configure webpackconfig.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _04 JQuery_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- Now let's create a simple CSS file that will add a red background when
used on some e.g. div. (we will name it mystyles.css):

### ./mystyles.css
```css
.red-background {
 background-color: indianred;
}
```

- And now we can just use this style directly in our HTML file (so far so good, if we run this project now we won't see this styles applied, we have to go through some webpack configuration), let's update index.html

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
    Hello Webpack 2!
+   <div class="red-background ">
+     RedBackground stuff
+   </div>
  </body>
</html>

```

- Let's start installing `style-loader` and `css-loader` as dev dependencies


```
npm install style-loader --save-dev
```


```
npm install css-loader --save-dev
```

- Let's import this style from our main javascript file, we have to add the following line of code into the `students.js` file:

```javascript
import * as styles from "./mystyles.css";
```
- If we launch a webpack build this will throw errors, that's because we haven't
defined any loader to handle the css extension. To configure webpack
properly let's add to the loader section a css entry and execute first
the css-loader extension (handle css files), then the style-loader (add CSS to the down by injecting a styler class).

```javascript
module: {
 loaders: [
   {
     test: /\.css$/,
     exclude: /node_modules/,
     loader: "style-loader!css-loader"
   },			
   {
     test: /\.js$/,
     loader: "babel-loader",
     exclude: /node_modules/,
     query: {
       presets: ['es2015']
     }
   }
 ]
},
```

- Now we can just execute the app (npm start) and check how the red background is
being displayed on the div we have chosen.

![Demo01_00_CSS.png](../../99 Readme Resources/02 Webpack/Demo01_00_CSS.png "Demo01_00_CSS.png")

- Why did the blue background dissappeared? Where did the css go? If we open the developer tools in our browser and hit
the network tab we can check that there is no CSS file being requested, but if we
open the main HTML file, we can check how this have been included as a style.

![Demo01_01_Network.png](../../99 Readme Resources/02 Webpack/Demo01_01_Network.png "Demo01_01_Network.png")


- In next demos we will learn how to ask webpack to separate our styles from bundle.js
into separate css output file. Depending on your scenario you could choose one way or the other.
