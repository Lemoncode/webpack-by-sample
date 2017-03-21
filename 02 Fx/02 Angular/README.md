# 02 Angular

In this sample we are going to create a simple Angular 1.x sample (es6 based).

We will start from sample _01 Styles/03 SASS_.

Summary steps:
 - Installing Angular 1.x libraries.
 - Creating the app.
 - Instantiating the app from the html.
 - Creating a component (inline HTML).
 - Creating a service.
 - Displaying the component.
 - Creating an external HTML template and consuming it.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _03 SASS_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- Let's start by installing Angular 1.x library

```
npm install angular --save
```

- We are going to start with a new sample, let's clear up the `students.js` file and start from scratch.

  - Remove `src/mystyles.scss`.
  - Remove `src/averageService.js`.
  - Remove `src/students.js`.

- Now, we can uninstall `jquery` because we don't need for this sample:

```
npm uninstall jquery --save
```

- Let's require angular and create a simple app module, to test that it's Creating the right object we will just dump into the console the app object.

### ./src/index.js
```javascript
import * as angular from 'angular'

const app = angular.module('myStudentApp', []);

console.log(app);
```

- The next step is to reference the app in our HTML file, let's open `index.html`

### ./src/index.html
```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 2.x by sample</title>
  </head>
- <body>
+ <body ng-app="myStudentApp">
-   <div class="jumbotron">
-     <h1>Testing Bootstrap</h1>
-     <p>
-       Bootstrap is the most popular ...
-     </p>
-   </div>
    Hello Webpack 2!
-   <div class="red-background ">
-     RedBackground stuff
-   </div>
  </body>
</html>

```

- Update `webpack.config`:

### ./webpack.config.js
```diff
...

module.exports = {
  ...
  entry: {
-   app: './students.js',
+   app: './index.js',
-   appStyles: [
-     './mystyles.scss',
-   ],
    vendor: [
-     'jquery',
+     'angular',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  ...
};

```

- If we run the application and open the browser console, we check that app object is displayed in the console.

```
npm start
```

- Application up and running, let's move forward. We are going to create a new file that will contain a simple component with an inline template, let's create a file called _`studentsComponent.js`_

### ./src/components/student/studentComponent.js
```javascript
export const studentComponent = {
  template: '<h1>Student Component</h1>',
}
```

- Let's register this component in our main app

### ./src/index.js
```diff
import * as angular from 'angular';
+ import {studentComponent} from './components/student/studentComponent';

const app = angular.module('myStudentApp', []);
+ app.component('studentComponent', studentComponent);

- console.log(app);

```

- Now that we have the component defined, we can instantiate in the `index.html` file (remember kebab case for the HTML, in this case studentComponent turns in to student-component)

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 2.x by sample</title>
  </head>
  <body ng-app="myStudentApp">
-   Hello Webpack 2!
+   <student-component />
  </body>
</html>

```

- If we run the sample we can see that the component get's instantiated and rendering properly.

```
npm start
```

- Using inline HMTL is not a good idea, if we plan to use complex layouts, we should think about separating them in a separate HTML template, let's create an html template that we will call _`template.html`_ and add our HTML content.

### ./src/components/student/template.html
```html
<h1>Student Component</h1>

```

### ./src/components/student/studentComponent.js
```diff
export const studentComponent = {
- template: '<h1>Student Component</h1>',
+ template: require('./template.html'),
}

```

- Now going back into the content, we are just going to require the HTML file. In order to load the HTML we need a new loader, in this case we are going to use [raw-loader](https://github.com/webpack-contrib/raw-loader) (there are other avaialble), let's install this loader:

```
npm install raw-loader --save-dev
```

- Let's properly configure it into the `webpack.config.js`

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
+       test: /\.html$/,
+       exclude: /node_modules/,
+       loader: 'raw-loader',
+     },
    ],
  },
...
};

```

- Now we can run the project and check that our latest changes are working as expected

```
npm start
```

- The final step is to add a controller to this component and add some logic.

- Let's create add this controller to the studentComponent:

### ./src/components/student/studentComponent.js
```diff
export const studentComponent = {
  template: require('./template.html'),
+ controller: function() {
+   this.message = 'Hello from student component';
+ },
}

```

- Let's display this customers into the html template:

### ./src/components/student/template.html
```diff
- <h1>Student Component</h1>
+ <h1>Message: {{$ctrl.message}}</h1>
```

- Now if we run the sample we can see the new message in application

```
npm start
```

![result](../../99%20Readme%20Resources/02%20Fx/02%20Angular/result.png)
