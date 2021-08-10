# Setting up

Without further ado, let us get started with our project.
```bash
mkdir eris-bot
cd eris-bot
```
Initialize the project:
```bash
npm init # fill out the questions
```
Feeling a bit lazy? Run `npm init -y` to have it fill everything out for you! <br>
Install the packages needed:
```bash
npm i eris --no-optional # add the --no-optional flag to stop it from installing optional dependencies for voice support (that would need node-gyp)
npm i eslint -D
npm i dotenv
```
If you want to install the `dev` version of Eris instead of the stable version, run the following:
```bash
npm install --no-optional abalabahaha/eris#dev
```
