This is a full stack React and Node Express application. The client folder is it's own application and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The server side entry is in api.js so you will need to run `yarn` command in the root and the client folder to install all dependencies first. Then you can run the following scripts.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

This brings up both server and client applications using `concurrently`. 

### `yarn server`

You will need to run `npm install -g nodemon` which is a nice utility to keep the server running and listening to changes when development the backend API only.

### `yarn client`

This is simply running the front end React application alone.

### Additional Resources

Followed some nice guidelines from the following:
- https://coursework.vschool.io/setting-up-a-full-stack-react-application/
- https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0