## Synopsis

**Mouette.js** is a lightweight logger written in Typescript.

## Motivation

The purpose of this library is to provide a simple and easy way to log infos throughout your code.

## Installation

### NPM

```bash
$ npm install @lcluber/mouettejs
```

### Yarn

```bash
$ yarn add @lcluber/mouettejs
```

## Usage

### ES6

```javascript
import { Logger, Group } from "@lcluber/mouettejs";

//set log level
//Logs everything >= info
Logger.setLevel("info");

let newLogsGroup: Group = Logger.addGroup("newLogsGroup");
newLogsGroup.info(window);
newLogsGroup.trace(window);
newLogsGroup.warn(window);
newLogsGroup.error(window);

newLogsGroup.time("timing log");
for (i = 0; i < 100000; i++) {
  // some code
}
newLogsGroup.time("timing log");

Logger.setLevel("off");
```

### IIFE

```html
<script src="node-modules/@lcluber/mouettejs/dist/mouette.iife.min.js"></script>
```

```javascript
//set log level
//Logs everything >= info
Mouette.Loggler.setLevel("info");

var newLogsGroup = Mouette.Logger.addGroup("newLogsGroup");
newLogsGroup.info(window);
newLogsGroup.trace(window);
newLogsGroup.warn(window);
newLogsGroup.error(window);

newLogsGroup.time("timing log");
for (i = 0; i < 100000; i++) {
  // some code
}
newLogsGroup.time("timing log");

newLogsGroup.setLevel("off");
```

## API Reference

```javascript
static Logger.setLevel(name: 'info' | 'time' | 'trace' | 'warn' | 'error' | 'off'): LevelNames {}
static Logger.getLevel(): LevelNames {}
static Logger.displayConsole(value: boolean): boolean {}
static Logger.getGroup(name: string): Group|null {}
static Logger.addGroup(name: string): Group {}
static Logger.sendLogs(url: string, headers?: HTTPHeaders): Promise<any> {}

Group.level = 'info' | 'time' | 'trace' | 'warn' | 'error' | 'off';
Group.info(message: string|number|any[]|Object): void {}
Group.time(key: string | number): void {}
Group.trace(message: string|number|any[]|Object): void {}
Group.warn(message: string|number|any[]|Object): void {}
Group.error(message: string|number|any[]|Object): void {}

Group.setLevel(name: 'info' | 'time' | 'trace' | 'warn' | 'error' | 'off'): LevelNames {}
Group.getLevel(): LevelNames {}
Group.displayConsole(value: boolean): boolean {}

```

## Tests

No tests to run yet

## Contributors

There is still a lot of work to do on this project and I would be glad to get all the help you can provide.
To contribute you can clone the project on **[GitHub](https://github.com/LCluber/Mouette.js)** and see **NOTICE.md** for detailed installation walkthrough of the project.

## License

MIT License

Copyright (c) 2017 Ludovic CLUBER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
