# Improving your development environment
## Table of Contents
[[toc]]
## Managing your processes with PM2
PM2 is a process manager. It manages your applications' states, so you can start, stop, restart, and delete processes. It offers features such as monitoring running processes and setting up a "start with operating system" (be that Windows, Linux, or Mac) so your processes start when you boot your system. <br>
I use PM2 as well, and find it quite useful to manage my processes. It also comes with a dashboard. ([https://app.pm2.io/](https://app.pm2.io/))
### Installation
You can install PM2 with NPM or Yarn.
```sh
# NPM:
npm i -g pm2
# Yarn:
yarn global add pm2
```
### Starting your app/process
Once you have installed it, all you have to do to start your app is to run the following:
```sh
pm2 start <your-file-name>.js
```
To give your process a name, run:
```js
pm2 start <your-file-name>.js --name smort
```
You can also use `--watch`, which automatically restart your process as soon as a file change is detected, which can be useful for development environments:
```js
pm2 start <your-file-name>.js --watch
```
To show your process list, run:
```sh
pm2 ls
```
## Using nodemom to auto-restart your processes
Another helpful package is nodemon. It will monitor for any changes in your source and automatically restart your server.

Use `nodemon` instead of `node` to run your code, and now your process will automatically restart when your code changes.
### Installation
```sh
npm i -g nodemon
# OR
yarn global add nodemon
```
To install it as a dev dependency:
```sh
npm i -D nodemon
# OR
yarn add --dev nodemon
```
### Usage
To start a script, all you have to do is run:
```sh
nodemon <your-file-name>.js
# Or if you installed it as a project dependency:
npx nodemon <your-file-name>.js
```
## Using package.json scripts
An easy way to run scripts like a script to start your bot, a script to lint your bot's files, or whatever scripts you use is by storing them in your `package.json` file. After you store these scripts in your `package.json` file, you can type `npm start` to start your bot or `npm run lint` to lint your code for errors.

### Getting started
::: tip
Before getting started, you'll need to have a `package.json` file. If you don't have a `package.json` file (*you should have*), you can run `npm init -y` or `npm init` in the console to generate one.
:::
If you haven't touched your `package.json` file yet (excluding installing dependencies), your `package.json` file should look similar to the following:
```json
{
	"name": "my-bot",
	"version": "1.0.0",
	"description": "A Discord bot!",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"keywords": [],
	"author": "",
	"license": "ISC"
}
```
### Adding a script
::: tip
We'll assume you have finished the [creating your bot](/build/) section of the guide. If you haven't, ensure to follow it first!
:::
Go to the `scripts` section. Add the following:
```json
"start": "node index.js"
```
Your `scripts` section should resemble the following:
```json{3}
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node index.js"
},
```
Now whenever you run `npm start`, `npm run start`, or `yarn start` in your bot's directory, it will run `node index.js`. <br>
You can always add more scripts, and run them with `npm run <script-name>` or `yarn <script-name>`.
