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
    info: { id: 1, name: 'info', color: '#28a745' },
    trace: { id: 2, name: 'trace', color: '#17a2b8' },
    warn: { id: 3, name: 'warn', color: '#ffc107' },
    error: { id: 4, name: 'error', color: '#dc3545' },
    off: { id: 99, name: 'off', color: null }
};

class Message {
    constructor(level, content) {
        this.id = level.id;
        this.name = level.name;
        this.color = level.color;
        this.content = content;
    }
    display() {
        console[this.name]('%c' + this.content, 'color:' + this.color + ';');
    }
}

class Logger {
    set level(name) {
        Logger._level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : LEVELS.info;
    }
    get level() {
        return Logger._level.name;
    }
    static info(text) {
        Logger.log(LEVELS.info, text);
    }
    static trace(text) {
        Logger.log(LEVELS.trace, text);
    }
    static warn(text) {
        Logger.log(LEVELS.warn, text);
    }
    static error(text) {
        Logger.log(LEVELS.error, text);
    }
    static log(level, content) {
        let message = new Message(level, content);
        this.messages.push(message);
        this.nbMessages++;
        if (this._level.id <= message.id) {
            message.display();
        }
    }
}
Logger._level = LEVELS.info;
Logger.messages = [];
Logger.nbMessages = 0;

export { Logger };
