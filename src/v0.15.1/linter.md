# Setting up a Linter (Optional)

As a developer, it's a good idea to make your development process as streamlined as possible. Installing and utilizing the right tools is an essential part of any project you're working on. Although it's not required, installing a linter will help you immensely. <br>
The linter we are going to use (if you are going to use it, that is) is [ESLint](https://eslint.org/). You can read more about it on its official website.

# Installing/Using a proper code editor
First, you will need a proper code editor. Using Notepad and Notepad++ is discouraged, as they're inefficient for projects like these. If you are using either, it's advised to switch to save everyone lots of headaches and unnecessary syntax error questions.<br>
A few good ones are:
- [Visual Studio Code](https://code.visualstudio.com/) is a prevalent choice; it is known for being fast and powerful. It supports various languages, has a terminal, built-in IntelliSense support, and autocomplete for both JavaScript and TypeScript.
- [Atom](https://atom.io/) is user-friendly, concise, easy to navigate, and also has loads of helpful extensions. It's open source, and hackable and very customizable. This is what many developers use to get started.
- [Sublime Text](https://www.sublimetext.com/) is another popular editor that's easy to use and write code with. It's light and starts up very quickly, unlike VS Code and Atom. The only downside is that it is paid, but has an unlimited trial period (some features will remain locked when using the trial version).

# Installing the linter
One of the significant advantages proper code editors have over Notepad and Notepad++ is their ability to use linters. Linters check syntax and help you produce consistent code that follows specific style rules that you can define yourself if you choose to do so. They help form good habits if you stick to a single configuration. When you start using a linter, you might see many errors–this is normal and perfectly fine. It might be a pain to get through during the initial process, but it's most definitely worth it.
<br>
Now, install ESLint:
```bash
npm i -D eslint
# OR
yarn add -D eslint
```

Afterward, install the appropriate plugin(s) for your editor of choice.
- [ESLint for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [ESLint for Atom](https://atom.io/packages/linter-eslint) (requires [Linter for Atom](https://atom.io/packages/linter))
- [ESLint for Sublime Text](https://packagecontrol.io/packages/ESLint)
::: tip
You can install each of these directly inside the editors themselves. For Visual Studio Code, press `Ctrl + Shift + X`. For Atom, press `Ctrl + ,` and click on "Install". For Sublime, press `Ctrl + Shift + P` and search for "Install Package" (available via [Package Control](https://packagecontrol.io/installation)). After that, you may then search for the appropriate plugin and install it.
:::

# Setting up ESLint rules
ESLint may display many warnings and errors about your code when you start using it but don't let this startle you. To get started, follow these steps:

- Create a file in your root directory named `.eslintrc.json` (where your main project file is).
- Set some rules inside the `JSON` file (you can view the rules [here](https://eslint.org/docs/rules/))
- Here is the boilerplate code for the `eslintrc.json` file:
```json
{
	"extends": "eslint:recommended",
	"env": {
		"node": true,
		"es6": true
	},
	"parserOptions": {
		"ecmaVersion": 2019
	},
	"rules": {

	}
}
```
You just need to plonk the rules inside `"rules": {}`.
An example `eslintrc.json` file (complete with rules):
```json{11-45}
{
	"extends": "eslint:recommended",
	"env": {
		"node": true,
		"es6": true
	},
	"parserOptions": {
		"ecmaVersion": 2021
	},
	"rules": {
		"brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
		"comma-dangle": ["error", "always-multiline"],
		"comma-spacing": "error",
		"comma-style": "error",
		"curly": ["error", "multi-line", "consistent"],
		"dot-location": ["error", "property"],
		"handle-callback-err": "off",
		"indent": ["error", "tab"],
		"max-nested-callbacks": ["error", { "max": 4 }],
		"max-statements-per-line": ["error", { "max": 2 }],
		"no-console": "off",
		"no-empty-function": "error",
		"no-floating-decimal": "error",
		"no-inline-comments": "error",
		"no-lonely-if": "error",
		"no-multi-spaces": "error",
		"no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1, "maxBOF": 0 }],
		"no-shadow": ["error", { "allow": ["err", "resolve", "reject"] }],
		"no-trailing-spaces": ["error"],
		"no-var": "error",
		"object-curly-spacing": ["error", "always"],
		"prefer-const": "error",
		"quotes": ["error", "single"],
		"semi": ["error", "always"],
		"space-before-blocks": "error",
		"space-before-function-paren": ["error", {
			"anonymous": "never",
			"named": "never",
			"asyncArrow": "always"
		}],
		"space-in-parens": "error",
		"space-infix-ops": "error",
		"space-unary-ops": "error",
		"spaced-comment": "error",
		"yoda": "error"
	}
}
```
The major points of this setup would be:

- Allowing you to debug with `console.log()`;
- Prefer using `const` over `let` or `var`, as well as disallow `var`;
- Disapproving of variables with the same name in callbacks;
- Requiring single quotes over double quotes;
- Requiring semicolons. While not required in JavaScript, it's considered one of the most common best practices to follow;
- Requiring accessing properties to be on the same line;
- Requiring indenting to be done with tabs;
- Limiting nested callbacks to 4. If you hit this error, it is a good idea to consider refactoring your code.

Again, this is just an example, so if the rules above doesn't fit you well, feel free to change them.
