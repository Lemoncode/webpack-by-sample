# 03 HMR

In this demo we are going to configure Hot Module Replacement. This feature is great for productivity in development environment, allowing us to update the app code without having to redeploy the whole files or refresh our browser to get the changes updated.

We will start from sample _03 Environments/02 CSS Modules_.

Summary steps:
- Install `react-hot-loader`.
- Update `webpack.config.js` with HMR config.
- Update `babel`config.
- Update `students.jsx` file.
- Create `index.jsx` file.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _02 CSS Modules_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- To work with HMR and `react`, we need to install `react-hot-loader`:

```bash
npm install react-hot-loader --save-dev
```

- Let' add react-hot-loader/babel plugin to the _.babel.rc_:


### ./babelrc

```diff
{
  "presets": [
    "env",
    "react"
  ],
+ "plugins": ["react-hot-loader/babel"]  
}
```

- Let's mark the root component as _hot-exported_:

_student.jsx_

```diff

+ const myRoot = () =>
+  <div>
+    <h1>Hello from React DOM</h1>
+    <AverageComponent />
+    <TotalScoreComponent />
+  </div>
+
+const App = hot(module)(myRoot);

ReactDOM.render(
+  hot(module)(App)  
-  <div>
-    <h1>Hello from React DOM</h1>
-    <AverageComponent />
-    <TotalScoreComponent />
  </div>,
  document.getElementById('root')
);
```

- Let's add the flag 'hot' to our start command in package json

### ./package.json
```diff
  "scripts": {
-    "start": "webpack-dev-server --mode development --open",
+    "start": "webpack-dev-server --mode development --open --hot",
    "build": "rimraf dist && webpack  --mode development"
  }
```

> We could configure --hot in webpack.config

### ./webpack.config.js

```diff
...
+ devServer: {
+ hot: true,
},
```

