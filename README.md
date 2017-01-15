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
    
License
-------

The MIT License (MIT)

Copyright (c) 2015 500Tech

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
