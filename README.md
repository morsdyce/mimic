Mimic
==========

[![Build Status](https://travis-ci.org/500tech/mimic.svg?branch=master)](https://travis-ci.org/morsdyce/mimic)
[![npm version](https://badge.fury.io/js/mimic.svg)](https://badge.fury.io/js/mimic)
[![Known Vulnerabilities](https://snyk.io/test/github/500tech/mimic/badge.svg)](https://snyk.io/test/github/morsdyce/mimic)

Seamless client side mocking [https://mimic.js.org](https://mimic.js.org)

![short introduction](https://mimic.js.org/assets/images/mimic_screenshot.png)

### What is mimic?
Mimic is a tool for mocking server responses on the client side.

Using Mimic in your project
--------------------------

Add to your packages:

    npm install mimic --save-dev

Import in your app:

    import 'mimic';

Once you reload the application, the Mimic logo will appear in bottom
right corner.

Enjoy!

Loading Mimic only in development environments
--------------------------

To load mimic only in development environments your application will need to be aware if it runs in development or production mode.

If you are using webpack the most common way is to use the DefinePlugin to define NODE_ENV environment variable.
Please see [webpack DefinePlugin](https://webpack.js.org/plugins/define-plugin/) for more information.

If you are using create react app this is applied by default which you can read more about it [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables).

Once your application is aware of the environment you need to add a conditional require or import statement to load Mimic.
For example:

```js
if (process.env.NODE_ENV === 'development') {
  require('mimic');
}
```

Or using the dynamic import spec (you must have babel and [babel-plugin-syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) installed to use this syntax).

```js
if (process.env.NODE_ENV === 'development') {
  import('mimic');
}
```

Using Mocks tracked by git
--------------------------
If you want to use mocks which will be committed into git and you're using webpack you can use the following code to import the mocks on application start:

```
import mimic from 'mimic';
const mocks = require.context(__dirname + '/mocks', true, /\.json$/);
mocks.keys().forEach((key) => mimic.import(JSON.stringify(mocks(key))));
```

This assumes your mocks are placed in the mocks directory which is located at the root of the project.
In the mocks directory you have exports for either complete scenarios or separate mock requests.


Guides
-------------

* [Using mimic with React Native](https://github.com/500tech/mimic/blob/master/docs/react-native.md)
* [Using mimic with NativeScript](https://github.com/500tech/mimic/blob/master/docs/nativescript.md)


Other Usages
------------
The main and the most obvious use case for mimic is when the API for a UI feature is not ready or incomplete,
but it can be helpful in more situations. For example:

* You have a demo of the product, but the API server is unstable or you need to use fake data.
* You want to work on a feature outside of company's VPN
* You need access to API, but don't have an internet connection or it is unstable.

In the cases above, you can use the "recording" feature to record all the real responses from server
by hand and then use them for your needs in the future.


Contributing to Mimic
--------------------


1. Clone the repo
1. Install dependencies (at the root of the repo):

    ```
    npm install
    ```

1. Run the project

    ```
    npm start
    ```

1. Build for deployment

    ```
    npm run build
    ```

1. Please submit PRs to the `next` branch, as we keep master as the latest version of mimic.

Acknowledgements
-------
Thanks [Ilya Birman](http://ilyabirman.net) for the new UI for Mimic 2.0


License
-------

The MIT License (MIT)

Copyright (c) 2015 Maayan Glikser

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
