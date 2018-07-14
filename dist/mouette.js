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

import { Dom } from 'weejs';

const LEVELS = [
    { id: 1, name: 'debug' },
    { id: 2, name: 'info' },
    { id: 3, name: 'time' },
    { id: 4, name: 'timeEnd' },
    { id: 5, name: 'warn' },
    { id: 6, name: 'error' },
    { id: 99, name: 'off' }
];

class Message {
    constructor(levelName, text) {
        this.setLevel(levelName);
        this.text = text;
        this.html = '<span class="' + this.level.name + '">' + this.text + '</span><br>';
    }
    setLevel(name) {
        this.level = this.findLevel(name);
    }
    getLevelId() {
        return this.level.id;
    }
    findLevel(name) {
        for (let level of LEVELS) {
            if (level.name === name) {
                return level;
            }
        }
        return this.level ? this.level : LEVELS[0];
    }
}

class Logger {
    set level(name) {
        Logger._level = Logger.findLevel(name);
    }
    get level() {
        return Logger._level.name;
    }
    static debug(text) {
        Logger.log('debug', text);
    }
    static info(text) {
        Logger.log('info', text);
    }
    static time(text) {
        Logger.log('time', text);
    }
    static warn(text) {
        Logger.log('warn', text);
    }
    static error(text) {
        Logger.log('error', text);
    }
    static log(levelName, text) {
        Logger.addMessage(levelName, text);
        Logger.logMessage();
    }
    static addMessage(levelName, text) {
        this.messages.push(new Message(levelName, text));
        this.nbMessages++;
    }
    static logMessage() {
        let message = this.messages[this.nbMessages - 1];
        if (this._level.id <= message.getLevelId()) {
            this.target.innerHTML += message.html;
        }
    }
    static findLevel(name) {
        for (let level of LEVELS) {
            if (level.name === name) {
                return level;
            }
        }
        return this._level ? this._level : LEVELS[0];
    }
}
Logger._level = Logger.findLevel(LEVELS[0].name);
Logger.messages = [];
Logger.nbMessages = 0;
Logger.target = Dom.findById('Mouette');

export { Logger };
