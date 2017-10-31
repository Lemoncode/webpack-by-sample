# Detect webpack.config changes and auto restart DevServer

You may have realized that any change made into webpack config file will require us to manually re-initialize `webpack-dev-server` by killing current instance and launching a new one (`npm start`). Sometimes, this could be annoying, especially when dealing with many changes in webpack configuration.

In this demo we will find a very simple way to make our webpack-dev-server to automatically restart whenever a change is detected in `webpack-config-file`. For that purpose we will use a tool called `nodemon`, which in essence, will watch our files and trigger actions whenever a change occurs.  

Let's start from the previous sample _00 Intro/04 JQuery_.

Summary steps:
 - Install `nodemon` via `npm`.
 - Modify `start` script in `package.json`.

# Steps to build it

## Prerequisites

You need to have `Node.js` installed on your computer. Please, take sample _04 JQuery_ as starting point.

## steps

- `npm install` to install previous sample packages:

```
npm install
```

- Let's install `nodemon` via `npm` as well. This is a development-only utility, so let's add `--save-dev` modifier.

```
npm install nodemon --save-dev
```

It automatically adds that entry to our _package.json_.

### ./package.json
```diff
{
  ...
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.0",
    "html-webpack-plugin": "^2.30.1",
+   "nodemon": "^1.12.1",
    "rimraf": "^2.6.2",
    "webpack": "^3.5.6",
    "webpack-dev-server": "^2.7.1"
  },
}

```

- Open `package.json` and replace the `start` script by the following one:

### ./package.json
```diff
 "scripts": {
-   "start": "webpack-dev-server",   
+   "start": "nodemon --watch webpack.config.js --exec webpack-dev-server",
    "build": "rimraf dist && webpack",
    "build:prod": "rimraf dist && webpack -p"
  },
```

- As you can see, we can watch whatever file(s) with the `--watch` modifier. In this case we are pointing towards 'webpack.config.js' file. Then, upon any change on that file, let's execute our webpack dev server command: `--exec webpack-dev-server`.

# Test it

Just start your development server
```
npm start
```
and notice how `nodemon` is now the launcher of our `webpack-dev-server` as well as the watcher of `webpack.config.js`.

![Command Prompt Start](../../99%20Readme%20Resources/00%20Intro/BONUS%20Auto%20Restart%20DevServer/commandPrompt_start.png)


Now open `webpack.config.js` and just add a empty line at the end to force a change. Save it and look at the terminal. 

![Command Prompt Restart](../../99%20Readme%20Resources/00%20Intro/BONUS%20Auto%20Restart%20DevServer/commandPrompt_restart.png)

# Credits

This sample has been created thanks to (@fjcalzado)[https://github.com/fjcalzado] and @adrigardi90 contributions.
