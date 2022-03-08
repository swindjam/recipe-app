# recipe-app
 
To start the dev setup, run `docker-compose up`.

This will run dev containers for both client side and node js.

The app is ready when the message listening on port 8081.
Go to `http://localhost:8081` to see the server rendered app.

Note: The node-dev webpack build does not compile on windows, so the docker setup uses tsc-watch instead, however this does take a while to compile after each change.