# Arrow functions
Arrow functions allows us to write shorter syntax. Here's an example:
```js
const hello = function() {
  return 'Hello!';
}
```
would become
```js
const hello = () => {
  return 'Hello!';
}
```
or
```js
const hello = () => 'Hello!';
```
However, you can only omit the brackets (`{}`) and `return` if the function is on a single line. As a best practice and for consistency, doing the following is recommended:
```js
const hello = () => { return 'Hello!'; }
```
## Using it in our code
For our code, you might have noticed that we have already used arrow functions. For example, take the following:
```js
bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});
```
Without arrow functions, we have to do:
```js
bot.on("ready", function() { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});
```
Here's another example:
```js
bot.on("messageCreate", (message) => {
  // ...
});
```
would become
```js
bot.on("messageCreate", function(message) {
  // ...
});
```
You see? Without arrow functions, our code would be much longer.
