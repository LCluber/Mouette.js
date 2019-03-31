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

var Mouette = (function (exports) {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var LEVELS = {
    info: {
      id: 1,
      name: 'info',
      color: '#28a745'
    },
    trace: {
      id: 2,
      name: 'trace',
      color: '#17a2b8'
    },
    warn: {
      id: 3,
      name: 'warn',
      color: '#ffc107'
    },
    error: {
      id: 4,
      name: 'error',
      color: '#dc3545'
    },
    off: {
      id: 99,
      name: 'off',
      color: null
    }
  };

  var Message =
  /*#__PURE__*/
  function () {
    function Message(level, content) {
      this.id = level.id;
      this.name = level.name;
      this.color = level.color;
      this.content = content;
    }

    var _proto = Message.prototype;

    _proto.display = function display() {
      console[this.name]('%c' + this.content, 'color:' + this.color + ';');
    };

    return Message;
  }();

  var Logger =
  /*#__PURE__*/
  function () {
    function Logger() {}

    Logger.info = function info(message) {
      Logger.log(LEVELS.info, message);
    };

    Logger.trace = function trace(message) {
      Logger.log(LEVELS.trace, message);
    };

    Logger.warn = function warn(message) {
      Logger.log(LEVELS.warn, message);
    };

    Logger.error = function error(message) {
      Logger.log(LEVELS.error, message);
    };

    Logger.log = function log(level, messageContent) {
      var message = new Message(level, messageContent);
      this.messages.push(message);
      this.nbMessages++;

      if (this._level.id <= message.id) {
        message.display();
      }
    };

    _createClass(Logger, [{
      key: "level",
      set: function set(name) {
        Logger._level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : LEVELS.info;
      },
      get: function get() {
        return Logger._level.name;
      }
    }]);

    return Logger;
  }();
  Logger._level = LEVELS.info;
  Logger.messages = [];
  Logger.nbMessages = 0;

  exports.Logger = Logger;

  return exports;

}({}));
