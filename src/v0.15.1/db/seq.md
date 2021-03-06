# Using Sequelize to store data
Sequelize is an object-relational-mapper, which means you can write a query using objects and have it run on almost any other database system that Sequelize supports.
## Why use ORM?
The main benefit of using an ORM like Sequelize is that it allows you to write code that virtually looks like native JavaScript. As a side benefit, an ORM will enable you to write code that can run in almost every database system. Although databases generally adhere very closely to SQL, they each have their slight nuances and differences. You can create a database-agnostic query using an ORM that works on multiple database systems.
## A simple tag system
For this tutorial, we will create a simple tag system that will allow you to add a tag, output a tag, edit a tag, show tag info, list tags, and delete a tag.
To begin, you should install Sequelize into your discord.js project. We will explain SQlite as the first storage engine and show how to use other databases later. Note that you will need Node 7.6 or above to utilize the `async`/`await` operators.
## Installing Sequelize
```sh
npm install --save sequelize
npm install --save sqlite3
```
## Collecting information
After you have installed Sequelize, open your `index.js` file.
Require Sequelize:
```js
const Sequelize = require('sequelize');
```
and define the connection information. It should look something like this:
```js
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});
```
`host` tells Sequelize where to look for the database. For most systems, the host will be localhost, as the database usually resides with the application. If you have a remote database, however, then you can set it to that connection address. Otherwise, don't touch this unless you know what you're doing.
`dialect` refers to the database engine you are going to use. For this tutorial, it will be sqlite.
`logging` enables verbose output from Sequelize–useful for when you are trying to debug. You can disable it by setting it to `false`. `storage` is a sqlite-only setting because sqlite is the only database that stores all its data to a single file.
## Creating a model
In any relational database, you need to create tables to store your data. This simple tag system will use four fields. The table in the database will look something like this:
|name|description|username|usage_count|
|--------|------|------|------|
|alice   | is in wonderland   |  alice |11|
| jack   | (～￣▽￣)～  |  jill |  5 |

To do that in Sequelize, you define a model based on this structure, as shown below.
```js
/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255),
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});
```
The model mirrors very closely what the database defines. There will be a table with four fields called `name`, `description`, `username`, and `usage_count`.<br>
`sequelize.define()` takes two parameters. `'tags'` are passed as the name of our table, and an object that represents the table's schema in key-value pairs. Keys in the object become the model's attributes, and the values describe the attributes.<br>
`type` refers to what kind of data this attribute should hold. The most common types are number, string, and date, but other data types are available depending on the database.<br>
`unique: true` will ensure that this field will never have duplicated entries. Duplicate tag names are disallowed in this database.<br>
`defaultValue` allows you to set a fallback value if there's no initial value during the insert.<br>
`allowNull` is not all that important, but this will guarantee in the database that the attribute is never unset. You could potentially set it to be a blank or empty string, but it has to be something.<br>
::: tip
`Sequelize.STRING` vs. `Sequelize.TEXT`: In most database systems, the string's length is a fixed length for performance reasons. Sequelize defaults this to 255. Use STRING if your input has a max length, and use TEXT if it does not. For sqlite, there is no unbounded string type, so it will not matter which one you pick.
:::
Now, export the model by adding this at the bottom of the file:
```js
module.exports = {
	Tags,
};
```
and put
```js	
const { Tags } = require('../../index.js');
```
## Syncing the model
Now that your structure is defined, you need to make sure the model exists in the database. To make sure the bot is ready and all the data you might need has arrived, place the following code into the `.on('ready', ...)` event callback.
```js
Tags.sync();
```
The table does not get created until you `sync` it. The schema you defined before was building the model that lets Sequelize know how the data should look. For testing, you can use `Tags.sync({ force: true })` to recreate the table every time on startup. This way, you can get a blank slate each time.
## Adding a tag
After all this preparation, you can now write your first command! Let's start with the ability to add a tag. Create an `addtag` command.
::: details Creating a command
In case you have forgotten how to create a command, refer to [this section](/v0.15.1/build/handler.html#the-command-file-code).
:::
Put the following code inside:
```js
// NOTE: When sending the tags in the message, use camelCase and refrain from using spaces for
// the tag name and tag description
// GOOD: !addtag tagName tagDesc
// BAD: !addtag tag name tag desc
const tagName = args[0];
const tagDescription = args[1];

try {
	// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
	const tag = await Tags.create({
		name: tagName,
		description: tagDescription,
		username: `${message.author.username}#${message.author.discriminator}`,
	});
	return message.channel.createMessage(`${message.author.mention}, tag ${tag.name} added.`);
}
catch (error) {
	if (error.name === 'SequelizeUniqueConstraintError') {
		return message.channel.createMessage('That tag already exists.');
	}
	return message.channel.createMessage('Something went wrong with adding a tag.');
}
```
`Tags.create()` uses the models that you created previously. The `.create()` method inserts some data into the model. You are going to insert a tag name, description, and the author name into the database.
The `catch (error)` section is necessary for the insert because it will offload checking for duplicates to the database to notify you if an attempt to create a tag that already exists occurs. The alternative is to query the database before adding data and checking if a result returns. If there are no errors or no identical tag is found, only then would you add the data. Of the two methods, it is clear that catching the error is less work for you.
Although `if (error.name === 'SequelizeUniqueConstraintError')` was mostly for doing less work, it is always good to handle your errors, especially if you know what types of errors you will receive. This error comes up if your unique constraint is violated, i.e., duplicate values are inserted.

::: tip
Do not use catch for inserting new data. Only use it for gracefully handling things that go wrong in your code or logging errors.
:::
## Fetching a tag
Create a `fetchtag` command.
To fetch a tag, you'd do:
```js
const tagName = args[0];

// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
const tag = await Tags.findOne({ where: { name: tagName } });
if (tag) {
	// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
	tag.increment('usage_count');
	return message.channel.createMessage(tag.get('description'));
}
return message.channel.createMessage(`Could not find tag: ${tagName}`);
```
This is your first query. You are finally doing something with your data; yay!
`.findOne()` is how you fetch a single row of data. The `where: { name: tagName }` makes sure you only get the row with the desired tag. Since the queries are asynchronous, you will need to use `await` to fetch it. After receiving the data, you can use `.get()` on that object to grab the data. If no data is received, then you can tell the user that the query returned no data.
::: tip
In case you get an error saying `Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules`, find `execute(message, args, prefix)` in your command file and replace it with `async execute(message, args, prefix)`. <br>
P.S. Not recommended: use an `async` IIFE.
:::
## Editing a tag
Create an `edittag` command. The code for the command will be:
```js
const tagName = args[0];
const tagDescription = args[1];

// equivalent to: UPDATE tags (description) values (?) WHERE name='?';
const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
if (affectedRows > 0) {
	return message.channel.createMessage(`Tag ${tagName} was edited.`);
}
return message.channel.createMessage(`Could not find a tag with name ${tagName}.`);
```
It is possible to edit a record by using the `.update()` function. An update returns the number of rows that the `where` condition changed. Since you can only have tags with unique names, you do not have to worry about how many rows may change. Should you get that the query didn't alter any rows, you can conclude that the tag did not exist.
## Displaying a tag information
Create a `taginfo` command. Put the following code inside:
```js
const tagName = args[0];

// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
const tag = await Tags.findOne({ where: { name: tagName } });
if (tag) {
	return message.channel.createMessage(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
}
return message.channel.createMessage(`Could not find tag: ${tagName}`);
```
This section is very similar to the previous command, except you will be showing the tag metadata. `tag` contains your tag object. Notice two things: firstly, it is possible to access the object's properties without the `.get()` function. This is because the object is an instance of a Tag, which you can treat as an object and not just a row of data. Second, you can access a property that was not defined explicitly, `createdAt`. This is because Sequelize automatically adds that column to all tables. Passing another object into the model with `{ createdAt: false }` can disable this feature, but in this case, it was useful to have.
## Listing all tags
The next command will enable you to fetch a list of all the created tags.
```js
// equivalent to: SELECT name FROM tags;
const tagList = await Tags.findAll({ attributes: ['name'] });
const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
return message.channel.createMessage(`List of tags: ${tagString}`);
```

Here, you can use the `.findAll()` method to grab all the tag names. Notice that instead of having `where`, the optional field, `attributes`, is set. Setting attributes to name will let you get *only* the names of tags. If you tried to access other fields, like the tag author, you would get an error. If left blank, it will fetch *all* of the associated column data. It will not affect the results returned, but from a performance perspective, you should only grab the necessary data. If no results are returned, `tagString` will default to 'No tags set'.
## Deleting a tag
```js
const tagName = args[0];
// equivalent to: DELETE from tags WHERE name = ?;
const rowCount = await Tags.destroy({ where: { name: tagName } });
if (!rowCount) return message.channel.createMessage('That tag did not exist.');

return interaction.reply('Tag deleted.');
```
`.destroy()` runs the delete operation. The operation returns a count of the number of affected rows. If it returns with a value of 0, then nothing was deleted, and that tag did not exist in the database in the first place.
