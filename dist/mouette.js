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

(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define([ "exports" ], factory) : factory(global.MOUETTE = {});
})(this, function(exports) {
    "use strict";
    var LEVELS = [ {
        id: 1,
        name: "debug"
    }, {
        id: 2,
        name: "info"
    }, {
        id: 3,
        name: "time"
    }, {
        id: 4,
        name: "timeEnd"
    }, {
        id: 5,
        name: "warn"
    }, {
        id: 6,
        name: "error"
    }, {
        id: 99,
        name: "off"
    } ];
    var Message = function() {
        function Message(levelName, text) {
            this.setLevel(levelName);
            this.text = text;
            this.html = '<span class="' + this.level.name + '">' + this.text + "</span><br>";
        }
        Message.prototype.setLevel = function(name) {
            this.level = this.findLevel(name);
        };
        Message.prototype.getLevelId = function() {
            return this.level.id;
        };
        Message.prototype.findLevel = function(name) {
            for (var _i = 0, LEVELS_1 = LEVELS; _i < LEVELS_1.length; _i++) {
                var level = LEVELS_1[_i];
                if (level.name === name) {
                    return level;
                }
            }
            return this.level ? this.level : LEVELS[0];
        };
        return Message;
    }();
    var Logger = function() {
        function Logger() {}
        Object.defineProperty(Logger.prototype, "level", {
            get: function() {
                return Logger._level.name;
            },
            set: function(name) {
                Logger._level = Logger.findLevel(name);
            },
            enumerable: true,
            configurable: true
        });
        Logger.debug = function(text) {
            Logger.log("debug", text);
        };
        Logger.info = function(text) {
            Logger.log("info", text);
        };
        Logger.time = function(text) {
            Logger.log("time", text);
        };
        Logger.warn = function(text) {
            Logger.log("warn", text);
        };
        Logger.error = function(text) {
            Logger.log("error", text);
        };
        Logger.log = function(levelName, text) {
            Logger.addMessage(levelName, text);
            Logger.logMessage();
        };
        Logger.addMessage = function(levelName, text) {
            this.messages.push(new Message(levelName, text));
            this.nbMessages++;
        };
        Logger.logMessage = function() {
            var message = this.messages[this.nbMessages - 1];
            if (this._level.id <= message.getLevelId()) {
                this.target.innerHTML += message.html;
            }
        };
        Logger.findLevel = function(name) {
            for (var _i = 0, LEVELS_1 = LEVELS; _i < LEVELS_1.length; _i++) {
                var level = LEVELS_1[_i];
                if (level.name === name) {
                    return level;
                }
            }
            return this._level ? this._level : LEVELS[0];
        };
        Logger.findDOMElementById = function(id) {
            return document.getElementById(id);
        };
        Logger._level = Logger.findLevel(LEVELS[0].name);
        Logger.messages = [];
        Logger.nbMessages = 0;
        Logger.target = Logger.findDOMElementById("Mouette");
        return Logger;
    }();
    exports.Logger = Logger;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});