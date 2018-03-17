import { LEVELS } from './mock-levels';
import { Message } from './message';
var Logger = (function () {
    function Logger() {
    }
    Object.defineProperty(Logger.prototype, "level", {
        get: function () {
            return Logger._level.name;
        },
        set: function (name) {
            Logger._level = Logger.findLevel(name);
        },
        enumerable: true,
        configurable: true
    });
    Logger.debug = function (text) {
        Logger.log('debug', text);
    };
    Logger.info = function (text) {
        Logger.log('info', text);
    };
    Logger.time = function (text) {
        Logger.log('time', text);
    };
    Logger.warn = function (text) {
        Logger.log('warn', text);
    };
    Logger.error = function (text) {
        Logger.log('error', text);
    };
    Logger.log = function (levelName, text) {
        Logger.addMessage(levelName, text);
        Logger.logMessage();
    };
    Logger.addMessage = function (levelName, text) {
        this.messages.push(new Message(levelName, text));
        this.nbMessages++;
    };
    Logger.logMessage = function () {
        var message = this.messages[this.nbMessages - 1];
        if (this._level.id <= message.getLevelId()) {
            this.target.innerHTML += message.html;
        }
    };
    Logger.findLevel = function (name) {
        for (var _i = 0, LEVELS_1 = LEVELS; _i < LEVELS_1.length; _i++) {
            var level = LEVELS_1[_i];
            if (level.name === name) {
                return level;
            }
        }
        return this._level ? this._level : LEVELS[0];
    };
    Logger.findDOMElementById = function (id) {
        return document.getElementById(id);
    };
    Logger._level = Logger.findLevel(LEVELS[0].name);
    Logger.messages = [];
    Logger.nbMessages = 0;
    Logger.target = Logger.findDOMElementById('Mouette');
    return Logger;
}());
export { Logger };
//# sourceMappingURL=mouette.js.map