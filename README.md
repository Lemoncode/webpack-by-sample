# Webpack 2.x by sample

Learn webpack by sample, each of the samples contains a `readme.md` file that
indicates the purpose of the sample plus an step by step guide to reproduce it.

The Lemoncode Frontend Master Students are working on a review process, if you want to cooperate in this process or add more useful samples don't hesitate to contact us, fork the project and asking for PR once ready.

# Demos

## 00 Intro

### 00 Boilerplate

In this sample we are going to setup a web project that can be easily managed
by webpack.

We will setup an initial npm project, give support to ES6, and install webpack.

We will create a `hellword.js` sample.

Summary steps:
 - Intialize `package.json` (npm init)
 - Create a simple HTML file.

### 01 Import

In this sample we are going to start working with ES6 modules (import).

We will start from sample _00 Intro/00 Boilerplate_ and add a new JavaScript service that will
hold a simple algorithm to calculate the average of an score array.

We will use this JavaScript array into the main `students.js` file by importing
it.

Summary steps:
 - Add a new file `averageService.js`
 - Add an array on `students.js`
 - Import averageService into `students.js`
 - Use the averageService features inside the `students.js` code.
 - Transpile and test on `index.html`


### 02 Server

In this sample we are going to enter into "dev mode". Working with files service
is not ideal when you are developing a web application, we will learn how to launch
a lite web server, how deploy our bundle into a dist folder (including `index.html`)
, how to debug our es6 code directly into the browser debugger and minify
our `bundle.js`.

We will start from sample _00 Intro/01 Import_, install `webpack-dev-server`, setup our config
to deploy on config folder and support maps (debug), then we will minify
our `bundle.js` file via webpack cli params.

Summary steps:
 - Install via npm webpack-dev-server.
 - Execute webpack-dev-server with live reload.
 - Add start command to `package.json`.


### 03 Output

In this sample we are going to setup a dist folder where the webpack bundle and
main HTML page will be copied to.

We will start from sample _00 Intro/02 Server_,

Summary steps:
 - Redirect output (`bundle.js`) to "dist" folder.
 - Include into the build proccess: copying the `index.html` file to "dist" folder
 - Let webpack include the `bundle.js` script into the `index.html` file.
 - Add map support in order to enable ES6 files to be debugged directly on the browser.
 - Generate a minified version of the `bundle.js`.

### 04 JQuery

So far we have made good progress on our journey... but we are lacking one of the
basic pillars of web development, consuming third party libraries.

In this demo we will install a legacy library (jquery) via npm, define it as global, and use it. Finally we will end up creating a separate bundle for libraries.

We will start from sample _00 Intro/03 Output_.

Summary steps:
 - Install jquery via npm.
 - Setup a global alias ($).
 - Create some sample code using this library.
 - Break into two bundles `app.js` and `vendor.js`.  


## 01 Styles

### 01 Custom CSS

Let's get started working with styles.

In this demo will create a custom CSS file (it will contain a simple css class
that will setup a background color to red).

We will start from sample _00 Intro/04 JQuery_.

Summary steps:
 - Create a custom css file.
 - Install style loader and css loader packages.
 - Configure webpackconfig.


### 02 Import Bootstrap

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

### 03 SASS

In this demo we rename our css file to scss extension and add a simple SASS variable. We will learn how to add a loader that can
make the SASS preprocess and then chain it to our css / style pipe.

We will start from sample _01 Styles/02 Import Bootstrap_.

Summary steps:
 - Rename `mystyles.css` to scss.
 - Add some SASS specific code.
 - Install a SASS preprocessor loader.
 - Add this preprocessor to the pipe (update `webpack.config.js`).

### 04 Handling Images

In this demo we are going to include images in our project in two flavours: via
JavaScript and via HTML. On the JavaScript side we will see is something
straightforward (using the same plugins we used for fonts), for the HTML we will use a new loader html-loader

We will start from sample _01 Styles/03 SASS_.

Summary steps:
- Add two images to our project.
- Add first image from HTML.
- Add second image from JavaScript.
- Configure the loader.

## 02 Fx (frameworks / libraries / languages)

### 00 TypeScript

In this demo we will add support for TypeScript.

We will start from sample _01 Styles/03 SASS_, install TypeScript locally,
configure a tsconfig file, add some ts like, install awesome-typescript-loader and apply it to webpackconfig.

Summary steps:
 - Remove babel configuration.
 - Install TypeScript as a local dependency.
 - Configure TypeScript for our project (tsconfig)
 - Port our project to TypeScript and add use in our code some of the ts features.
 - Install [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader).
 - Add the proper configuration in `webpack.config.js`

### 01 React

In this demo we will add support for React.

We will start from sample _01 Styles/03 SASS_, install react locally, update the `students.js` to jsx and include some basic rendering.

Summary steps:
 - Install reactjs as a local dependency.
 - Update `students.js` to `students.jsx` and update content.
 - Let's resolve the jsx extensions and point out the the entry point has changed.
 - Configure the `webpack.config.js` to support jsx.

### 02 Angular

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

### 03 Angular 2

In this sample we are going to setup a basic Angular 2 app with Webpack.

We will start from sample _02 Fx/00 TypeScript_.

Summary steps:
 - Installing Angular 2.x libraries.
 - Creating the app.
 - Instantiating the app from the html.
 - Creating a component (inline HTML).
 - Creating a service.
 - Displaying the component.
 - Creating an external HTML template and consuming it.


## 03 Misc (other samples)

### 01 Linting

In this sample we are going to introduce Linting. This is a technique which you can analyse code for potential errors, so that can help you to make less mistakes.

We will start from sample _01 Styles/03 SASS_.

Summary steps:
 - Installing ESLint.
 - Configuring ESLint.
 - Connecting with Babel.
 - Connecting with Webpack.
 - Adding custom rules.

### 02 Tree Shaking ES6

On of the most interest features that ships Webpack 2 is Tree Shaking: this allows to remove from a destination bundle the exports that are not in use by the project, reducing dramatically the site of our bundle.

We will start from sample _01 Styles/03 SASS_ and we are going to create a simple sample in ES6:

- A calculator module where we create an export per basic operation (sum, substract, mul, div..).

- A `main.js` file that will import this calculator module and use only sum operation.

We will use webpack's 2 tree shaking and check that we end up having a bundle that doesn't contain the code for substract, mul, and div

### 03 Tree Shaking TypeScript

On of the most interest features that ships Webpack 2 is Tree Shaking: this allows to remove from a destination bundle the exports that are not in use by the project, reducing dramatically the site of our bundle.

We will start from sample _02 Fx/00 TypeScript_ and we are going to create a simple sample in TypeScript:

- A calculator module where we create an export per basic operation (sum, substract, mul, div..).

- A `main.js` file that will import this calculator module and use only sum operation.

We will use webpack's 2 tree shaking and check that we end up having a bundle that doesn't contain the code for substract, mul, and div

### 04 CSS Modules

In this demo we are going to isolate different scss files using same css class names.
We will learn how to configure it and how to deal with external css class provided by third libraries like Bootstrap.

We will start from sample _02 Fx/01 React_.

Summary steps:
- Update `webpack.config.js` with CSS Modules config.
- Add scss file with averageComponent styles.
- Create other component and scss file with same class name.
- Create selector using custom class and Bootstrap class.

### 05 Production Configuration

In this demo we are going to create different builds for each environment.
We will learn how to configure it and how to reduce bundle file sizes.

We will start from sample _03 Misc/04 CSS Modules_.

Summary steps:
- Add base webpack config file
- Add webpack-merge package.
- Add development config file.
- Add production config file.
