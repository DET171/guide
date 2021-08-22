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
