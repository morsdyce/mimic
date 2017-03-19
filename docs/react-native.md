# Using Mimic with React Native

Mimic allows you to see and mock all networks requests coming from your React Native application.
In this guide we will see how we can easily install Mimic into our application and mock our first request.

Check out the [example repository](https://github.com/morsdyce/mimic-react-native-example).


## Installation

Since with React Native we don't have access to the debugger, in order to access the Mimic UI you would need both
the mimic itself and the proxy that would connect the UI with your React Native application.

```
$ npm install -g mimic-remote
$ npm install -D mimic
```

* `-D` is a shortcut for --save-dev

The second step is to import mimic inside the entry point of your application.
In most cases this is index.ios.js or index.android.js

```
// import mimic into your project
import connect from 'mimic/react-native';

// connect to mimic-remote server
connect();

// you can also specify a custom host and port to connect to
// connect({ host: 'localhost', port: 5000 });
```

Now open a new terminal tab and run the proxy:

```
$ mimic-remote

# You can also run it on a different port (by default 5000)
$ mimic-remote --port 4000

# Or use shorthand syntax
$ mimic-remote -p 4000
```


## Using mimic

It is important to note that Mimic will hold off all your application requests until Mimic is open in your browser window.
This is a current limitation of the implementation to allow you to mock any request that goes out at the start of the application.