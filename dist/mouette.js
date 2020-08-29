/** MIT License
* 
* Copyright (c) 2015 Ludovic CLUBER 
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

const LEVELS = {
    info: { id: 1, name: "info", color: "#28a745" },
    trace: { id: 2, name: "trace", color: "#17a2b8" },
    warn: { id: 3, name: "warn", color: "#ffc107" },
    error: { id: 4, name: "error", color: "#dc3545" },
    off: { id: 99, name: "off", color: null }
};

class Message {
    constructor(level, content) {
        this.id = level.id;
        this.name = level.name;
        this.color = level.color;
        this.content = content;
        this.date = Message.formatDate();
    }
    display(groupName) {
        console[this.name]("%c[" + groupName + "] " + this.date + " : ", "color:" + this.color + ";", this.content);
    }
    static addZero(value) {
        return value < 10 ? "0" + value : value;
    }
    static formatDate() {
        const now = new Date();
        const date = [
            Message.addZero(now.getMonth() + 1),
            Message.addZero(now.getDate()),
            now
                .getFullYear()
                .toString()
                .substr(-2)
        ];
        const time = [
            Message.addZero(now.getHours()),
            Message.addZero(now.getMinutes()),
            Message.addZero(now.getSeconds())
        ];
        return date.join("/") + " " + time.join(":");
    }
}

class Group {
    constructor(name, level) {
        this.messages = [];
        this.name = name;
        this.messages = [];
        this.level = level;
    }
    setLevel(name) {
        this.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : this.level;
        return this.getLevel();
    }
    getLevel() {
        return this.level.name;
    }
    info(message) {
        this.log(LEVELS.info, message);
    }
    trace(message) {
        this.log(LEVELS.trace, message);
    }
    warn(message) {
        this.log(LEVELS.warn, message);
    }
    error(message) {
        this.log(LEVELS.error, message);
    }
    log(level, messageContent) {
        const message = new Message(level, messageContent);
        this.messages.push(message);
        if (this.level.id <= message.id) {
            message.display(this.name);
        }
    }
}

class Logger {
    static setLevel(name) {
        Logger.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : Logger.level;
        for (const group of Logger.groups) {
            group.setLevel(Logger.level.name);
        }
        return Logger.getLevel();
    }
    static getLevel() {
        return Logger.level.name;
    }
    static getGroup(name) {
        for (const group of Logger.groups) {
            if (group.name === name) {
                return group;
            }
        }
        return null;
    }
    static addGroup(name) {
        return this.getGroup(name) || this.pushGroup(name);
    }
    static pushGroup(name) {
        const group = new Group(name, Logger.level);
        Logger.groups.push(group);
        return group;
    }
}
Logger.level = LEVELS.error;
Logger.groups = [];

export default Logger;
