Mimic
==========

[![Build Status](https://travis-ci.org/500tech/mimic.svg?branch=master)](https://travis-ci.org/500tech/mimic)
[![npm version](https://badge.fury.io/js/mimic.svg)](https://badge.fury.io/js/mimic)

![short introduction](http://500tech.github.io/mimic/assets/images/mimic_intro.gif)

Using Mimic in your project
--------------------------

Add to your packages:

    npm install mimic --save

Require in your app:

    import 'mimic';

Once you reload the application, the Mimic logo will appear in bottom
right corner.

Enjoy!


Using Mocks tracked by git
==========================
If you want to use mocks which will be committed into git and you're using webpack you can use the following code to import the mocks on application start:

```
import mimic from 'mimic';
const mocks = require.context(__dirname + '/mocks', true, /\.json$/);
mocks.keys().forEach((key) => mimic.import(JSON.stringify(mocks(key))));
```

This assumes your mocks are placed in the mocks directory which is located at the root of the project.
In the mocks directory you have exports for either complete scenarios or separate mock requests.


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
