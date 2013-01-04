# Mojito Hybrid Example Application

This is modified version of Ric Allinson's app https://github.com/ricallinson/mojito_app_hybrid_example.
The modifications are so that the application is compatible with Mojito v0.5.


Check out the application.

    > git clone https://github.com/capecodehq/mojito_app_hybrid_example.git

## Install Mojito

You will need [nodejs](http://nodejs.org/) and [npm](https://npmjs.org/) installed to do this.

	> npm install mojito -g

## Run with a Mojito Server

Start the server;

    > ./scripts/start-server

Open in a web browser [http://localhost:8666/](http://localhost:8666/)

## Build for use with a File Server

	> ./scripts/edge-cache-build

You can now serve the contents of the "./builds/edge-cache/" directory with Connect, Apache or GitHub [like this example](http://ricallinson.github.com/mojito_app_hybrid_example/).

The files can also be tested locally by running this script;

	> ./scripts/test-edge-cache.js

## Build for use with the Cocktails Runtime

	> ./scripts/ycrt-build

You can now open the contents of the "./builds/ycrt/android/" or "./builds/ycrt/ios/" with Eclipse or Xcode respectively and build the the Mojito application as a native install.
