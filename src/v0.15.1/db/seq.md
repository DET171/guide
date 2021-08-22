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
After you have installed Sequelize, open your `index.js` file.
