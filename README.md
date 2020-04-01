# mix-it-up-api

![npm](https://img.shields.io/npm/v/mix-it-up-api)
![npm bundle size](https://img.shields.io/bundlephobia/min/mix-it-up-api)
![npm](https://img.shields.io/npm/dt/mix-it-up-api)
![NPM](https://img.shields.io/npm/l/mix-it-up-api)

> Simplifies calling the devAPI of Mix It Up with TypeScript

This package makes it easier to call the devAPI of Mix It Up such as running a command using [TypeScript](http://www.typescriptlang.org/). It wraps the popular [web-request](https://www.npmjs.com/package/web-request) package, extending it with an interface for [Mix It Up](https://mixitupapp.com/).

## Examples

Get user data by username...
```js
const client = new MixItUpClient();

client.users.getUserByName("D4ddy-LiLd4rk")
  .then(user => {
    console.log(user);
  })
  .catch(err => {
    console.log(err);
  });
```

Send a message to the chat...
```js
const client = new MixItUpClient();

client.chat.sendChatMessage("Greetings to the chat!", false)
  .catch(err => {
    console.log(err);
  });
```

Run the requested command...
```js
const client = new MixItUpClient();

client.commands.runCommandByID("YOUR-COMMAND-ID")
  .catch(err => {
    console.log(err);
  });
```

## Getting Started

Make sure you're running Node v13 and TypeScript 3.7 or higher...
```
$ node -v
v13.11.0
$ npm install -g typescript tsd
$ tsc -v
Version 3.7.5
```

Install the *mix-it-up-api* package and the typings definitions for Node.js...
```
$ npm install mix-it-up-api
$ tsd install node
```

Write some code...
```js
import * as MixItUpClient from "mix-it-up-api";

const client = new MixItUpClient();

client.users.getUserByName("D4ddy-LiLd4rk")
  .then(user => {
    console.log(user);
  })
  .catch(err => {
    console.log(err);
  });
```

Save the above to a file (index.ts), build and run it!
```
$ tsc index.ts typings/node/node.d.ts --target es6 --module commonjs
$ node index.js
<!doctype html><html ...
```

To use the sample with your own account, do the following steps:

* Head over to Streamloots: https://mixitupapp.com/#download

* Install Mix it Up

* Log in with your Mixer Account

* Go to Services

  ![Services](https://i.imgur.com/Xza5kPr.png)

* Open the Developer API Panel and hit that "Enable" Button.

  ![Enable devAPI](https://i.imgur.com/6Bx4XH0.png)

* Call the devAPI from your code!

Special Thanks to [SaviorXTanren](https://saviorxtanren.github.io/mixer-mixitup/#section/Introduction) for his work on the Chatbot and his Documentation of this devAPI over on GitHub.