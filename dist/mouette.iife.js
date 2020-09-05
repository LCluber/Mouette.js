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

  /** MIT License
   *
   * Copyright (c) 2009 Ludovic CLUBER
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice (including the next
   * paragraph) shall be included in all copies or substantial portions of the
   * Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   * https://github.com/LCluber/Ch.js
   */
  function isBoolean(bool) {
    return typeof bool === "boolean";
  }

  var LEVELS = {
    info: {
      id: 1,
      name: "info",
      color: "#28a745"
    },
    time: {
      id: 2,
      name: "time",
      color: "#28a745"
    },
    trace: {
      id: 3,
      name: "trace",
      color: "#17a2b8"
    },
    warn: {
      id: 4,
      name: "warn",
      color: "#ffc107"
    },
    error: {
      id: 5,
      name: "error",
      color: "#dc3545"
    },
    off: {
      id: 99,
      name: "off",
      color: null
    }
  };

  var Options =
  /*#__PURE__*/
  function () {
    function Options(levelName, console, maxLength) {
      this._level = "error";
      this._console = true;
      this._maxLength = 200;
      this.level = levelName ? levelName : this._level;
      this.console = isBoolean(console) ? console : this._console;
      this.maxLength = maxLength ? maxLength : this.maxLength;
    }

    var _proto = Options.prototype;

    _proto.displayMessage = function displayMessage(messageId) {
      return this._console && LEVELS[this._level].id <= messageId;
    };

    _createClass(Options, [{
      key: "level",
      set: function set(name) {
        this._level = LEVELS.hasOwnProperty(name) ? name : this._level;
      },
      get: function get() {
        return this._level;
      }
    }, {
      key: "console",
      set: function set(display) {
        this._console = display ? true : false;
      },
      get: function get() {
        return this._console;
      }
    }, {
      key: "maxLength",
      set: function set(length) {
        this._maxLength = length > 50 ? length : 50;
      },
      get: function get() {
        return this._maxLength;
      }
    }]);

    return Options;
  }();

  var Log =
  /*#__PURE__*/
  function () {
    function Log(level, content) {
      this.id = level.id;
      this.name = level.name;
      this.color = level.color;
      this.content = content;
      this.date = Log.formatDate();
    }

    var _proto = Log.prototype;

    _proto.display = function display(groupName) {
      var name = this.name === "time" ? "info" : this.name;
      console[name]("%c[" + groupName + "] " + this.date + " : ", "color:" + this.color + ";", this.content);
    };

    Log.addZero = function addZero(value) {
      return value < 10 ? "0" + value : value;
    };

    Log.formatDate = function formatDate() {
      var now = new Date();
      var date = [Log.addZero(now.getMonth() + 1), Log.addZero(now.getDate()), now.getFullYear().toString().substr(-2)];
      var time = [Log.addZero(now.getHours()), Log.addZero(now.getMinutes()), Log.addZero(now.getSeconds())];
      return date.join("/") + " " + time.join(":");
    };

    return Log;
  }();

  var Timer = function Timer(key) {
    this.key = key;
    this.timestamp = new Date().getTime();
  };

  var Group =
  /*#__PURE__*/
  function () {
    function Group(name, options) {
      this.name = name;
      this.logs = [];
      this.timers = [];
      this.options = new Options(options.level, options.console, options.maxLength);
    }

    var _proto = Group.prototype;

    _proto.setLevel = function setLevel(name) {
      this.options.level = name;
      return this.options.level;
    };

    _proto.getLevel = function getLevel() {
      return this.options.level;
    };

    _proto.displayConsole = function displayConsole(value) {
      this.options.console = value;
      return this.options.console;
    };

    _proto.setMaxLength = function setMaxLength(length) {
      this.options.maxLength = length;
      return this.options.maxLength;
    };

    _proto.getMaxLength = function getMaxLength() {
      return this.options.maxLength;
    };

    _proto.info = function info(log) {
      this.log(LEVELS.info, log);
    };

    _proto.trace = function trace(log) {
      this.log(LEVELS.trace, log);
    };

    _proto.time = function time(key) {
      var index = this.timers.findIndex(function (element) {
        return element.key === key;
      });

      if (index > -1) {
        var newTimestamp = new Date().getTime();
        var delta = newTimestamp - this.timers[index].timestamp;
        this.log(LEVELS.time, key + " completed in " + delta + " ms");
        this.timers.splice(index, 1);
      } else {
        this.addTimer(key);
        this.log(LEVELS.time, key + " started");
      }
    };

    _proto.warn = function warn(log) {
      this.log(LEVELS.warn, log);
    };

    _proto.error = function error(log) {
      this.log(LEVELS.error, log);
    };

    _proto.resetLogs = function resetLogs() {
      this.logs = [];
    };

    _proto.log = function log(level, _log) {
      var message = new Log(level, _log);

      if (this.options.displayMessage(message.id)) {
        this.addLog(message);
        message.display(this.name);
      }
    };

    _proto.addLog = function addLog(message) {
      if (this.logs.length >= this.options.maxLength) {
        this.logs.shift();
      }

      this.logs.push(message);
    };

    _proto.addTimer = function addTimer(key) {
      if (this.timers.length >= this.options.maxLength) {
        this.timers.shift();
      }

      this.timers.push(new Timer(key));
    };

    return Group;
  }();

  var Logger =
  /*#__PURE__*/
  function () {
    function Logger() {}

    Logger.setLevel = function setLevel(name) {
      this.options.level = name;

      for (var _iterator = this.groups, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var group = _ref;
        group.setLevel(this.options.level);
      }

      return this.getLevel();
    };

    Logger.getLevel = function getLevel() {
      return this.options.level;
    };

    Logger.displayConsole = function displayConsole(value) {
      this.options.console = value;

      for (var _iterator2 = this.groups, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var group = _ref2;
        group.displayConsole(this.options.console);
      }

      return this.options.console;
    };

    Logger.addGroup = function addGroup(name) {
      return this.getGroup(name) || this.createGroup(name);
    };

    Logger.getLogs = function getLogs() {
      var logs = [];

      for (var _iterator3 = this.groups, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var group = _ref3;
        logs.push.apply(logs, group.logs);
      }

      return logs;
    };

    Logger.resetLogs = function resetLogs() {
      for (var _iterator4 = this.groups, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref4 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref4 = _i4.value;
        }

        var group = _ref4;
        group.resetLogs();
      }
    };

    Logger.getGroup = function getGroup(name) {
      for (var _iterator5 = this.groups, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref5 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref5 = _i5.value;
        }

        var group = _ref5;

        if (group.name === name) {
          return group;
        }
      }

      return null;
    };

    Logger.createGroup = function createGroup(name) {
      var group = new Group(name, this.options);
      this.groups.push(group);
      return group;
    };

    return Logger;
  }();
  Logger.groups = [];
  Logger.options = new Options();

  exports.Logger = Logger;

  return exports;

}({}));
