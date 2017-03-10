# 02 Tree Shaking ES6

On of the most interest features that ships Webpack 2 is Tree Shaking: this allows to remove from a destination bundle the exports that are not in use by the project, reducing dramatically the site of our bundle.

We will start from sample _01 Styles/03 SASS_ and we are going to create a simple sample in ES6:

- A calculator module where we create an export per basic operation (sum, substract, mul, div..).

- A main.js file that will import this calculator module and use only sum operation.

We will use webpack's 2 tree shaking and check that we end up having a bundle that doesn't contain the code for substract, mul, and div

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample _03 SASS_.

## steps

- `npm install` to install previous sample packages:

```
npm install
```
