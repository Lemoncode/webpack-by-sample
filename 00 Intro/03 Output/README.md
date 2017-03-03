# 03 Output

In this sample we are going to setup a dist folder where the webpack bundle and
main HTML page will be copied to.

We will start from sample _00 Intro/02 Server_,

Summary steps:
 - Redirect output (bundle.js) to "dist" folder.
 - Include into the build proccess: copying the index.html file to "dist" folder
 - Let webpack include the bundle.js script into the index.html file.
 - Add map support in order to enable ES6 files to be debugged directly on the browser.
 - Generate a minified version of the bundle.js.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _02 Server_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```
