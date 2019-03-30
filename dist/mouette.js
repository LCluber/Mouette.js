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

const LEVELS = [
    { id: 1, name: 'info', color: '#28a745' },
    { id: 2, name: 'trace', color: '#17a2b8' },
    { id: 3, name: 'warn', color: '#ffc107' },
    { id: 4, name: 'error', color: '#dc3545' },
    { id: 99, name: 'off', color: null }
];

class Message {
    constructor(level, content) {
        this.level = level;
        this.content = content;
    }
    getLevelId() {
        return this.level.id;
    }
    display() {
        console[this.level.name]('%c' + this.content, 'color:' + this.level.color + ';');
    }
}

class Logger {
    set level(name) {
        Logger._level = Logger.isLevel(name) || Logger._level;
    }
    get level() {
        return Logger._level.name;
    }
    static info(text) {
        Logger.log('info', text);
    }
    static trace(text) {
        Logger.log('trace', text);
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
    static log(levelName, content) {
        Logger.addMessage(levelName, content);
        let message = this.messages[this.nbMessages - 1];
        if (this._level.id <= message.getLevelId()) {
            message.display();
        }
    }
    static addMessage(levelName, content) {
        this.messages.push(new Message(Logger.isLevel(levelName) || Logger._level, content));
        this.nbMessages++;
    }
    static isLevel(name) {
        return LEVELS.find((level) => level.name === name);
    }
}
Logger._level = LEVELS[0];
Logger.messages = [];
Logger.nbMessages = 0;
Logger.target = document.getElementById('Mouette');

export { Logger };
