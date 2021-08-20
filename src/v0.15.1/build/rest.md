# Using a RESTful API
REST APIs are extremely popular on the web and allow you to freely grab a site's data if it has an available API over an HTTP connection. <br>
If you've ever seen a music bot that accepts a YouTube query instead of just a video's URL, then you've seen a REST API in action. You've probably used an API yourself if you've grabbed data from another page before.

## Making HTTP requests with Node.js
The library we will be using is [got](https://www.npmjs.com/package/got). Proceed to install the `got` package:
:::: code-group
::: code-group-item YARN
```sh
yarn add got
```
:::
::: code-group-item NPM
```sh
npm i got --save
```
:::
::::

## Base code
We are going to use the command handler we have created earlier, so go on and read it if you haven't *(You should have)*. Open your command prompt, navigate to your project's root directory and run the following: 
```sh
cd commands
mkdir fun
cd fun
touch meme.js # HINT: look at the file name to guess what this command will be about
```
Open `meme.js` in your text editor, and put in the code for the command handler:
```js
const got = require('got'); // require `got`
module.exports = {
	name: 'meme',
	description: 'fetches memes from reddit', // hooray if you guessed correctly
    args: false,
	cooldown: 2,
	async execute(message, args, prefix) {
    
  }
};
```
## Using `got`
`got` is a (🌐) Human-friendly and powerful HTTP request library for Node.js. It is Promise-based, which means you will either need to use `async`/`await` or `.then()`. In this guide, we will use the latter. <br>

To fetch memes from reddit, we will need to query [https://www.reddit.com/r/memes/random/.json](https://www.reddit.com/r/memes/random/.json), which gives us a random meme from [r/memes](https://www.reddit.com/r/memes/).<br>
As you can see, we have already required `got` at the top of the file by doing the following:
```js
const got = require('got');
```
To fetch the JSON from Reddit, you'd do the following:
```js
got('https://www.reddit.com/r/memes/random/.json')
  .then((response) => {
    console.log(response)
  })
```
You have just sent a request to Reddit, and if you look at your console now, you should see a huge lump of JSON there. However, JavaScript doesn't understand it yet, so we need to parse it:
```js
got('https://www.reddit.com/r/memes/random/.json')
		.then((response) => {
			const list = JSON.parse(response.body);
		});
```
::: warning
You must do the following:
```js
JSON.parse(response.body);
```
or JavaScript will throw and error. Not even `JSON.parse(response)`!
:::
Now, we have the parsed JSON stored inside the `list` variable. We now need to extract the data and send it:
```js
got('https://www.reddit.com/r/memes/random/.json')
		.then((response) => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;
			message.channel.createMessage({
				embed: {
					title: memeTitle,
					url: memeUrl,
					image: {
						url: memeImage,
					},
					color: 15267908,
					footer: {
						text: `👍 ${memeUpvotes} 💬 ${memeNumComments}`,
					},
				},
			});
		})
		.catch(err => {
			console.error(err);
		});
```
We used the following:
```js
.catch(err => {
  console.error(err);
});
```
to catch any errors and prevent errors from crashing the bot, and log it into the console.
<br>
That's about it for the `meme` command!
