# Sparkissimo

> A kickstart for developing web applications with the
> [Spark Core](https://www.spark.io/).
>
> The included example functionality provides an interface to the Spark Core's
> onboard led.
>
> Among other things, the application utilizes node, express, johnny-five,
> socket.io, react, browserify, and grunt.

## Spark Core

1. Follow [Spark's getting started guide](https://www.spark.io/start) to setup your Spark Core and connect it to your network.
2. Flash your Spark Core with the [VoodooSpark firmware](https://github.com/voodootikigod/voodoospark)

## Installation

```
npm install
```

## Build

```
grunt build
```

or for minified assets

```
grunt build --env production
```

## Server

__Configuration__

Configuration options are stored in `server/config/default.js`.  In order to override any of these values, add a `local.js` file to the `server/config` directory.  This file is and should remain gitignored.  At a minimum, you will need to customize the spark configuration options.  Below is an example. Please see [node-config](http://lorenwest.github.io/node-config/latest/) for more information.

```
module.exports = {
  spark: {
    apiToken: 'Your API token here',
    deviceId: 'Your device Id here'
  }
};
```

__Start Server__

The following script will start a server at
[http://localhost:3000](http://localhost:3000).

```
npm start
```

__Debug__

There is also a debug helper script that uses [node-inspector](https://github.com/node-inspector/node-inspector) to allow `debugger` breakpoints in the server.

```
npm run start:debug
```

## Develop

The following task will create a build, start a watch process, and start a
server at [http://localhost:3000](http://localhost:3000).

```
grunt develop
```

