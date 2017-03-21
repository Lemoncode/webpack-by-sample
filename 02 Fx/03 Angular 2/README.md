# 03 Angular 2

In this sample we are going to setup a basic Angular 2 app with Webpack.

We will start from sample _02 Fx/00 TypeScript_.

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

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _00 TypeScript_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- Since, Angular 2 is based on TypeScript, that why we are going to base this sample from _00 TypeScript_.

- Let's start by installing Angular 2.x libraries:

## Required dependencies
- core-js
- zone.js
- @angular/core
- @angular/platform-browser
- @angular/platform-browser-dynamic

## Peer dependencies
- @angular/common
- @angular/compiler
- rxjs

```
npm install @angular/common @angular/compiler
@angular/core @angular/platform-browser @angular/platform-browser-dynamic
core-js reflect-metadata
rxjs zone.js --save
```

- Install typings for `core-js`:

```
npm install @types/core-js --save-dev
```

- We are going to start with a new sample, let's clear up the `students.js` file and start from scratch.

  - Remove `src/mystyles.scss`.
  - Remove `src/averageService.ts`.
  - Remove `src/students.ts`.


- Now, we can uninstall `jquery` because we don't need for this sample:

```
npm uninstall jquery --save
npm uninstall @types/jquery --save-dev
```

- Let's going to create a new file that will contain a simple component with an inline template, let's create a file called _`studentsComponent.ts`_

### ./src/components/student/studentComponent.ts
```javascript
import { Component } from '@angular/core';

@Component(
  {
    selector: 'student-component',
    template: `
      <h1>Student Component</h1>
    `
  }
)
class StudentComponent {

}

export {
  StudentComponent
}

```

- Let's require angular libs and create a simple app module with the StudentComponent.

### ./src/index.ts
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StudentComponent } from './components/student/studentComponent';

@NgModule({
  declarations: [StudentComponent],
  imports: [BrowserModule],
  bootstrap: [StudentComponent],
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);

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
  <body>
-   <div class="jumbotron">
-     <h1>Testing Bootstrap</h1>
-     <p>
-       Bootstrap is the most popular ...
-     </p>
-   </div>
-   Hello Webpack 2!
-   <div class="red-background ">
-     RedBackground stuff
-   </div>
+   <student-component></student-component>
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
-   app: './students.ts',
+   app: './index.ts',
-   appStyles: [
-     './mystyles.scss',
-   ],
    vendor: [
-     'jquery',
+     'core-js',
+     'reflect-metadata',
+     'zone.js',
+     '@angular/common',
+     '@angular/compiler',
+     '@angular/core',
+     '@angular/platform-browser',
+     '@angular/platform-browser-dynamic',
+     'rxjs',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  ...
};

```

- Since we are declaring `@NgModule` and `@Component` with decorators, we have to enable it. We need to use `core-js` as global typings:

### ./tsconfig.json
```diff
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": true,
    "noLib": false,
-   "suppressImplicitAnyIndexErrors": true
+   "suppressImplicitAnyIndexErrors": true,
+   "types": [
+     "core-js",
+     "webpack-env"
+   ]
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

- If we run the application and open the browser console, we check that app object is displayed in the console.

```
npm start
```

![warnings angular core](../../99%20Readme%20Resources/02%20Fx/03%20Angular%202/warnings%20angular%20core.png)

- To avoid [these warnings](https://github.com/AngularClass/angular2-webpack-starter/issues/993) we can configure our `webpack.config`:

### ./webpack.config.js
```diff
...

module.exports = {
  ...
  plugins: [
    ...
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true,
    }),
+   new webpack.ContextReplacementPlugin(
+     /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
+     path.join(__dirname, 'src')
+   ),
  ],
};

```

![result after fix warnings](../../99%20Readme%20Resources/02%20Fx/03%20Angular%202/result%20after%20fix%20warnings.png)

- Using inline HMTL is not a good idea, if we plan to use complex layouts, we should think about separating them in a separate HTML template, let's create an html template that we will call _`template.html`_ and add our HTML content.

### ./src/components/student/template.html
```html
<h1>Student Component</h1>

```

### ./src/components/student/studentComponent.js
```diff
import { Component } from '@angular/core';

@Component(
  {
    selector: 'student-component',
-   template: `
-     <h1>Student Component</h1>
-   `
+   template: require<string>('./template.html'),
  }
)
class StudentComponent {

}

export {
  StudentComponent
}

```

- We see that TypeScript cannot find name `require` because we need to install typings:

```
npm install @types/webpack-env --save-dev
```

- And we need to use it as global typings:

### ./tsconfig.json
```diff
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": true,
    "noLib": false,
    "suppressImplicitAnyIndexErrors": true,
    "experimentalDecorators": true,
    "types": [
-     "core-js"
+     "core-js",
+     "webpack-env"
    ]
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
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
import { Component } from '@angular/core';

@Component(
  {
    selector: 'student-component',
    template: require<string>('./template.html'),
  }
)
class StudentComponent {
+ message: string;

+ constructor() {
+   this.message = 'Hello from student component'
+ }
}

export {
  StudentComponent
}

```

- Let's display this customers into the html template:

### ./src/components/student/template.html
```diff
- <h1>Student Component</h1>
+ <h1>Message: {{this.message}}</h1>
```

- Now if we run the sample we can see the new message in application

```
npm start
```

![result](../../99%20Readme%20Resources/02%20Fx/03%20Angular%202/result.png)
