# Using Mimic with NativeScript

Mimic allows you to see and mock all networks requests coming from your NativeScript application.
In this guide we will see how we can easily install Mimic into our application and mock our first request.

Check out the [example repository](https://github.com/morsdyce/mimic-nativescript-example).


## Installation

Since with NativeScript we don't have access to the debugger, in order to access the Mimic UI you would need both
the mimic itself and the proxy that would connect the UI with your NativeScript application.

```
npm install -g mimic-remote
npm install --save mimic
```

Since mimic uses websockets to communicate with its UI,
you also need to add the [nativescript-websockets](https://www.npmjs.com/package/nativescript-websockets) plugin:

```
npm install --save nativescript-websockets
tns plugin add nativescript-websockets
```

First we need to run Mimic remote cli tool so we can communicate with NativeScript

open a new terminal tab and run mimic-remote:

```
mimic-remote

# You can also run it on a different port (by default 5000)
mimic-remote --port 4000

# Or use shorthand syntax
mimic-remote -p 4000
```

The second step is to import mimic inside the entry point of your application.
In most cases this is app.js or index.js

```
// Load Mimic and nativescript-websockets dependency
require('nativescript-websockets');
var connect = require('mimic/nativescript').default;

// connect to mimic-remote server
connect();

// you can also specify a custom host and port to connect to
// connect({ hostname: 'localhost', port: 5000 });
```

## Using mimic

It is important to note that Mimic will hold off all your application requests until Mimic is open in your browser window.
This is a current limitation of the implementation to allow you to mock any request that goes out at the start of the application.
