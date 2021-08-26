# Template literals
Template Literals use back-ticks (<code>``</code>) rather than the quotes (<code>""</code>) to define a string. Template literals also provide an easy way to interpolate variables and expressions into strings. Take, for example, the following:
```js
console.log('Ready as ' + bot.user.username + '#' + bot.user.discriminator);
```
The code is a bit hard to read (and annoying to constantly type out), but luckily, with template literals, it would look like:
```js
console.log(`Ready as ${bot.user.username}#${bot.user.discriminator}`);
```
Isn't it much easier to type out and read?
## Template literals vs string concatenation
If you've used other programming languages, you might be familiar with the term "string interpolation". Template literals would be JavaScript's implementation of string interpolation. If you're familiar with the heredoc syntax, it's very much like that; it allows for string interpolation, as well as multiline strings.
Take this:
```js
// regular string concatenation
console.log('Your username is: **' + username + '**.');
console.log('Your password is: **' + password + '**.');

console.log('1 + 1 = ' + (1 + 1));

console.log('And here\'s a function call: ' + letsPretendThisDoesSomething());

console.log(
	'Putting strings on new lines\n'
	+ 'can be a bit painful\n'
	+ 'with string concatenation. :(',
);
```
and transform it into this with template literals:
```js
// template literals
console.log(`Your password is: **${password}**.`);
console.log(`Your username is: **${username}**.`);

console.log(`1 + 1 = ${1 + 1}`);

console.log(`And here's a function call: ${letsPretendThisDoesSomething()}`);

console.log(`
	Putting strings on new lines
	is a breeze
	with template literals! :)
`);
```
You can see how it makes things easier and more readable. In some cases, it can even make your code shorter! This one is something you'll want to take advantage of as much as possible.
