# Installation

## Installing Node.js
### Windows
Head over to the [Node.js website](https://nodejs.org/) and download the latest version.
### macOS
If you're developing on macOS, you have a few options. You can go to the [Node.js website](https://nodejs.org/), download the latest version, double click the package installer, and follow the instructions. Or you can use a package manager like [Homebrew](https://brew.sh/) with the command `brew install node`.

### Installing on Linux
If you're developing on Linux, you may consult [this page](https://nodejs.org/en/download/package-manager/) to determine how you should install Node.
On that note, there's a possibility that you may already have Node (e.g., if you're using a VPS). You can check by running the `node -v` command. If it outputs something like `v14.0` or higher, then you're good to go! Otherwise, take a look at the page linked above for instructions on installing Node on your OS.

## Installing required packages
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
npm i dotenv
```
If you want to install the `dev` version of Eris instead of the stable version, run the following:
```bash
npm install --no-optional abalabahaha/eris#dev
```
## Optional dependencies
There are a few optional dependencies that you can choose not to install.

- [`bufferutil`](https://github.com/websockets/bufferutil) - WebSockets buffer utility (faster) (native)
- [`abalabahaha/erlpack`](https://github.com/abalabahaha/erlpack) - Erlang Term Format encoder/decoder (might be faster) (native)
- [`pako`](https://github.com/nodeca/pako) - compression library (faster)
- [`zlib-sync`](https://github.com/abalabahaha/zlib-sync) - compression library (faster than pako) (native)
- [`@discordjs/opus`](https://github.com/discordjs/opus) - opus audio encoding (faster) (native)
- [`sodium-native`](https://github.com/sodium-friends/sodium-native) - audio encryption (faster) (native)
- [`eris-sharder`](https://github.com/discordware/eris-sharder) - sharding manager for the JavaScript eris library





<br>Congrats! You have now installed all the required packages for your project.
