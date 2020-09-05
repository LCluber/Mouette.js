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

Logger.setLevel("error");

let newLogsGroup: Group = Logger.addGroup("newLogsGroup");

newLogsGroup.setLevel("info");

newLogsGroup.displayConsole(false); // do not display logs of the group into console

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

var logs = Logger.getLogs(); // get all logs into 1 array

console.log(logs); // Logs every log into console

Logger.resetLogs(); // reset all Logs

console.log(Logger.getLogs()); // logs are empty


```

### IIFE

```html
<script src="node-modules/@lcluber/mouettejs/dist/mouette.iife.min.js"></script>
```

```javascript
Mouette.Logger.setLevel("error");

var newLogsGroup = Mouette.Logger.addGroup("newLogsGroup");

newLogsGroup.setLevel("info");
newLogsGroup.displayConsole(false); // do not display logs of the group into console

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

var logs = Mouette.Logger.getLogs(); // get all logs into 1 array

console.log(logs); // Logs every log into console

Mouette.Logger.resetLogs(); // reset all Logs

console.log(Mouette.Logger.getLogs()); // logs are empty

```

## API Reference

```javascript
type LevelName = "info" | "time" | "trace" | "warn" | "error" | "off";
type LogContent = string | number | any[] | Object;

static Logger.setLevel(name: LevelName): LevelName {} // set the minimum level at which logs can be stored and displayed into console. Note that this setting will propagate to every group. You can set a different level for a group AFTER setting the level for the entire logger.
static Logger.getLevel(): LevelName {} // get the general level of the logger. Note that groups can have a different level if changed afterwards at group level
static Logger.displayConsole(value: boolean): boolean {} // set wether or not to display logs into console at logger level. Note that this setting will propagate to every group. This option can be changed individually for each group if changed afterwards at group level
static Logger.addGroup(name: string): Group {} // create a new group of logs
static Logger.getLogs(): Log[] {} // get all the kigs as an array
static Logger.resetLogs(): void {} // Delete every logs of every group 

Group.setLevel(name: LevelName): levelName {} // set the minimum level at which logs of this group can be stored and displayed into console
Group.getLevel(): LevelName {} // get the level at which logs of this group can be displayed
Group.displayConsole(value: boolean): boolean {} // set wether or not to display logs into console
Group.setMaxLength(length: number): number {} // set the maximum quantity of logs stored by this group
Group.getMaxLength(): number {} // get the maximum quantity of logs stored by this group

Group.info(log: LogContent): void {} // create an info log
Group.time(key: string | number): void {} // create a time log. Use the same method to start or stop the timer. Using the same key, first call will start it, second call will stop it and return the elapsed time between the two.
Group.trace(log: LogContent): void {} // create a trace log
Group.warn(log: LogContent): void {} // create a warn log
Group.error(log: LogContent): void {} // create an error log

LEVELS: Levels = {
  info:   { id:  1, name: "info",  color: "#28a745" },
  time:   { id:  2, name: "time",  color: "#28a745" },
  trace:  { id:  3, name: "trace", color: "#17a2b8" },
  warn:   { id:  4, name: "warn",  color: "#ffc107" },
  error:  { id:  5, name: "error", color: "#dc3545" },
  off:    { id: 99, name: "off",   color: null }
};

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
