
# Plumby

[![Build Status](https://travis-ci.org/bredele/plumby.png?branch=master)](https://travis-ci.org/bredele/plumby)

  Fast, unopinionated, minimalist and composable web framework for your [browser](#browser-support).  

```js
var plumby = require('plumby');
var app = plumby();

app.use(auth());
app.use(localstore());
app.use('settings', settings);
```

  You probably noticed `plumby` is deeply inspired by [express](https://github.com/visionmedia/express). As express, its clean and nice API provides a robust set of features to build scalable and maintainable application in a flash.

## Installation

  Install with [npm](http://nodejs.org):

    $ npm install plumby

  Install with [component](http://component.io):

    $ component install bredele/plumby

See [Documentation](https://github.com/bredele/plumby/wiki).

## Philosophy

  The Plumby philosophy is to reduce the complexity of your web application by splitting it into small and **self contained** modules (or apps). An app is highly extensible, configurable and communicates through event messages. 

  > Plumby is inspired by [Addy Osmany](http://addyosmani.com/largescalejavascript/) and [Nicholas Zakas](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture-2012) work.

  Its consistent interface makes developping a web application **as easy as playing to legos**. You can add, assemble or remove some apps, your application will never break. Most important, you can **[reuse](#ecosystem)** your apps in different projects and save some precious time!

  For example, a web application like Gmail would look like:

```js
var plumby = require('plumby');

plumby()
  .use(auth())
  .use(mail())
  .use(spam())
  .use(chat()); //reused in google hangout
```

## Ecosystem

  Plumby is also an ecosystem of plugins and apps. You can use apps to authenticate your apps, connect to an external service like Facebook or Twitter, store your data and way more in a single line of code. 

  See [wiki](https://github.com/bredele/plumby/wiki) for list of third plugins and apps.

  Because Plumby makes easy to expose and reuse third apps, you won't have to reinvent the wheel, do the same stuff all over again and could focus on what makes your application special.

## Features and Benefits

Features:

  - Event communication bus
  - Observable data store
  - Elegant dependencies injector
  - Lifecycle hooks
  - DOM and library agnostic
  - High test coverage
  - Support all mainstream browsers

At the opposite of many web framework, Plumby doesn't make the assumption an app is related to DOM. For example, an app can just process data from a server and be used in a worker.
It does not force you to use any libray or template engine. You are free to use whatever you want and to write the code you like. 

Actually, an app could use a view plugin piped to the app hooks and events. It makes a flexible and powerful solution to create user interfaces.

```js
var ui = plumby()

ui.use(view('hello', '#hello'));
ui.use(view('world', '#world'));
```

Benefits:

  - Loose coupling
  - Configurable
  - Highly extensible
  - hybrid (server side)
  - maintainable
  - reusable
  - scalable

## Browser Support

Store supports all mainstream browsers from IE7+.

## License

  The MIT License (MIT)

  Copyright (c) 2014 <Olivier Wietrich>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.