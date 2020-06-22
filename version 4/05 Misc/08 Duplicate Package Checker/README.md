# 08 Duplicate Package Checker

In this section we are going to install and configure the [Duplicate Package Checker](https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin) plugin which will check our bundle and warn us if we have multiple versions of the same package installed.

## Note:

> In a small app like this it's unlikely that this plugin is needed. However, in a large app with changing versions and more complexity it can give peace of mind that you won't be including multiple versions of the same package accidentally.

We will start from sample \_03 Environments/07 Webpack Monitor

## Summary:

- Install the plugin.
- Add the plugin to the webpack config file required.

# Steps to build it

## Prerequisites

You will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _07 Webpack Monitor_

## Steps

- Run `npm install` to install previous sample packages:

1. Let's begin by installing the plugin to our dev dependencies:

```
npm install duplicate-package-checker-webpack-plugin --save-dev

```

2. Now we'll add the plugin to our _dev.webpack.config.js_:

_./dev.webpack.config.js_

```diff
const merge = require('webpack-merge');
const base = require('./base.webpack.config.js');
const Dotenv = require('dotenv-webpack');
const WebpackMonitor = require('webpack-monitor');
+ const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
```

3. Add the following entry into the plugins array:

_./dev.webpack.config.js_

```diff
  plugins: [
...
+ new DuplicatePackageCheckerPlugin(),
  ],
```

4. That's it! On running a build `npm run build:dev` you will be warned about any duplicate packages.

### Options

If you want more control over the feedback you can pass a config object:

```diff
  plugins: [
...
+ new DuplicatePackageCheckerPlugin({
 // Also show module that is requiring each duplicate package (default: false)
+ verbose: true,
 // Emit errors instead of warnings (default: false)
+ emitError: true,
 // Show help message if duplicate packages are found (default: true)
+ showHelp: false,
 // Warn also if major versions differ (default: true)
+ strict: false,
}),
  ],
```

If you have found a duplicate, dealing with it depends on your individual use case. Some ideas:

- Webpack `resolve alias`. We already have this setup in our webpack configs e.g. `alias: {jquery: 'jquery/dist/jquery.slim.js',}`. It configures Webpack to route any package references to a single specified path.
- `npm dedupe` See [this](https://stackoverflow.com/questions/52781142/what-is-deduped-in-npm-packages-list) stack overflow post.
- Bump your dependencies - update them to the latest usable version
