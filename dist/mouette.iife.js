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

  var LEVELS = [{
    id: 1,
    name: 'info',
    color: '#28a745'
  }, {
    id: 2,
    name: 'trace',
    color: '#17a2b8'
  }, {
    id: 3,
    name: 'warn',
    color: '#ffc107'
  }, {
    id: 4,
    name: 'error',
    color: '#dc3545'
  }, {
    id: 99,
    name: 'off',
    color: null
  }];

  var Message =
  /*#__PURE__*/
  function () {
    function Message(levelName, content) {
      this.setLevel(levelName);
      this.content = content;
    }

    var _proto = Message.prototype;

    _proto.setLevel = function setLevel(name) {
      this.level = this.findLevel(name);
    };

    _proto.getLevelId = function getLevelId() {
      return this.level.id;
    };

    _proto.display = function display() {
      console[this.level.name]('%c' + this.content, 'color:' + this.level.color + ';');
    };

    _proto.findLevel = function findLevel(name) {
      for (var _iterator = LEVELS, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var level = _ref;

        if (level.name === name) {
          return level;
        }
      }

      return this.level ? this.level : LEVELS[0];
    };

    return Message;
  }();

  var Logger =
  /*#__PURE__*/
  function () {
    function Logger() {}

    Logger.info = function info(text) {
      Logger.log('info', text);
    };

    Logger.trace = function trace(text) {
      Logger.log('trace', text);
    };

    Logger.time = function time(text) {
      Logger.log('time', text);
    };

    Logger.warn = function warn(text) {
      Logger.log('warn', text);
    };

    Logger.error = function error(text) {
      Logger.log('error', text);
    };

    Logger.log = function log(levelName, content) {
      Logger.addMessage(levelName, content);
      var message = this.messages[this.nbMessages - 1];

      if (this._level.id <= message.getLevelId()) {
        message.display();
      }
    };

    Logger.addMessage = function addMessage(levelName, content) {
      this.messages.push(new Message(levelName, content));
      this.nbMessages++;
    };

    Logger.findLevel = function findLevel(name) {
      for (var _iterator = LEVELS, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var level = _ref;

        if (level.name === name) {
          return level;
        }
      }

      return this._level ? this._level : LEVELS[0];
    };

    _createClass(Logger, [{
      key: "level",
      set: function set(name) {
        Logger._level = Logger.findLevel(name);
      },
      get: function get() {
        return Logger._level.name;
      }
    }]);

    return Logger;
  }();
  Logger._level = Logger.findLevel(LEVELS[0].name);
  Logger.messages = [];
  Logger.nbMessages = 0;
  Logger.target = document.getElementById('Mouette');

  exports.Logger = Logger;

  return exports;

}({}));
