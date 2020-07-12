/** MIT License
* 
* Copyright (c) 2017 Ludovic CLUBER 
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* http://mouettejs.lcluber.com
*/

import { HTTP } from '@lcluber/aiasjs';
import { isBoolean } from '@lcluber/chjs';

const LEVELS = {
    info: { id: 1, name: "info", color: "#28a745" },
    time: { id: 2, name: "time", color: "#28a745" },
    trace: { id: 4, name: "trace", color: "#17a2b8" },
    warn: { id: 5, name: "warn", color: "#ffc107" },
    error: { id: 6, name: "error", color: "#dc3545" },
    off: { id: 99, name: "off", color: null }
};

class Options {
    constructor(levelName, console, maxLength) {
        this._level = LEVELS.error;
        this._console = true;
        this._maxLength = 200;
        this.level = levelName ? levelName : "error";
        this.console = isBoolean(console) ? console : this.console;
        this.maxLength = maxLength ? maxLength : this.maxLength;
    }
    set level(name) {
        this._level = LEVELS.hasOwnProperty(name)
            ? LEVELS[name]
            : this._level;
    }
    get level() {
        return this._level.name;
    }
    set console(display) {
        this._console = display ? true : false;
    }
    get console() {
        return this._console;
    }
    set maxLength(length) {
        this._maxLength = length > 50 ? length : 50;
    }
    get maxLength() {
        return this._maxLength;
    }
    displayMessage(messageId) {
        return this._console && this._level.id <= messageId;
    }
}

function addZero(value) {
    return value < 10 ? "0" + value : value;
}
function formatDate() {
    const now = new Date();
    const date = [
        addZero(now.getMonth() + 1),
        addZero(now.getDate()),
        now
            .getFullYear()
            .toString()
            .substr(-2)
    ];
    const time = [
        addZero(now.getHours()),
        addZero(now.getMinutes()),
        addZero(now.getSeconds())
    ];
    return date.join("/") + " " + time.join(":");
}

class Log {
    constructor(level, content) {
        this.id = level.id;
        this.name = level.name;
        this.color = level.color;
        this.content = content;
        this.date = formatDate();
    }
    display(groupName) {
        let name = this.name;
        if (name === "time") {
            name = "info";
        }
        console[name]("%c[" + groupName + "] " + this.date + " : ", "color:" + this.color + ";", this.content);
    }
}

class Timer {
    constructor(key) {
        this.key = key;
        this.timestamp = new Date().getTime();
    }
}

class Group {
    constructor(name, level) {
        this.name = name;
        this.logs = [];
        this.timers = [];
        this.options = new Options(level);
    }
    setLevel(name) {
        this.options.level = name;
        return this.options.level;
    }
    getLevel() {
        return this.options.level;
    }
    displayConsole(value) {
        this.options.console = value;
        return this.options.console;
    }
    info(log) {
        this.log(LEVELS.info, log);
    }
    trace(log) {
        this.log(LEVELS.trace, log);
    }
    time(key) {
        let index = this.timers.findIndex(element => element.key === key);
        if (index > -1) {
            let newTimestamp = new Date().getTime();
            let delta = newTimestamp - this.timers[index].timestamp;
            this.log(LEVELS.time, key + " completed in " + delta + " ms");
            this.timers.splice(index, 1);
        }
        else {
            this.addTimer(key);
            this.log(LEVELS.time, key + " started");
        }
    }
    warn(log) {
        this.log(LEVELS.warn, log);
    }
    error(log) {
        this.log(LEVELS.error, log);
    }
    initLogs() {
        this.logs = [];
    }
    log(level, log) {
        const message = new Log(level, log);
        this.addLog(message);
        if (this.options.displayMessage(message.id)) {
            message.display(this.name);
        }
    }
    addLog(message) {
        if (this.logs.length >= this.options.maxLength) {
            this.logs.shift();
        }
        this.logs.push(message);
    }
    addTimer(key) {
        if (this.timers.length >= this.options.maxLength) {
            this.timers.shift();
        }
        this.timers.push(new Timer(key));
    }
}

class Logger {
    static setLevel(name) {
        this.options.level = name;
        for (const group of this.groups) {
            group.setLevel(this.options.level);
        }
        return this.getLevel();
    }
    static getLevel() {
        return this.options.level;
    }
    static getGroup(name) {
        for (const group of this.groups) {
            if (group.name === name) {
                return group;
            }
        }
        return null;
    }
    static displayConsole(value) {
        this.options.console = value;
        for (const group of this.groups) {
            group.displayConsole(this.options.console);
        }
        return this.options.console;
    }
    static addGroup(name) {
        return this.getGroup(name) || this.createGroup(name);
    }
    static sendLogs(url, headers) {
        let logs = [];
        if (headers) {
            HTTP.setHeaders("POST", headers);
        }
        for (const group of this.groups) {
            logs.push(...group.logs);
        }
        return HTTP.post(url, "json", logs)
            .then(response => {
            for (const group of this.groups) {
                group.initLogs();
            }
            return response;
        })
            .catch(err => {
            console.log("error", err);
            return err;
        });
    }
    static createGroup(name) {
        const group = new Group(name, this.options.level);
        this.groups.push(group);
        return group;
    }
}
Logger.groups = [];
Logger.options = new Options();

export { Logger };
