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
  var LEVELS = {
    info: {
      id: 1,
      name: "info",
      color: "#28a745"
    },
    trace: {
      id: 2,
      name: "trace",
      color: "#17a2b8"
    },
    warn: {
      id: 3,
      name: "warn",
      color: "#ffc107"
    },
    error: {
      id: 4,
      name: "error",
      color: "#dc3545"
    },
    off: {
      id: 99,
      name: "off",
      color: null
    }
  };

  function addZero(value) {
    return value < 10 ? "0" + value : value;
  }

  function formatDate() {
    var now = new Date();
    var date = [addZero(now.getMonth() + 1), addZero(now.getDate()), now.getFullYear().toString().substr(-2)];
    var time = [addZero(now.getHours()), addZero(now.getMinutes()), addZero(now.getSeconds())];
    return date.join("/") + " " + time.join(":");
  }

  var Message =
  /*#__PURE__*/
  function () {
    function Message(level, content) {
      this.id = level.id;
      this.name = level.name;
      this.color = level.color;
      this.content = content;
      this.date = formatDate();
    }

    var _proto = Message.prototype;

    _proto.display = function display(groupName) {
      console[this.name]("%c[" + groupName + "] " + this.date + " : ", "color:" + this.color + ";", this.content);
    };

    return Message;
  }();

  var Group =
  /*#__PURE__*/
  function () {
    function Group(name, level) {
      this.messages = [];
      this.name = name;
      this.messages = [];
      this.level = level;
    }

    var _proto2 = Group.prototype;

    _proto2.setLevel = function setLevel(name) {
      this.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : this.level;
      return this.getLevel();
    };

    _proto2.getLevel = function getLevel() {
      return this.level.name;
    };

    _proto2.info = function info(message) {
      this.log(LEVELS.info, message);
    };

    _proto2.trace = function trace(message) {
      this.log(LEVELS.trace, message);
    };

    _proto2.warn = function warn(message) {
      this.log(LEVELS.warn, message);
    };

    _proto2.error = function error(message) {
      this.log(LEVELS.error, message);
    };

    _proto2.log = function log(level, messageContent) {
      var message = new Message(level, messageContent);
      this.messages.push(message);

      if (this.level.id <= message.id) {
        message.display(this.name);
      }
    };

    return Group;
  }();

  var Logger =
  /*#__PURE__*/
  function () {
    function Logger() {}

    Logger.setLevel = function setLevel(name) {
      Logger.level = LEVELS.hasOwnProperty(name) ? LEVELS[name] : Logger.level;

      for (var _iterator = Logger.groups, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
        group.setLevel(Logger.level.name);
      }

      return Logger.getLevel();
    };

    Logger.getLevel = function getLevel() {
      return Logger.level.name;
    };

    Logger.getGroup = function getGroup(name) {
      for (var _iterator2 = Logger.groups, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

        if (group.name === name) {
          return group;
        }
      }

      return null;
    };

    Logger.addGroup = function addGroup(name) {
      return this.getGroup(name) || this.pushGroup(name);
    };

    Logger.pushGroup = function pushGroup(name) {
      var group = new Group(name, Logger.level);
      Logger.groups.push(group);
      return group;
    };

    return Logger;
  }();

  Logger.level = LEVELS.error;
  Logger.groups = [];

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

  function isObject(object) {
    return object !== null && typeof object === "object" && !isArray(object);
  }

  function isArray(array) {
    return array !== null && array.constructor === Array;
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  /* global Reflect, Promise */
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  function __extends(d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isFunction$1(x) {
    return typeof x === 'function';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var _enable_super_gross_mode_that_will_cause_bad_things = false;
  var config = {
    Promise: undefined,

    set useDeprecatedSynchronousErrorHandling(value) {
      if (value) {
        var error =
        /*@__PURE__*/
        new Error();
        /*@__PURE__*/

        console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
      } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
        /*@__PURE__*/
        console.log('RxJS: Back to a better error behavior. Thank you. <3');
      }

      _enable_super_gross_mode_that_will_cause_bad_things = value;
    },

    get useDeprecatedSynchronousErrorHandling() {
      return _enable_super_gross_mode_that_will_cause_bad_things;
    }

  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function hostReportError(err) {
    setTimeout(function () {
      throw err;
    }, 0);
  }

  /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
  var empty = {
    closed: true,
    next: function next(value) {},
    error: function error(err) {
      if (config.useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        hostReportError(err);
      }
    },
    complete: function complete() {}
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var isArray$1 =
  /*@__PURE__*/
  function () {
    return Array.isArray || function (x) {
      return x && typeof x.length === 'number';
    };
  }();

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isObject$1(x) {
    return x !== null && typeof x === 'object';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var UnsubscriptionErrorImpl =
  /*@__PURE__*/
  function () {
    function UnsubscriptionErrorImpl(errors) {
      Error.call(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
        return i + 1 + ") " + err.toString();
      }).join('\n  ') : '';
      this.name = 'UnsubscriptionError';
      this.errors = errors;
      return this;
    }

    UnsubscriptionErrorImpl.prototype =
    /*@__PURE__*/
    Object.create(Error.prototype);
    return UnsubscriptionErrorImpl;
  }();

  var UnsubscriptionError = UnsubscriptionErrorImpl;

  /** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */
  var Subscription =
  /*@__PURE__*/
  function () {
    function Subscription(unsubscribe) {
      this.closed = false;
      this._parentOrParents = null;
      this._subscriptions = null;

      if (unsubscribe) {
        this._unsubscribe = unsubscribe;
      }
    }

    Subscription.prototype.unsubscribe = function () {
      var errors;

      if (this.closed) {
        return;
      }

      var _a = this,
          _parentOrParents = _a._parentOrParents,
          _unsubscribe = _a._unsubscribe,
          _subscriptions = _a._subscriptions;

      this.closed = true;
      this._parentOrParents = null;
      this._subscriptions = null;

      if (_parentOrParents instanceof Subscription) {
        _parentOrParents.remove(this);
      } else if (_parentOrParents !== null) {
        for (var index = 0; index < _parentOrParents.length; ++index) {
          var parent_1 = _parentOrParents[index];
          parent_1.remove(this);
        }
      }

      if (isFunction$1(_unsubscribe)) {
        try {
          _unsubscribe.call(this);
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
        }
      }

      if (isArray$1(_subscriptions)) {
        var index = -1;
        var len = _subscriptions.length;

        while (++index < len) {
          var sub = _subscriptions[index];

          if (isObject$1(sub)) {
            try {
              sub.unsubscribe();
            } catch (e) {
              errors = errors || [];

              if (e instanceof UnsubscriptionError) {
                errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
              } else {
                errors.push(e);
              }
            }
          }
        }
      }

      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    };

    Subscription.prototype.add = function (teardown) {
      var subscription = teardown;

      if (!teardown) {
        return Subscription.EMPTY;
      }

      switch (typeof teardown) {
        case 'function':
          subscription = new Subscription(teardown);

        case 'object':
          if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
            return subscription;
          } else if (this.closed) {
            subscription.unsubscribe();
            return subscription;
          } else if (!(subscription instanceof Subscription)) {
            var tmp = subscription;
            subscription = new Subscription();
            subscription._subscriptions = [tmp];
          }

          break;

        default:
          {
            throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
          }
      }

      var _parentOrParents = subscription._parentOrParents;

      if (_parentOrParents === null) {
        subscription._parentOrParents = this;
      } else if (_parentOrParents instanceof Subscription) {
        if (_parentOrParents === this) {
          return subscription;
        }

        subscription._parentOrParents = [_parentOrParents, this];
      } else if (_parentOrParents.indexOf(this) === -1) {
        _parentOrParents.push(this);
      } else {
        return subscription;
      }

      var subscriptions = this._subscriptions;

      if (subscriptions === null) {
        this._subscriptions = [subscription];
      } else {
        subscriptions.push(subscription);
      }

      return subscription;
    };

    Subscription.prototype.remove = function (subscription) {
      var subscriptions = this._subscriptions;

      if (subscriptions) {
        var subscriptionIndex = subscriptions.indexOf(subscription);

        if (subscriptionIndex !== -1) {
          subscriptions.splice(subscriptionIndex, 1);
        }
      }
    };

    Subscription.EMPTY = function (empty) {
      empty.closed = true;
      return empty;
    }(new Subscription());

    return Subscription;
  }();

  function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) {
      return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
    }, []);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var rxSubscriber =
  /*@__PURE__*/
  function () {
    return typeof Symbol === 'function' ?
    /*@__PURE__*/
    Symbol('rxSubscriber') : '@@rxSubscriber_' +
    /*@__PURE__*/
    Math.random();
  }();

  /** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
  var Subscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(Subscriber, _super);

    function Subscriber(destinationOrNext, error, complete) {
      var _this = _super.call(this) || this;

      _this.syncErrorValue = null;
      _this.syncErrorThrown = false;
      _this.syncErrorThrowable = false;
      _this.isStopped = false;

      switch (arguments.length) {
        case 0:
          _this.destination = empty;
          break;

        case 1:
          if (!destinationOrNext) {
            _this.destination = empty;
            break;
          }

          if (typeof destinationOrNext === 'object') {
            if (destinationOrNext instanceof Subscriber) {
              _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
              _this.destination = destinationOrNext;
              destinationOrNext.add(_this);
            } else {
              _this.syncErrorThrowable = true;
              _this.destination = new SafeSubscriber(_this, destinationOrNext);
            }

            break;
          }

        default:
          _this.syncErrorThrowable = true;
          _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
          break;
      }

      return _this;
    }

    Subscriber.prototype[rxSubscriber] = function () {
      return this;
    };

    Subscriber.create = function (next, error, complete) {
      var subscriber = new Subscriber(next, error, complete);
      subscriber.syncErrorThrowable = false;
      return subscriber;
    };

    Subscriber.prototype.next = function (value) {
      if (!this.isStopped) {
        this._next(value);
      }
    };

    Subscriber.prototype.error = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;

        this._error(err);
      }
    };

    Subscriber.prototype.complete = function () {
      if (!this.isStopped) {
        this.isStopped = true;

        this._complete();
      }
    };

    Subscriber.prototype.unsubscribe = function () {
      if (this.closed) {
        return;
      }

      this.isStopped = true;

      _super.prototype.unsubscribe.call(this);
    };

    Subscriber.prototype._next = function (value) {
      this.destination.next(value);
    };

    Subscriber.prototype._error = function (err) {
      this.destination.error(err);
      this.unsubscribe();
    };

    Subscriber.prototype._complete = function () {
      this.destination.complete();
      this.unsubscribe();
    };

    Subscriber.prototype._unsubscribeAndRecycle = function () {
      var _parentOrParents = this._parentOrParents;
      this._parentOrParents = null;
      this.unsubscribe();
      this.closed = false;
      this.isStopped = false;
      this._parentOrParents = _parentOrParents;
      return this;
    };

    return Subscriber;
  }(Subscription);

  var SafeSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(SafeSubscriber, _super);

    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
      var _this = _super.call(this) || this;

      _this._parentSubscriber = _parentSubscriber;
      var next;
      var context = _this;

      if (isFunction$1(observerOrNext)) {
        next = observerOrNext;
      } else if (observerOrNext) {
        next = observerOrNext.next;
        error = observerOrNext.error;
        complete = observerOrNext.complete;

        if (observerOrNext !== empty) {
          context = Object.create(observerOrNext);

          if (isFunction$1(context.unsubscribe)) {
            _this.add(context.unsubscribe.bind(context));
          }

          context.unsubscribe = _this.unsubscribe.bind(_this);
        }
      }

      _this._context = context;
      _this._next = next;
      _this._error = error;
      _this._complete = complete;
      return _this;
    }

    SafeSubscriber.prototype.next = function (value) {
      if (!this.isStopped && this._next) {
        var _parentSubscriber = this._parentSubscriber;

        if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._next, value);
        } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
          this.unsubscribe();
        }
      }
    };

    SafeSubscriber.prototype.error = function (err) {
      if (!this.isStopped) {
        var _parentSubscriber = this._parentSubscriber;
        var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;

        if (this._error) {
          if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(this._error, err);

            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, this._error, err);

            this.unsubscribe();
          }
        } else if (!_parentSubscriber.syncErrorThrowable) {
          this.unsubscribe();

          if (useDeprecatedSynchronousErrorHandling) {
            throw err;
          }

          hostReportError(err);
        } else {
          if (useDeprecatedSynchronousErrorHandling) {
            _parentSubscriber.syncErrorValue = err;
            _parentSubscriber.syncErrorThrown = true;
          } else {
            hostReportError(err);
          }

          this.unsubscribe();
        }
      }
    };

    SafeSubscriber.prototype.complete = function () {
      var _this = this;

      if (!this.isStopped) {
        var _parentSubscriber = this._parentSubscriber;

        if (this._complete) {
          var wrappedComplete = function wrappedComplete() {
            return _this._complete.call(_this._context);
          };

          if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(wrappedComplete);

            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, wrappedComplete);

            this.unsubscribe();
          }
        } else {
          this.unsubscribe();
        }
      }
    };

    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        this.unsubscribe();

        if (config.useDeprecatedSynchronousErrorHandling) {
          throw err;
        } else {
          hostReportError(err);
        }
      }
    };

    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
      if (!config.useDeprecatedSynchronousErrorHandling) {
        throw new Error('bad call');
      }

      try {
        fn.call(this._context, value);
      } catch (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          parent.syncErrorValue = err;
          parent.syncErrorThrown = true;
          return true;
        } else {
          hostReportError(err);
          return true;
        }
      }

      return false;
    };

    SafeSubscriber.prototype._unsubscribe = function () {
      var _parentSubscriber = this._parentSubscriber;
      this._context = null;
      this._parentSubscriber = null;

      _parentSubscriber.unsubscribe();
    };

    return SafeSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
  function canReportError(observer) {
    while (observer) {
      var _a = observer,
          closed_1 = _a.closed,
          destination = _a.destination,
          isStopped = _a.isStopped;

      if (closed_1 || isStopped) {
        return false;
      } else if (destination && destination instanceof Subscriber) {
        observer = destination;
      } else {
        observer = null;
      }
    }

    return true;
  }

  /** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
  function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
      if (nextOrObserver instanceof Subscriber) {
        return nextOrObserver;
      }

      if (nextOrObserver[rxSubscriber]) {
        return nextOrObserver[rxSubscriber]();
      }
    }

    if (!nextOrObserver && !error && !complete) {
      return new Subscriber(empty);
    }

    return new Subscriber(nextOrObserver, error, complete);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var observable =
  /*@__PURE__*/
  function () {
    return typeof Symbol === 'function' && Symbol.observable || '@@observable';
  }();

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function noop() {}

  /** PURE_IMPORTS_START _noop PURE_IMPORTS_END */

  function pipeFromArray(fns) {
    if (!fns) {
      return noop;
    }

    if (fns.length === 1) {
      return fns[0];
    }

    return function piped(input) {
      return fns.reduce(function (prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  /** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
  var Observable =
  /*@__PURE__*/
  function () {
    function Observable(subscribe) {
      this._isScalar = false;

      if (subscribe) {
        this._subscribe = subscribe;
      }
    }

    Observable.prototype.lift = function (operator) {
      var observable$$1 = new Observable();
      observable$$1.source = this;
      observable$$1.operator = operator;
      return observable$$1;
    };

    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
      var operator = this.operator;
      var sink = toSubscriber(observerOrNext, error, complete);

      if (operator) {
        sink.add(operator.call(sink, this.source));
      } else {
        sink.add(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
      }

      if (config.useDeprecatedSynchronousErrorHandling) {
        if (sink.syncErrorThrowable) {
          sink.syncErrorThrowable = false;

          if (sink.syncErrorThrown) {
            throw sink.syncErrorValue;
          }
        }
      }

      return sink;
    };

    Observable.prototype._trySubscribe = function (sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          sink.syncErrorThrown = true;
          sink.syncErrorValue = err;
        }

        if (canReportError(sink)) {
          sink.error(err);
        } else {
          console.warn(err);
        }
      }
    };

    Observable.prototype.forEach = function (next, promiseCtor) {
      var _this = this;

      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function (resolve, reject) {
        var subscription;
        subscription = _this.subscribe(function (value) {
          try {
            next(value);
          } catch (err) {
            reject(err);

            if (subscription) {
              subscription.unsubscribe();
            }
          }
        }, reject, resolve);
      });
    };

    Observable.prototype._subscribe = function (subscriber) {
      var source = this.source;
      return source && source.subscribe(subscriber);
    };

    Observable.prototype[observable] = function () {
      return this;
    };

    Observable.prototype.pipe = function () {
      var operations = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }

      if (operations.length === 0) {
        return this;
      }

      return pipeFromArray(operations)(this);
    };

    Observable.prototype.toPromise = function (promiseCtor) {
      var _this = this;

      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function (resolve, reject) {
        var value;

        _this.subscribe(function (x) {
          return value = x;
        }, function (err) {
          return reject(err);
        }, function () {
          return resolve(value);
        });
      });
    };

    Observable.create = function (subscribe) {
      return new Observable(subscribe);
    };

    return Observable;
  }();

  function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
      promiseCtor = config.Promise || Promise;
    }

    if (!promiseCtor) {
      throw new Error('no Promise impl found');
    }

    return promiseCtor;
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var ObjectUnsubscribedErrorImpl =
  /*@__PURE__*/
  function () {
    function ObjectUnsubscribedErrorImpl() {
      Error.call(this);
      this.message = 'object unsubscribed';
      this.name = 'ObjectUnsubscribedError';
      return this;
    }

    ObjectUnsubscribedErrorImpl.prototype =
    /*@__PURE__*/
    Object.create(Error.prototype);
    return ObjectUnsubscribedErrorImpl;
  }();

  var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

  /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
  var SubjectSubscription =
  /*@__PURE__*/
  function (_super) {
    __extends(SubjectSubscription, _super);

    function SubjectSubscription(subject, subscriber) {
      var _this = _super.call(this) || this;

      _this.subject = subject;
      _this.subscriber = subscriber;
      _this.closed = false;
      return _this;
    }

    SubjectSubscription.prototype.unsubscribe = function () {
      if (this.closed) {
        return;
      }

      this.closed = true;
      var subject = this.subject;
      var observers = subject.observers;
      this.subject = null;

      if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
        return;
      }

      var subscriberIndex = observers.indexOf(this.subscriber);

      if (subscriberIndex !== -1) {
        observers.splice(subscriberIndex, 1);
      }
    };

    return SubjectSubscription;
  }(Subscription);

  /** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */
  var SubjectSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(SubjectSubscriber, _super);

    function SubjectSubscriber(destination) {
      var _this = _super.call(this, destination) || this;

      _this.destination = destination;
      return _this;
    }

    return SubjectSubscriber;
  }(Subscriber);

  var Subject =
  /*@__PURE__*/
  function (_super) {
    __extends(Subject, _super);

    function Subject() {
      var _this = _super.call(this) || this;

      _this.observers = [];
      _this.closed = false;
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }

    Subject.prototype[rxSubscriber] = function () {
      return new SubjectSubscriber(this);
    };

    Subject.prototype.lift = function (operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };

    Subject.prototype.next = function (value) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }

      if (!this.isStopped) {
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();

        for (var i = 0; i < len; i++) {
          copy[i].next(value);
        }
      }
    };

    Subject.prototype.error = function (err) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }

      this.hasError = true;
      this.thrownError = err;
      this.isStopped = true;
      var observers = this.observers;
      var len = observers.length;
      var copy = observers.slice();

      for (var i = 0; i < len; i++) {
        copy[i].error(err);
      }

      this.observers.length = 0;
    };

    Subject.prototype.complete = function () {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }

      this.isStopped = true;
      var observers = this.observers;
      var len = observers.length;
      var copy = observers.slice();

      for (var i = 0; i < len; i++) {
        copy[i].complete();
      }

      this.observers.length = 0;
    };

    Subject.prototype.unsubscribe = function () {
      this.isStopped = true;
      this.closed = true;
      this.observers = null;
    };

    Subject.prototype._trySubscribe = function (subscriber) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else {
        return _super.prototype._trySubscribe.call(this, subscriber);
      }
    };

    Subject.prototype._subscribe = function (subscriber) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else if (this.hasError) {
        subscriber.error(this.thrownError);
        return Subscription.EMPTY;
      } else if (this.isStopped) {
        subscriber.complete();
        return Subscription.EMPTY;
      } else {
        this.observers.push(subscriber);
        return new SubjectSubscription(this, subscriber);
      }
    };

    Subject.prototype.asObservable = function () {
      var observable = new Observable();
      observable.source = this;
      return observable;
    };

    Subject.create = function (destination, source) {
      return new AnonymousSubject(destination, source);
    };

    return Subject;
  }(Observable);

  var AnonymousSubject =
  /*@__PURE__*/
  function (_super) {
    __extends(AnonymousSubject, _super);

    function AnonymousSubject(destination, source) {
      var _this = _super.call(this) || this;

      _this.destination = destination;
      _this.source = source;
      return _this;
    }

    AnonymousSubject.prototype.next = function (value) {
      var destination = this.destination;

      if (destination && destination.next) {
        destination.next(value);
      }
    };

    AnonymousSubject.prototype.error = function (err) {
      var destination = this.destination;

      if (destination && destination.error) {
        this.destination.error(err);
      }
    };

    AnonymousSubject.prototype.complete = function () {
      var destination = this.destination;

      if (destination && destination.complete) {
        this.destination.complete();
      }
    };

    AnonymousSubject.prototype._subscribe = function (subscriber) {
      var source = this.source;

      if (source) {
        return this.source.subscribe(subscriber);
      } else {
        return Subscription.EMPTY;
      }
    };

    return AnonymousSubject;
  }(Subject);

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  function refCount() {
    return function refCountOperatorFunction(source) {
      return source.lift(new RefCountOperator(source));
    };
  }

  var RefCountOperator =
  /*@__PURE__*/
  function () {
    function RefCountOperator(connectable) {
      this.connectable = connectable;
    }

    RefCountOperator.prototype.call = function (subscriber, source) {
      var connectable = this.connectable;
      connectable._refCount++;
      var refCounter = new RefCountSubscriber(subscriber, connectable);
      var subscription = source.subscribe(refCounter);

      if (!refCounter.closed) {
        refCounter.connection = connectable.connect();
      }

      return subscription;
    };

    return RefCountOperator;
  }();

  var RefCountSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(RefCountSubscriber, _super);

    function RefCountSubscriber(destination, connectable) {
      var _this = _super.call(this, destination) || this;

      _this.connectable = connectable;
      return _this;
    }

    RefCountSubscriber.prototype._unsubscribe = function () {
      var connectable = this.connectable;

      if (!connectable) {
        this.connection = null;
        return;
      }

      this.connectable = null;
      var refCount = connectable._refCount;

      if (refCount <= 0) {
        this.connection = null;
        return;
      }

      connectable._refCount = refCount - 1;

      if (refCount > 1) {
        this.connection = null;
        return;
      }

      var connection = this.connection;
      var sharedConnection = connectable._connection;
      this.connection = null;

      if (sharedConnection && (!connection || sharedConnection === connection)) {
        sharedConnection.unsubscribe();
      }
    };

    return RefCountSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */
  var ConnectableObservable =
  /*@__PURE__*/
  function (_super) {
    __extends(ConnectableObservable, _super);

    function ConnectableObservable(source, subjectFactory) {
      var _this = _super.call(this) || this;

      _this.source = source;
      _this.subjectFactory = subjectFactory;
      _this._refCount = 0;
      _this._isComplete = false;
      return _this;
    }

    ConnectableObservable.prototype._subscribe = function (subscriber) {
      return this.getSubject().subscribe(subscriber);
    };

    ConnectableObservable.prototype.getSubject = function () {
      var subject = this._subject;

      if (!subject || subject.isStopped) {
        this._subject = this.subjectFactory();
      }

      return this._subject;
    };

    ConnectableObservable.prototype.connect = function () {
      var connection = this._connection;

      if (!connection) {
        this._isComplete = false;
        connection = this._connection = new Subscription();
        connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));

        if (connection.closed) {
          this._connection = null;
          connection = Subscription.EMPTY;
        }
      }

      return connection;
    };

    ConnectableObservable.prototype.refCount = function () {
      return refCount()(this);
    };

    return ConnectableObservable;
  }(Observable);



  var ConnectableSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(ConnectableSubscriber, _super);

    function ConnectableSubscriber(destination, connectable) {
      var _this = _super.call(this, destination) || this;

      _this.connectable = connectable;
      return _this;
    }

    ConnectableSubscriber.prototype._error = function (err) {
      this._unsubscribe();

      _super.prototype._error.call(this, err);
    };

    ConnectableSubscriber.prototype._complete = function () {
      this.connectable._isComplete = true;

      this._unsubscribe();

      _super.prototype._complete.call(this);
    };

    ConnectableSubscriber.prototype._unsubscribe = function () {
      var connectable = this.connectable;

      if (connectable) {
        this.connectable = null;
        var connection = connectable._connection;
        connectable._refCount = 0;
        connectable._subject = null;
        connectable._connection = null;

        if (connection) {
          connection.unsubscribe();
        }
      }
    };

    return ConnectableSubscriber;
  }(SubjectSubscriber);

  var RefCountSubscriber$1 =
  /*@__PURE__*/
  function (_super) {
    __extends(RefCountSubscriber, _super);

    function RefCountSubscriber(destination, connectable) {
      var _this = _super.call(this, destination) || this;

      _this.connectable = connectable;
      return _this;
    }

    RefCountSubscriber.prototype._unsubscribe = function () {
      var connectable = this.connectable;

      if (!connectable) {
        this.connection = null;
        return;
      }

      this.connectable = null;
      var refCount$$1 = connectable._refCount;

      if (refCount$$1 <= 0) {
        this.connection = null;
        return;
      }

      connectable._refCount = refCount$$1 - 1;

      if (refCount$$1 > 1) {
        this.connection = null;
        return;
      }

      var connection = this.connection;
      var sharedConnection = connectable._connection;
      this.connection = null;

      if (sharedConnection && (!connection || sharedConnection === connection)) {
        sharedConnection.unsubscribe();
      }
    };

    return RefCountSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */


  var GroupBySubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(GroupBySubscriber, _super);

    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
      var _this = _super.call(this, destination) || this;

      _this.keySelector = keySelector;
      _this.elementSelector = elementSelector;
      _this.durationSelector = durationSelector;
      _this.subjectSelector = subjectSelector;
      _this.groups = null;
      _this.attemptedToUnsubscribe = false;
      _this.count = 0;
      return _this;
    }

    GroupBySubscriber.prototype._next = function (value) {
      var key;

      try {
        key = this.keySelector(value);
      } catch (err) {
        this.error(err);
        return;
      }

      this._group(value, key);
    };

    GroupBySubscriber.prototype._group = function (value, key) {
      var groups = this.groups;

      if (!groups) {
        groups = this.groups = new Map();
      }

      var group = groups.get(key);
      var element;

      if (this.elementSelector) {
        try {
          element = this.elementSelector(value);
        } catch (err) {
          this.error(err);
        }
      } else {
        element = value;
      }

      if (!group) {
        group = this.subjectSelector ? this.subjectSelector() : new Subject();
        groups.set(key, group);
        var groupedObservable = new GroupedObservable(key, group, this);
        this.destination.next(groupedObservable);

        if (this.durationSelector) {
          var duration = void 0;

          try {
            duration = this.durationSelector(new GroupedObservable(key, group));
          } catch (err) {
            this.error(err);
            return;
          }

          this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
        }
      }

      if (!group.closed) {
        group.next(element);
      }
    };

    GroupBySubscriber.prototype._error = function (err) {
      var groups = this.groups;

      if (groups) {
        groups.forEach(function (group, key) {
          group.error(err);
        });
        groups.clear();
      }

      this.destination.error(err);
    };

    GroupBySubscriber.prototype._complete = function () {
      var groups = this.groups;

      if (groups) {
        groups.forEach(function (group, key) {
          group.complete();
        });
        groups.clear();
      }

      this.destination.complete();
    };

    GroupBySubscriber.prototype.removeGroup = function (key) {
      this.groups.delete(key);
    };

    GroupBySubscriber.prototype.unsubscribe = function () {
      if (!this.closed) {
        this.attemptedToUnsubscribe = true;

        if (this.count === 0) {
          _super.prototype.unsubscribe.call(this);
        }
      }
    };

    return GroupBySubscriber;
  }(Subscriber);

  var GroupDurationSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(GroupDurationSubscriber, _super);

    function GroupDurationSubscriber(key, group, parent) {
      var _this = _super.call(this, group) || this;

      _this.key = key;
      _this.group = group;
      _this.parent = parent;
      return _this;
    }

    GroupDurationSubscriber.prototype._next = function (value) {
      this.complete();
    };

    GroupDurationSubscriber.prototype._unsubscribe = function () {
      var _a = this,
          parent = _a.parent,
          key = _a.key;

      this.key = this.parent = null;

      if (parent) {
        parent.removeGroup(key);
      }
    };

    return GroupDurationSubscriber;
  }(Subscriber);

  var GroupedObservable =
  /*@__PURE__*/
  function (_super) {
    __extends(GroupedObservable, _super);

    function GroupedObservable(key, groupSubject, refCountSubscription) {
      var _this = _super.call(this) || this;

      _this.key = key;
      _this.groupSubject = groupSubject;
      _this.refCountSubscription = refCountSubscription;
      return _this;
    }

    GroupedObservable.prototype._subscribe = function (subscriber) {
      var subscription = new Subscription();

      var _a = this,
          refCountSubscription = _a.refCountSubscription,
          groupSubject = _a.groupSubject;

      if (refCountSubscription && !refCountSubscription.closed) {
        subscription.add(new InnerRefCountSubscription(refCountSubscription));
      }

      subscription.add(groupSubject.subscribe(subscriber));
      return subscription;
    };

    return GroupedObservable;
  }(Observable);

  var InnerRefCountSubscription =
  /*@__PURE__*/
  function (_super) {
    __extends(InnerRefCountSubscription, _super);

    function InnerRefCountSubscription(parent) {
      var _this = _super.call(this) || this;

      _this.parent = parent;
      parent.count++;
      return _this;
    }

    InnerRefCountSubscription.prototype.unsubscribe = function () {
      var parent = this.parent;

      if (!parent.closed && !this.closed) {
        _super.prototype.unsubscribe.call(this);

        parent.count -= 1;

        if (parent.count === 0 && parent.attemptedToUnsubscribe) {
          parent.unsubscribe();
        }
      }
    };

    return InnerRefCountSubscription;
  }(Subscription);

  /** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */
  var BehaviorSubject =
  /*@__PURE__*/
  function (_super) {
    __extends(BehaviorSubject, _super);

    function BehaviorSubject(_value) {
      var _this = _super.call(this) || this;

      _this._value = _value;
      return _this;
    }

    Object.defineProperty(BehaviorSubject.prototype, "value", {
      get: function get() {
        return this.getValue();
      },
      enumerable: true,
      configurable: true
    });

    BehaviorSubject.prototype._subscribe = function (subscriber) {
      var subscription = _super.prototype._subscribe.call(this, subscriber);

      if (subscription && !subscription.closed) {
        subscriber.next(this._value);
      }

      return subscription;
    };

    BehaviorSubject.prototype.getValue = function () {
      if (this.hasError) {
        throw this.thrownError;
      } else if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else {
        return this._value;
      }
    };

    BehaviorSubject.prototype.next = function (value) {
      _super.prototype.next.call(this, this._value = value);
    };

    return BehaviorSubject;
  }(Subject);

  /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
  var Action =
  /*@__PURE__*/
  function (_super) {
    __extends(Action, _super);

    function Action(scheduler, work) {
      return _super.call(this) || this;
    }

    Action.prototype.schedule = function (state, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      return this;
    };

    return Action;
  }(Subscription);

  /** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */
  var AsyncAction =
  /*@__PURE__*/
  function (_super) {
    __extends(AsyncAction, _super);

    function AsyncAction(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;

      _this.scheduler = scheduler;
      _this.work = work;
      _this.pending = false;
      return _this;
    }

    AsyncAction.prototype.schedule = function (state, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      if (this.closed) {
        return this;
      }

      this.state = state;
      var id = this.id;
      var scheduler = this.scheduler;

      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay);
      }

      this.pending = true;
      this.delay = delay;
      this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
      return this;
    };

    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      return setInterval(scheduler.flush.bind(scheduler, this), delay);
    };

    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      if (delay !== null && this.delay === delay && this.pending === false) {
        return id;
      }

      clearInterval(id);
      return undefined;
    };

    AsyncAction.prototype.execute = function (state, delay) {
      if (this.closed) {
        return new Error('executing a cancelled action');
      }

      this.pending = false;

      var error = this._execute(state, delay);

      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };

    AsyncAction.prototype._execute = function (state, delay) {
      var errored = false;
      var errorValue = undefined;

      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = !!e && e || new Error(e);
      }

      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    };

    AsyncAction.prototype._unsubscribe = function () {
      var id = this.id;
      var scheduler = this.scheduler;
      var actions = scheduler.actions;
      var index = actions.indexOf(this);
      this.work = null;
      this.state = null;
      this.pending = false;
      this.scheduler = null;

      if (index !== -1) {
        actions.splice(index, 1);
      }

      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }

      this.delay = null;
    };

    return AsyncAction;
  }(Action);

  /** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
  var QueueAction =
  /*@__PURE__*/
  function (_super) {
    __extends(QueueAction, _super);

    function QueueAction(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;

      _this.scheduler = scheduler;
      _this.work = work;
      return _this;
    }

    QueueAction.prototype.schedule = function (state, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      if (delay > 0) {
        return _super.prototype.schedule.call(this, state, delay);
      }

      this.delay = delay;
      this.state = state;
      this.scheduler.flush(this);
      return this;
    };

    QueueAction.prototype.execute = function (state, delay) {
      return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
    };

    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
      }

      return scheduler.flush(this);
    };

    return QueueAction;
  }(AsyncAction);

  var Scheduler =
  /*@__PURE__*/
  function () {
    function Scheduler(SchedulerAction, now) {
      if (now === void 0) {
        now = Scheduler.now;
      }

      this.SchedulerAction = SchedulerAction;
      this.now = now;
    }

    Scheduler.prototype.schedule = function (work, delay, state) {
      if (delay === void 0) {
        delay = 0;
      }

      return new this.SchedulerAction(this, work).schedule(state, delay);
    };

    Scheduler.now = function () {
      return Date.now();
    };

    return Scheduler;
  }();

  /** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */
  var AsyncScheduler =
  /*@__PURE__*/
  function (_super) {
    __extends(AsyncScheduler, _super);

    function AsyncScheduler(SchedulerAction, now) {
      if (now === void 0) {
        now = Scheduler.now;
      }

      var _this = _super.call(this, SchedulerAction, function () {
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
          return AsyncScheduler.delegate.now();
        } else {
          return now();
        }
      }) || this;

      _this.actions = [];
      _this.active = false;
      _this.scheduled = undefined;
      return _this;
    }

    AsyncScheduler.prototype.schedule = function (work, delay, state) {
      if (delay === void 0) {
        delay = 0;
      }

      if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
        return AsyncScheduler.delegate.schedule(work, delay, state);
      } else {
        return _super.prototype.schedule.call(this, work, delay, state);
      }
    };

    AsyncScheduler.prototype.flush = function (action) {
      var actions = this.actions;

      if (this.active) {
        actions.push(action);
        return;
      }

      var error;
      this.active = true;

      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());

      this.active = false;

      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }

        throw error;
      }
    };

    return AsyncScheduler;
  }(Scheduler);

  /** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
  var QueueScheduler =
  /*@__PURE__*/
  function (_super) {
    __extends(QueueScheduler, _super);

    function QueueScheduler() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    return QueueScheduler;
  }(AsyncScheduler);

  /** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */
  var queue =
  /*@__PURE__*/
  new QueueScheduler(QueueAction);

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
  var EMPTY =
  /*@__PURE__*/
  new Observable(function (subscriber) {
    return subscriber.complete();
  });
  function empty$1(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
  }

  function emptyScheduled(scheduler) {
    return new Observable(function (subscriber) {
      return scheduler.schedule(function () {
        return subscriber.complete();
      });
    });
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isScheduler(value) {
    return value && typeof value.schedule === 'function';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var subscribeToArray = function subscribeToArray(array) {
    return function (subscriber) {
      for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }

      subscriber.complete();
    };
  };

  /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
  function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
      var sub = new Subscription();
      var i = 0;
      sub.add(scheduler.schedule(function () {
        if (i === input.length) {
          subscriber.complete();
          return;
        }

        subscriber.next(input[i++]);

        if (!subscriber.closed) {
          sub.add(this.schedule());
        }
      }));
      return sub;
    });
  }

  /** PURE_IMPORTS_START _Observable,_util_subscribeToArray,_scheduled_scheduleArray PURE_IMPORTS_END */
  function fromArray(input, scheduler) {
    if (!scheduler) {
      return new Observable(subscribeToArray(input));
    } else {
      return scheduleArray(input, scheduler);
    }
  }

  /** PURE_IMPORTS_START _util_isScheduler,_fromArray,_scheduled_scheduleArray PURE_IMPORTS_END */
  function of() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var scheduler = args[args.length - 1];

    if (isScheduler(scheduler)) {
      args.pop();
      return scheduleArray(args, scheduler);
    } else {
      return fromArray(args);
    }
  }

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
  function throwError(error, scheduler) {
    if (!scheduler) {
      return new Observable(function (subscriber) {
        return subscriber.error(error);
      });
    } else {
      return new Observable(function (subscriber) {
        return scheduler.schedule(dispatch, 0, {
          error: error,
          subscriber: subscriber
        });
      });
    }
  }

  function dispatch(_a) {
    var error = _a.error,
        subscriber = _a.subscriber;
    subscriber.error(error);
  }

  /** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */
  var NotificationKind;
  /*@__PURE__*/

  (function (NotificationKind) {
    NotificationKind["NEXT"] = "N";
    NotificationKind["ERROR"] = "E";
    NotificationKind["COMPLETE"] = "C";
  })(NotificationKind || (NotificationKind = {}));

  var Notification =
  /*@__PURE__*/
  function () {
    function Notification(kind, value, error) {
      this.kind = kind;
      this.value = value;
      this.error = error;
      this.hasValue = kind === 'N';
    }

    Notification.prototype.observe = function (observer) {
      switch (this.kind) {
        case 'N':
          return observer.next && observer.next(this.value);

        case 'E':
          return observer.error && observer.error(this.error);

        case 'C':
          return observer.complete && observer.complete();
      }
    };

    Notification.prototype.do = function (next, error, complete) {
      var kind = this.kind;

      switch (kind) {
        case 'N':
          return next && next(this.value);

        case 'E':
          return error && error(this.error);

        case 'C':
          return complete && complete();
      }
    };

    Notification.prototype.accept = function (nextOrObserver, error, complete) {
      if (nextOrObserver && typeof nextOrObserver.next === 'function') {
        return this.observe(nextOrObserver);
      } else {
        return this.do(nextOrObserver, error, complete);
      }
    };

    Notification.prototype.toObservable = function () {
      var kind = this.kind;

      switch (kind) {
        case 'N':
          return of(this.value);

        case 'E':
          return throwError(this.error);

        case 'C':
          return empty$1();
      }

      throw new Error('unexpected notification kind value');
    };

    Notification.createNext = function (value) {
      if (typeof value !== 'undefined') {
        return new Notification('N', value);
      }

      return Notification.undefinedValueNotification;
    };

    Notification.createError = function (err) {
      return new Notification('E', undefined, err);
    };

    Notification.createComplete = function () {
      return Notification.completeNotification;
    };

    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
  }();

  /** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */


  var ObserveOnSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(ObserveOnSubscriber, _super);

    function ObserveOnSubscriber(destination, scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      var _this = _super.call(this, destination) || this;

      _this.scheduler = scheduler;
      _this.delay = delay;
      return _this;
    }

    ObserveOnSubscriber.dispatch = function (arg) {
      var notification = arg.notification,
          destination = arg.destination;
      notification.observe(destination);
      this.unsubscribe();
    };

    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
      var destination = this.destination;
      destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };

    ObserveOnSubscriber.prototype._next = function (value) {
      this.scheduleMessage(Notification.createNext(value));
    };

    ObserveOnSubscriber.prototype._error = function (err) {
      this.scheduleMessage(Notification.createError(err));
      this.unsubscribe();
    };

    ObserveOnSubscriber.prototype._complete = function () {
      this.scheduleMessage(Notification.createComplete());
      this.unsubscribe();
    };

    return ObserveOnSubscriber;
  }(Subscriber);

  var ObserveOnMessage =
  /*@__PURE__*/
  function () {
    function ObserveOnMessage(notification, destination) {
      this.notification = notification;
      this.destination = destination;
    }

    return ObserveOnMessage;
  }();

  /** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */
  var ReplaySubject =
  /*@__PURE__*/
  function (_super) {
    __extends(ReplaySubject, _super);

    function ReplaySubject(bufferSize, windowTime, scheduler) {
      if (bufferSize === void 0) {
        bufferSize = Number.POSITIVE_INFINITY;
      }

      if (windowTime === void 0) {
        windowTime = Number.POSITIVE_INFINITY;
      }

      var _this = _super.call(this) || this;

      _this.scheduler = scheduler;
      _this._events = [];
      _this._infiniteTimeWindow = false;
      _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
      _this._windowTime = windowTime < 1 ? 1 : windowTime;

      if (windowTime === Number.POSITIVE_INFINITY) {
        _this._infiniteTimeWindow = true;
        _this.next = _this.nextInfiniteTimeWindow;
      } else {
        _this.next = _this.nextTimeWindow;
      }

      return _this;
    }

    ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
      var _events = this._events;

      _events.push(value);

      if (_events.length > this._bufferSize) {
        _events.shift();
      }

      _super.prototype.next.call(this, value);
    };

    ReplaySubject.prototype.nextTimeWindow = function (value) {
      this._events.push(new ReplayEvent(this._getNow(), value));

      this._trimBufferThenGetEvents();

      _super.prototype.next.call(this, value);
    };

    ReplaySubject.prototype._subscribe = function (subscriber) {
      var _infiniteTimeWindow = this._infiniteTimeWindow;

      var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();

      var scheduler = this.scheduler;
      var len = _events.length;
      var subscription;

      if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else if (this.isStopped || this.hasError) {
        subscription = Subscription.EMPTY;
      } else {
        this.observers.push(subscriber);
        subscription = new SubjectSubscription(this, subscriber);
      }

      if (scheduler) {
        subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
      }

      if (_infiniteTimeWindow) {
        for (var i = 0; i < len && !subscriber.closed; i++) {
          subscriber.next(_events[i]);
        }
      } else {
        for (var i = 0; i < len && !subscriber.closed; i++) {
          subscriber.next(_events[i].value);
        }
      }

      if (this.hasError) {
        subscriber.error(this.thrownError);
      } else if (this.isStopped) {
        subscriber.complete();
      }

      return subscription;
    };

    ReplaySubject.prototype._getNow = function () {
      return (this.scheduler || queue).now();
    };

    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
      var now = this._getNow();

      var _bufferSize = this._bufferSize;
      var _windowTime = this._windowTime;
      var _events = this._events;
      var eventsCount = _events.length;
      var spliceCount = 0;

      while (spliceCount < eventsCount) {
        if (now - _events[spliceCount].time < _windowTime) {
          break;
        }

        spliceCount++;
      }

      if (eventsCount > _bufferSize) {
        spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
      }

      if (spliceCount > 0) {
        _events.splice(0, spliceCount);
      }

      return _events;
    };

    return ReplaySubject;
  }(Subject);

  var ReplayEvent =
  /*@__PURE__*/
  function () {
    function ReplayEvent(time, value) {
      this.time = time;
      this.value = value;
    }

    return ReplayEvent;
  }();

  /** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */
  var AsyncSubject =
  /*@__PURE__*/
  function (_super) {
    __extends(AsyncSubject, _super);

    function AsyncSubject() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.value = null;
      _this.hasNext = false;
      _this.hasCompleted = false;
      return _this;
    }

    AsyncSubject.prototype._subscribe = function (subscriber) {
      if (this.hasError) {
        subscriber.error(this.thrownError);
        return Subscription.EMPTY;
      } else if (this.hasCompleted && this.hasNext) {
        subscriber.next(this.value);
        subscriber.complete();
        return Subscription.EMPTY;
      }

      return _super.prototype._subscribe.call(this, subscriber);
    };

    AsyncSubject.prototype.next = function (value) {
      if (!this.hasCompleted) {
        this.value = value;
        this.hasNext = true;
      }
    };

    AsyncSubject.prototype.error = function (error) {
      if (!this.hasCompleted) {
        _super.prototype.error.call(this, error);
      }
    };

    AsyncSubject.prototype.complete = function () {
      this.hasCompleted = true;

      if (this.hasNext) {
        _super.prototype.next.call(this, this.value);
      }

      _super.prototype.complete.call(this);
    };

    return AsyncSubject;
  }(Subject);

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var nextHandle = 1;
  var tasksByHandle = {};

  function runIfPresent(handle) {
    var cb = tasksByHandle[handle];

    if (cb) {
      cb();
    }
  }

  var Immediate = {
    setImmediate: function setImmediate(cb) {
      var handle = nextHandle++;
      tasksByHandle[handle] = cb;
      Promise.resolve().then(function () {
        return runIfPresent(handle);
      });
      return handle;
    },
    clearImmediate: function clearImmediate(handle) {
      delete tasksByHandle[handle];
    }
  };

  /** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */
  var AsapAction =
  /*@__PURE__*/
  function (_super) {
    __extends(AsapAction, _super);

    function AsapAction(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;

      _this.scheduler = scheduler;
      _this.work = work;
      return _this;
    }

    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      if (delay !== null && delay > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
      }

      scheduler.actions.push(this);
      return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
    };

    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
        return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
      }

      if (scheduler.actions.length === 0) {
        Immediate.clearImmediate(id);
        scheduler.scheduled = undefined;
      }

      return undefined;
    };

    return AsapAction;
  }(AsyncAction);

  /** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
  var AsapScheduler =
  /*@__PURE__*/
  function (_super) {
    __extends(AsapScheduler, _super);

    function AsapScheduler() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    AsapScheduler.prototype.flush = function (action) {
      this.active = true;
      this.scheduled = undefined;
      var actions = this.actions;
      var error;
      var index = -1;
      var count = actions.length;
      action = action || actions.shift();

      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (++index < count && (action = actions.shift()));

      this.active = false;

      if (error) {
        while (++index < count && (action = actions.shift())) {
          action.unsubscribe();
        }

        throw error;
      }
    };

    return AsapScheduler;
  }(AsyncScheduler);

  /** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */
  var asap =
  /*@__PURE__*/
  new AsapScheduler(AsapAction);

  /** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
  var async =
  /*@__PURE__*/
  new AsyncScheduler(AsyncAction);

  /** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
  var AnimationFrameAction =
  /*@__PURE__*/
  function (_super) {
    __extends(AnimationFrameAction, _super);

    function AnimationFrameAction(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;

      _this.scheduler = scheduler;
      _this.work = work;
      return _this;
    }

    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      if (delay !== null && delay > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
      }

      scheduler.actions.push(this);
      return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () {
        return scheduler.flush(null);
      }));
    };

    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
        return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
      }

      if (scheduler.actions.length === 0) {
        cancelAnimationFrame(id);
        scheduler.scheduled = undefined;
      }

      return undefined;
    };

    return AnimationFrameAction;
  }(AsyncAction);

  /** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
  var AnimationFrameScheduler =
  /*@__PURE__*/
  function (_super) {
    __extends(AnimationFrameScheduler, _super);

    function AnimationFrameScheduler() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    AnimationFrameScheduler.prototype.flush = function (action) {
      this.active = true;
      this.scheduled = undefined;
      var actions = this.actions;
      var error;
      var index = -1;
      var count = actions.length;
      action = action || actions.shift();

      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (++index < count && (action = actions.shift()));

      this.active = false;

      if (error) {
        while (++index < count && (action = actions.shift())) {
          action.unsubscribe();
        }

        throw error;
      }
    };

    return AnimationFrameScheduler;
  }(AsyncScheduler);

  /** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */
  var animationFrame =
  /*@__PURE__*/
  new AnimationFrameScheduler(AnimationFrameAction);

  /** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
  var VirtualTimeScheduler =
  /*@__PURE__*/
  function (_super) {
    __extends(VirtualTimeScheduler, _super);

    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
      if (SchedulerAction === void 0) {
        SchedulerAction = VirtualAction;
      }

      if (maxFrames === void 0) {
        maxFrames = Number.POSITIVE_INFINITY;
      }

      var _this = _super.call(this, SchedulerAction, function () {
        return _this.frame;
      }) || this;

      _this.maxFrames = maxFrames;
      _this.frame = 0;
      _this.index = -1;
      return _this;
    }

    VirtualTimeScheduler.prototype.flush = function () {
      var _a = this,
          actions = _a.actions,
          maxFrames = _a.maxFrames;

      var error, action;

      while ((action = actions[0]) && action.delay <= maxFrames) {
        actions.shift();
        this.frame = action.delay;

        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      }

      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }

        throw error;
      }
    };

    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
  }(AsyncScheduler);

  var VirtualAction =
  /*@__PURE__*/
  function (_super) {
    __extends(VirtualAction, _super);

    function VirtualAction(scheduler, work, index) {
      if (index === void 0) {
        index = scheduler.index += 1;
      }

      var _this = _super.call(this, scheduler, work) || this;

      _this.scheduler = scheduler;
      _this.work = work;
      _this.index = index;
      _this.active = true;
      _this.index = scheduler.index = index;
      return _this;
    }

    VirtualAction.prototype.schedule = function (state, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      if (!this.id) {
        return _super.prototype.schedule.call(this, state, delay);
      }

      this.active = false;
      var action = new VirtualAction(this.scheduler, this.work);
      this.add(action);
      return action.schedule(state, delay);
    };

    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      this.delay = scheduler.frame + delay;
      var actions = scheduler.actions;
      actions.push(this);
      actions.sort(VirtualAction.sortActions);
      return true;
    };

    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      return undefined;
    };

    VirtualAction.prototype._execute = function (state, delay) {
      if (this.active === true) {
        return _super.prototype._execute.call(this, state, delay);
      }
    };

    VirtualAction.sortActions = function (a, b) {
      if (a.delay === b.delay) {
        if (a.index === b.index) {
          return 0;
        } else if (a.index > b.index) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.delay > b.delay) {
        return 1;
      } else {
        return -1;
      }
    };

    return VirtualAction;
  }(AsyncAction);

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


  var MapSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(MapSubscriber, _super);

    function MapSubscriber(destination, project, thisArg) {
      var _this = _super.call(this, destination) || this;

      _this.project = project;
      _this.count = 0;
      _this.thisArg = thisArg || _this;
      return _this;
    }

    MapSubscriber.prototype._next = function (value) {
      var result;

      try {
        result = this.project.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }

      this.destination.next(result);
    };

    return MapSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isArray,_util_isScheduler PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isScheduler,_util_isArray PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  var OuterSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(OuterSubscriber, _super);

    function OuterSubscriber() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(innerValue);
    };

    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
      this.destination.error(error);
    };

    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
      this.destination.complete();
    };

    return OuterSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  var InnerSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(InnerSubscriber, _super);

    function InnerSubscriber(parent, outerValue, outerIndex) {
      var _this = _super.call(this) || this;

      _this.parent = parent;
      _this.outerValue = outerValue;
      _this.outerIndex = outerIndex;
      _this.index = 0;
      return _this;
    }

    InnerSubscriber.prototype._next = function (value) {
      this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };

    InnerSubscriber.prototype._error = function (error) {
      this.parent.notifyError(error, this);
      this.unsubscribe();
    };

    InnerSubscriber.prototype._complete = function () {
      this.parent.notifyComplete(this);
      this.unsubscribe();
    };

    return InnerSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
  var subscribeToPromise = function subscribeToPromise(promise) {
    return function (subscriber) {
      promise.then(function (value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function (err) {
        return subscriber.error(err);
      }).then(null, hostReportError);
      return subscriber;
    };
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
      return '@@iterator';
    }

    return Symbol.iterator;
  }
  var iterator =
  /*@__PURE__*/
  getSymbolIterator();

  /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
  var subscribeToIterable = function subscribeToIterable(iterable) {
    return function (subscriber) {
      var iterator$$1 = iterable[iterator]();

      do {
        var item = iterator$$1.next();

        if (item.done) {
          subscriber.complete();
          break;
        }

        subscriber.next(item.value);

        if (subscriber.closed) {
          break;
        }
      } while (true);

      if (typeof iterator$$1.return === 'function') {
        subscriber.add(function () {
          if (iterator$$1.return) {
            iterator$$1.return();
          }
        });
      }

      return subscriber;
    };
  };

  /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
  var subscribeToObservable = function subscribeToObservable(obj) {
    return function (subscriber) {
      var obs = obj[observable]();

      if (typeof obs.subscribe !== 'function') {
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
      } else {
        return obs.subscribe(subscriber);
      }
    };
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var isArrayLike = function isArrayLike(x) {
    return x && typeof x.length === 'number' && typeof x !== 'function';
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isPromise(value) {
    return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
  }

  /** PURE_IMPORTS_START _subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
  var subscribeTo = function subscribeTo(result) {
    if (!!result && typeof result[observable] === 'function') {
      return subscribeToObservable(result);
    } else if (isArrayLike(result)) {
      return subscribeToArray(result);
    } else if (isPromise(result)) {
      return subscribeToPromise(result);
    } else if (!!result && typeof result[iterator] === 'function') {
      return subscribeToIterable(result);
    } else {
      var value = isObject$1(result) ? 'an invalid object' : "'" + result + "'";
      var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
      throw new TypeError(msg);
    }
  };

  /** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo,_Observable PURE_IMPORTS_END */
  function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
    if (destination === void 0) {
      destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    }

    if (destination.closed) {
      return undefined;
    }

    if (result instanceof Observable) {
      return result.subscribe(destination);
    }

    return subscribeTo(result)(destination);
  }

  /** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */
  var NONE = {};


  var CombineLatestSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(CombineLatestSubscriber, _super);

    function CombineLatestSubscriber(destination, resultSelector) {
      var _this = _super.call(this, destination) || this;

      _this.resultSelector = resultSelector;
      _this.active = 0;
      _this.values = [];
      _this.observables = [];
      return _this;
    }

    CombineLatestSubscriber.prototype._next = function (observable) {
      this.values.push(NONE);
      this.observables.push(observable);
    };

    CombineLatestSubscriber.prototype._complete = function () {
      var observables = this.observables;
      var len = observables.length;

      if (len === 0) {
        this.destination.complete();
      } else {
        this.active = len;
        this.toRespond = len;

        for (var i = 0; i < len; i++) {
          var observable = observables[i];
          this.add(subscribeToResult(this, observable, observable, i));
        }
      }
    };

    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
      if ((this.active -= 1) === 0) {
        this.destination.complete();
      }
    };

    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var values = this.values;
      var oldVal = values[outerIndex];
      var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
      values[outerIndex] = innerValue;

      if (toRespond === 0) {
        if (this.resultSelector) {
          this._tryResultSelector(values);
        } else {
          this.destination.next(values.slice());
        }
      }
    };

    CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
      var result;

      try {
        result = this.resultSelector.apply(this, values);
      } catch (err) {
        this.destination.error(err);
        return;
      }

      this.destination.next(result);
    };

    return CombineLatestSubscriber;
  }(OuterSubscriber);

  /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _scheduleObservable,_schedulePromise,_scheduleArray,_scheduleIterable,_util_isInteropObservable,_util_isPromise,_util_isArrayLike,_util_isIterable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_subscribeTo,_scheduled_scheduled PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber,_map,_observable_from PURE_IMPORTS_END */


  var MergeMapSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(MergeMapSubscriber, _super);

    function MergeMapSubscriber(destination, project, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }

      var _this = _super.call(this, destination) || this;

      _this.project = project;
      _this.concurrent = concurrent;
      _this.hasCompleted = false;
      _this.buffer = [];
      _this.active = 0;
      _this.index = 0;
      return _this;
    }

    MergeMapSubscriber.prototype._next = function (value) {
      if (this.active < this.concurrent) {
        this._tryNext(value);
      } else {
        this.buffer.push(value);
      }
    };

    MergeMapSubscriber.prototype._tryNext = function (value) {
      var result;
      var index = this.index++;

      try {
        result = this.project(value, index);
      } catch (err) {
        this.destination.error(err);
        return;
      }

      this.active++;

      this._innerSub(result, value, index);
    };

    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
      var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
      var destination = this.destination;
      destination.add(innerSubscriber);
      subscribeToResult(this, ish, value, index, innerSubscriber);
    };

    MergeMapSubscriber.prototype._complete = function () {
      this.hasCompleted = true;

      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }

      this.unsubscribe();
    };

    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(innerValue);
    };

    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;

      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };

    return MergeMapSubscriber;
  }(OuterSubscriber);

  /** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _of,_operators_concatAll PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_isArray,_operators_map,_util_isObject,_from PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


  var FilterSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(FilterSubscriber, _super);

    function FilterSubscriber(destination, predicate, thisArg) {
      var _this = _super.call(this, destination) || this;

      _this.predicate = predicate;
      _this.thisArg = thisArg;
      _this.count = 0;
      return _this;
    }

    FilterSubscriber.prototype._next = function (value) {
      var result;

      try {
        result = this.predicate.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }

      if (result) {
        this.destination.next(value);
      }
    };

    return FilterSubscriber;
  }(Subscriber);

  /** PURE_IMPORTS_START _util_not,_util_subscribeTo,_operators_filter,_Observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */


  var RaceSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(RaceSubscriber, _super);

    function RaceSubscriber(destination) {
      var _this = _super.call(this, destination) || this;

      _this.hasFirst = false;
      _this.observables = [];
      _this.subscriptions = [];
      return _this;
    }

    RaceSubscriber.prototype._next = function (observable) {
      this.observables.push(observable);
    };

    RaceSubscriber.prototype._complete = function () {
      var observables = this.observables;
      var len = observables.length;

      if (len === 0) {
        this.destination.complete();
      } else {
        for (var i = 0; i < len && !this.hasFirst; i++) {
          var observable = observables[i];
          var subscription = subscribeToResult(this, observable, observable, i);

          if (this.subscriptions) {
            this.subscriptions.push(subscription);
          }

          this.add(subscription);
        }

        this.observables = null;
      }
    };

    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      if (!this.hasFirst) {
        this.hasFirst = true;

        for (var i = 0; i < this.subscriptions.length; i++) {
          if (i !== outerIndex) {
            var subscription = this.subscriptions[i];
            subscription.unsubscribe();
            this.remove(subscription);
          }
        }

        this.subscriptions = null;
      }

      this.destination.next(innerValue);
    };

    return RaceSubscriber;
  }(OuterSubscriber);

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */

  /** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

  /** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_OuterSubscriber,_util_subscribeToResult,_.._internal_symbol_iterator PURE_IMPORTS_END */


  var ZipSubscriber =
  /*@__PURE__*/
  function (_super) {
    __extends(ZipSubscriber, _super);

    function ZipSubscriber(destination, resultSelector, values) {
      if (values === void 0) {
        values = Object.create(null);
      }

      var _this = _super.call(this, destination) || this;

      _this.iterators = [];
      _this.active = 0;
      _this.resultSelector = typeof resultSelector === 'function' ? resultSelector : null;
      _this.values = values;
      return _this;
    }

    ZipSubscriber.prototype._next = function (value) {
      var iterators = this.iterators;

      if (isArray$1(value)) {
        iterators.push(new StaticArrayIterator(value));
      } else if (typeof value[iterator] === 'function') {
        iterators.push(new StaticIterator(value[iterator]()));
      } else {
        iterators.push(new ZipBufferIterator(this.destination, this, value));
      }
    };

    ZipSubscriber.prototype._complete = function () {
      var iterators = this.iterators;
      var len = iterators.length;
      this.unsubscribe();

      if (len === 0) {
        this.destination.complete();
        return;
      }

      this.active = len;

      for (var i = 0; i < len; i++) {
        var iterator$$1 = iterators[i];

        if (iterator$$1.stillUnsubscribed) {
          var destination = this.destination;
          destination.add(iterator$$1.subscribe(iterator$$1, i));
        } else {
          this.active--;
        }
      }
    };

    ZipSubscriber.prototype.notifyInactive = function () {
      this.active--;

      if (this.active === 0) {
        this.destination.complete();
      }
    };

    ZipSubscriber.prototype.checkIterators = function () {
      var iterators = this.iterators;
      var len = iterators.length;
      var destination = this.destination;

      for (var i = 0; i < len; i++) {
        var iterator$$1 = iterators[i];

        if (typeof iterator$$1.hasValue === 'function' && !iterator$$1.hasValue()) {
          return;
        }
      }

      var shouldComplete = false;
      var args = [];

      for (var i = 0; i < len; i++) {
        var iterator$$1 = iterators[i];
        var result = iterator$$1.next();

        if (iterator$$1.hasCompleted()) {
          shouldComplete = true;
        }

        if (result.done) {
          destination.complete();
          return;
        }

        args.push(result.value);
      }

      if (this.resultSelector) {
        this._tryresultSelector(args);
      } else {
        destination.next(args);
      }

      if (shouldComplete) {
        destination.complete();
      }
    };

    ZipSubscriber.prototype._tryresultSelector = function (args) {
      var result;

      try {
        result = this.resultSelector.apply(this, args);
      } catch (err) {
        this.destination.error(err);
        return;
      }

      this.destination.next(result);
    };

    return ZipSubscriber;
  }(Subscriber);

  var StaticIterator =
  /*@__PURE__*/
  function () {
    function StaticIterator(iterator$$1) {
      this.iterator = iterator$$1;
      this.nextResult = iterator$$1.next();
    }

    StaticIterator.prototype.hasValue = function () {
      return true;
    };

    StaticIterator.prototype.next = function () {
      var result = this.nextResult;
      this.nextResult = this.iterator.next();
      return result;
    };

    StaticIterator.prototype.hasCompleted = function () {
      var nextResult = this.nextResult;
      return nextResult && nextResult.done;
    };

    return StaticIterator;
  }();

  var StaticArrayIterator =
  /*@__PURE__*/
  function () {
    function StaticArrayIterator(array) {
      this.array = array;
      this.index = 0;
      this.length = 0;
      this.length = array.length;
    }

    StaticArrayIterator.prototype[iterator] = function () {
      return this;
    };

    StaticArrayIterator.prototype.next = function (value) {
      var i = this.index++;
      var array = this.array;
      return i < this.length ? {
        value: array[i],
        done: false
      } : {
        value: null,
        done: true
      };
    };

    StaticArrayIterator.prototype.hasValue = function () {
      return this.array.length > this.index;
    };

    StaticArrayIterator.prototype.hasCompleted = function () {
      return this.array.length === this.index;
    };

    return StaticArrayIterator;
  }();

  var ZipBufferIterator =
  /*@__PURE__*/
  function (_super) {
    __extends(ZipBufferIterator, _super);

    function ZipBufferIterator(destination, parent, observable) {
      var _this = _super.call(this, destination) || this;

      _this.parent = parent;
      _this.observable = observable;
      _this.stillUnsubscribed = true;
      _this.buffer = [];
      _this.isComplete = false;
      return _this;
    }

    ZipBufferIterator.prototype[iterator] = function () {
      return this;
    };

    ZipBufferIterator.prototype.next = function () {
      var buffer = this.buffer;

      if (buffer.length === 0 && this.isComplete) {
        return {
          value: null,
          done: true
        };
      } else {
        return {
          value: buffer.shift(),
          done: false
        };
      }
    };

    ZipBufferIterator.prototype.hasValue = function () {
      return this.buffer.length > 0;
    };

    ZipBufferIterator.prototype.hasCompleted = function () {
      return this.buffer.length === 0 && this.isComplete;
    };

    ZipBufferIterator.prototype.notifyComplete = function () {
      if (this.buffer.length > 0) {
        this.isComplete = true;
        this.parent.notifyInactive();
      } else {
        this.destination.complete();
      }
    };

    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.buffer.push(innerValue);
      this.parent.checkIterators();
    };

    ZipBufferIterator.prototype.subscribe = function (value, index) {
      return subscribeToResult(this, this.observable, this, index);
    };

    return ZipBufferIterator;
  }(OuterSubscriber);

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */

  /**
   * @this {Promise}
   */
  function finallyConstructor(callback) {
    var constructor = this.constructor;
    return this.then(function (value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        // @ts-ignore
        return constructor.reject(reason);
      });
    });
  }

  // other code modifying setTimeout (like sinon.useFakeTimers())

  var setTimeoutFunc = setTimeout;

  function isArray$2(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }

  function noop$1() {} // Polyfill for Function.prototype.bind


  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }
  /**
   * @constructor
   * @param {Function} fn
   */


  function Promise$1(fn) {
    if (!(this instanceof Promise$1)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    /** @type {!number} */

    this._state = 0;
    /** @type {!boolean} */

    this._handled = false;
    /** @type {Promise|undefined} */

    this._value = undefined;
    /** @type {!Array<!Function>} */

    this._deferreds = [];
    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }

    if (self._state === 0) {
      self._deferreds.push(deferred);

      return;
    }

    self._handled = true;

    Promise$1._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;

      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }

      var ret;

      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }

      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');

      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;

        if (newValue instanceof Promise$1) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }

      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise$1._immediateFn(function () {
        if (!self._handled) {
          Promise$1._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }

    self._deferreds = null;
  }
  /**
   * @constructor
   */


  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }
  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */


  function doResolve(fn, self) {
    var done = false;

    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise$1.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise$1.prototype.then = function (onFulfilled, onRejected) {
    // @ts-ignore
    var prom = new this.constructor(noop$1);
    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise$1.prototype['finally'] = finallyConstructor;

  Promise$1.all = function (arr) {
    return new Promise$1(function (resolve, reject) {
      if (!isArray$2(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;

            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }

          args[i] = val;

          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise$1.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise$1) {
      return value;
    }

    return new Promise$1(function (resolve) {
      resolve(value);
    });
  };

  Promise$1.reject = function (value) {
    return new Promise$1(function (resolve, reject) {
      reject(value);
    });
  };

  Promise$1.race = function (arr) {
    return new Promise$1(function (resolve, reject) {
      if (!isArray$2(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }

      for (var i = 0, len = arr.length; i < len; i++) {
        Promise$1.resolve(arr[i]).then(resolve, reject);
      }
    });
  }; // Use polyfill for setImmediate for performance gains


  Promise$1._immediateFn = // @ts-ignore
  typeof setImmediate === 'function' && function (fn) {
    // @ts-ignore
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
    value: function value(r, e) {
      if (null == this) throw new TypeError('"this" is null or not defined');
      var t = Object(this),
          n = t.length >>> 0;
      if (0 === n) return !1;

      for (var i = 0 | e, o = Math.max(i >= 0 ? i : n - Math.abs(i), 0); o < n;) {
        if (function (r, e) {
          return r === e || "number" == typeof r && "number" == typeof e && isNaN(r) && isNaN(e);
        }(t[o], r)) return !0;
        o++;
      }

      return !1;
    }
  });

  /** MIT License
   *
   * Copyright (c) 2010 Ludovic CLUBER
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
   * https://github.com/LCluber/Aias.js
   */
  var AudioContext = window.AudioContext || window.webkitAudioContext || false;

  var Request =
  /*#__PURE__*/
  function () {
    function Request(method, url, responseType, headers, eventType, data) {
      this.eventType = "promise";
      this.log = Logger.addGroup("Aias");
      this.method = method;
      this.url = url;
      this.responseType = responseType;
      this.async = true;
      this.noCache = false;
      this.headers = headers;
      this.eventType = eventType || this.eventType;
      this.data = data || null;
    }

    var _proto = Request.prototype;

    _proto.call = function call() {
      switch (this.eventType) {
        case "observable":
          return this.useObservable(this.url, this.responseType, this.data);

        default:
          return this.usePromise(this.url, this.responseType, this.data);
      }
    };

    _proto.usePromise = function usePromise(url, responseType, data) {
      var _this = this;

      return new Promise$1(function (resolve, reject) {
        var http = new XMLHttpRequest();
        url += _this.noCache ? "?cache=" + new Date().getTime() : "";
        http.open(_this.method, url, _this.async);
        http.responseType = responseType === "audiobuffer" ? "arraybuffer" : responseType;

        _this.setRequestHeaders(http);

        switch (responseType) {
          case "json":
          case "arraybuffer":
          case "audiobuffer":
          case "blob":
            http.onload = function () {
              if (http.readyState == 4) {
                if (http.status == 200) {
                  var response = http.response;

                  if (response) {
                    _this.logInfo(url, http.status, http.statusText);

                    if (responseType === "audiobuffer") {
                      if (AudioContext) {
                        var audioContext = new AudioContext();
                        audioContext.decodeAudioData(response, function (buffer) {
                          audioContext.close();
                          resolve(buffer);
                        }, function (error) {
                          _this.log.error("xhr (" + _this.method + ":" + url + ") failed with decodeAudioData error : " + error.message);

                          audioContext.close();
                          reject({
                            status: error.name,
                            statusText: error.message
                          });
                        });
                      } else {
                        _this.log.error("xhr (" + _this.method + ":" + url + ") failed with error : " + "Web Audio API is not supported by your browser.");

                        reject({
                          status: "Web Audio API not supported by your browser",
                          statusText: "Web Audio API is not supported by your browser"
                        });
                      }
                    } else {
                      resolve(response);
                    }
                  } else {
                    _this.logError(url, http.status, http.statusText);

                    reject({
                      status: http.status,
                      statusText: http.statusText
                    });
                  }
                } else {
                  _this.logError(url, http.status, http.statusText);

                  reject({
                    status: http.status,
                    statusText: http.statusText
                  });
                }
              }
            };

            break;

          default:
            http.onreadystatechange = function () {
              if (http.readyState == 4) {
                if (http.status == 200) {
                  _this.logInfo(url, http.status, http.statusText);

                  resolve(http.responseText);
                } else {
                  _this.logError(url, http.status, http.statusText);

                  reject({
                    status: http.status,
                    statusText: http.statusText
                  });
                }
              }
            };

        }

        if (isObject(data)) {
          data = JSON.stringify(data);
        }

        http.send(data || null);

        _this.log.info("xhr (" + _this.method + ":" + url + ")" + "sent");
      });
    };

    _proto.useObservable = function useObservable(url, responseType, data) {
      var _this2 = this;

      return new Observable(function (observer) {
        var http = new XMLHttpRequest();
        url += _this2.noCache ? "?cache=" + new Date().getTime() : "";
        http.open(_this2.method, url, _this2.async);
        http.responseType = responseType === "audiobuffer" ? "arraybuffer" : responseType;

        _this2.setRequestHeaders(http);

        switch (responseType) {
          case "json":
          case "arraybuffer":
          case "audiobuffer":
          case "blob":
            http.onload = function () {
              if (http.readyState == 4) {
                if (http.status == 200) {
                  var response = http.response;

                  if (response) {
                    _this2.logInfo(url, http.status, http.statusText);

                    if (responseType === "audiobuffer") {
                      if (AudioContext) {
                        var audioContext = new AudioContext();
                        audioContext.decodeAudioData(response, function (buffer) {
                          audioContext.close();
                          observer.next(buffer);
                          observer.complete();
                        }, function (error) {
                          _this2.log.error("xhr (" + _this2.method + ":" + url + ") failed with decodeAudioData error : " + error.message);

                          audioContext.close();
                          observer.error({
                            status: error.name,
                            statusText: error.message
                          });
                          observer.complete();
                        });
                      } else {
                        _this2.log.error("xhr (" + _this2.method + ":" + url + ") failed with error : " + "Web Audio API is not supported by your browser.");

                        observer.error({
                          status: "Web Audio API not supported by your browser",
                          statusText: "Web Audio API is not supported by your browser"
                        });
                        observer.complete();
                      }
                    } else {
                      observer.next(response);
                      observer.complete();
                    }
                  } else {
                    _this2.logError(url, http.status, http.statusText);

                    observer.error({
                      status: http.status,
                      statusText: http.statusText
                    });
                    observer.complete();
                  }
                } else {
                  _this2.logError(url, http.status, http.statusText);

                  observer.error({
                    status: http.status,
                    statusText: http.statusText
                  });
                  observer.complete();
                }
              }
            };

            break;

          default:
            http.onreadystatechange = function () {
              if (http.readyState == 4) {
                if (http.status == 200) {
                  _this2.logInfo(url, http.status, http.statusText);

                  observer.next(http.responseText);
                  observer.complete();
                } else {
                  _this2.logError(url, http.status, http.statusText);

                  observer.error({
                    status: http.status,
                    statusText: http.statusText
                  });
                  observer.complete();
                }
              }
            };

        }

        if (isObject(data)) {
          data = JSON.stringify(data);
        }

        http.send(data || null);

        _this2.log.info("xhr (" + _this2.method + ":" + url + ")" + "sent");
      });
    };

    _proto.setRequestHeaders = function setRequestHeaders(http) {
      for (var property in this.headers) {
        if (this.headers.hasOwnProperty(property)) {
          http.setRequestHeader(property, this.headers[property]);
        }
      }
    };

    _proto.logInfo = function logInfo(url, status, statusText) {
      this.log.info("xhr (" + this.method + ":" + url + ") done with status " + status + " " + statusText);
    };

    _proto.logError = function logError(url, status, statusText) {
      this.log.error("xhr (" + this.method + ":" + url + ") failed with status " + status + " " + statusText);
    };

    return Request;
  }();

  var HTTPHeaders = function HTTPHeaders() {};

  var METHODS = {
    GET: {
      type: "GET",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {},
      data: false
    },
    HEAD: {
      type: "HEAD",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {},
      data: false
    },
    POST: {
      type: "POST",
      defaultHeaders: {
        "Content-Type": "application/json"
      },
      headers: {},
      data: true
    },
    PUT: {
      type: "PUT",
      defaultHeaders: {
        "Content-Type": "application/json"
      },
      headers: {},
      data: true
    },
    DELETE: {
      type: "DELETE",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {},
      data: false
    },
    CONNECT: {
      type: "CONNECT",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {},
      data: false
    },
    OPTIONS: {
      type: "OPTIONS",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {},
      data: false
    },
    TRACE: {
      type: "TRACE",
      defaultHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      headers: {},
      data: false
    },
    PATCH: {
      type: "PATCH",
      defaultHeaders: {
        "Content-Type": "application/json"
      },
      headers: {},
      data: false
    }
  };

  var HTTP =
  /*#__PURE__*/
  function () {
    function HTTP() {}

    HTTP.setEventType = function setEventType(eventType) {
      this.eventType = this.isOfTypeEventType(eventType) ? eventType : "promise";
    };

    HTTP.setLogLevel = function setLogLevel(name) {
      return this.log.setLevel(name);
    };

    HTTP.getLogLevel = function getLogLevel() {
      return this.log.getLevel();
    };

    HTTP.setHeaders = function setHeaders(method, headers) {
      if (METHODS.hasOwnProperty(method)) {
        for (var property in headers) {
          if (headers.hasOwnProperty(property) && HTTPHeaders.hasOwnProperty(property)) {
            METHODS[method].headers[property] = headers[property];
          }
        }
      }
    };

    HTTP.setMockup = function setMockup(mockup) {
      var _a, _b;

      this.mockup.data = (_a = mockup.data, _a !== null && _a !== void 0 ? _a : this.mockup.data);
      this.mockup.delay = (_b = mockup.delay, _b !== null && _b !== void 0 ? _b : this.mockup.delay);
      return this.mockup;
    };

    HTTP.getMockupData = function getMockupData() {
      var _this3 = this;

      switch (this.eventType) {
        case "observable":
          return new Observable(function (observer) {
            setTimeout(function () {
              if (_this3.mockup.data) {
                observer.next(_this3.mockup.data);
                observer.complete();
              } else {
                observer.error(null);
              }
            }, _this3.mockup.delay);
          });

        default:
          return this.promiseTimeout().then(function () {
            return new Promise$1(function (resolve, reject) {
              _this3.mockup.data ? resolve(_this3.mockup.data) : reject(null);
            });
          });
      }
    };

    HTTP.get = function get(url, responseType) {
      return this.request(METHODS.GET.type, url, responseType, METHODS.GET.headers || METHODS.GET.defaultHeaders, null);
    };

    HTTP.head = function head(url, responseType) {
      return this.request(METHODS.HEAD.type, url, responseType, METHODS.HEAD.headers || METHODS.HEAD.defaultHeaders, null);
    };

    HTTP.post = function post(url, responseType, data) {
      return this.request(METHODS.POST.type, url, responseType, METHODS.POST.headers || METHODS.POST.defaultHeaders, data);
    };

    HTTP.put = function put(url, responseType, data) {
      return this.request(METHODS.PUT.type, url, responseType, METHODS.PUT.headers || METHODS.PUT.defaultHeaders, data);
    };

    HTTP.delete = function _delete(url, responseType) {
      return this.request(METHODS.DELETE.type, url, responseType, METHODS.DELETE.headers || METHODS.DELETE.defaultHeaders, null);
    };

    HTTP.connect = function connect(url, responseType) {
      return this.request(METHODS.CONNECT.type, url, responseType, METHODS.CONNECT.headers || METHODS.CONNECT.defaultHeaders, null);
    };

    HTTP.options = function options(url, responseType) {
      return this.request(METHODS.OPTIONS.type, url, responseType, METHODS.OPTIONS.headers || METHODS.OPTIONS.defaultHeaders, null);
    };

    HTTP.trace = function trace(url, responseType) {
      return this.request(METHODS.TRACE.type, url, responseType, METHODS.TRACE.headers || METHODS.TRACE.defaultHeaders, null);
    };

    HTTP.patch = function patch(url, responseType, data) {
      return this.request(METHODS.PATCH.type, url, responseType, METHODS.PATCH.headers || METHODS.PATCH.defaultHeaders, data);
    };

    HTTP.request = function request(type, url, responseType, headers, data) {
      if (this.mockup.data) {
        return this.getMockupData();
      } else {
        var request = new Request(type, url, responseType, headers, this.eventType, data || null);
        return request.call();
      }
    };

    HTTP.promiseTimeout = function promiseTimeout() {
      var _this4 = this;

      return new Promise$1(function (resolve) {
        return setTimeout(resolve, _this4.mockup.delay);
      });
    };

    HTTP.isOfTypeEventType = function isOfTypeEventType(eventType) {
      return ["promise", "observable"].includes(eventType);
    };

    return HTTP;
  }();

  HTTP.log = Logger.addGroup("Aias");
  HTTP.eventType = "promise";
  HTTP.mockup = {
    data: null,
    delay: 200
  };

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

  var LEVELS$1 = {
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
      id: 4,
      name: "trace",
      color: "#17a2b8"
    },
    warn: {
      id: 5,
      name: "warn",
      color: "#ffc107"
    },
    error: {
      id: 6,
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
      return this._console && LEVELS$1[this._level].id <= messageId;
    };

    _createClass(Options, [{
      key: "level",
      set: function set(name) {
        this._level = LEVELS$1.hasOwnProperty(name) ? name : this._level;
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

  function addZero$1(value) {
    return value < 10 ? "0" + value : value;
  }

  function formatDate$1() {
    var now = new Date();
    var date = [addZero$1(now.getMonth() + 1), addZero$1(now.getDate()), now.getFullYear().toString().substr(-2)];
    var time = [addZero$1(now.getHours()), addZero$1(now.getMinutes()), addZero$1(now.getSeconds())];
    return date.join("/") + " " + time.join(":");
  }

  var Log =
  /*#__PURE__*/
  function () {
    function Log(level, content) {
      this.id = level.id;
      this.name = level.name;
      this.color = level.color;
      this.content = content;
      this.date = formatDate$1();
    }

    var _proto = Log.prototype;

    _proto.display = function display(groupName) {
      var name = this.name === "time" ? "info" : this.name;
      console[name]("%c[" + groupName + "] " + this.date + " : ", "color:" + this.color + ";", this.content);
    };

    return Log;
  }();

  var Timer = function Timer(key) {
    this.key = key;
    this.timestamp = new Date().getTime();
  };

  var Group$1 =
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

    _proto.info = function info(log) {
      this.log(LEVELS$1.info, log);
    };

    _proto.trace = function trace(log) {
      this.log(LEVELS$1.trace, log);
    };

    _proto.time = function time(key) {
      var index = this.timers.findIndex(function (element) {
        return element.key === key;
      });

      if (index > -1) {
        var newTimestamp = new Date().getTime();
        var delta = newTimestamp - this.timers[index].timestamp;
        this.log(LEVELS$1.time, key + " completed in " + delta + " ms");
        this.timers.splice(index, 1);
      } else {
        this.addTimer(key);
        this.log(LEVELS$1.time, key + " started");
      }
    };

    _proto.warn = function warn(log) {
      this.log(LEVELS$1.warn, log);
    };

    _proto.error = function error(log) {
      this.log(LEVELS$1.error, log);
    };

    _proto.initLogs = function initLogs() {
      this.logs = [];
    };

    _proto.log = function log(level, _log) {
      var message = new Log(level, _log);
      this.addLog(message);

      if (this.options.displayMessage(message.id)) {
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

  var Logger$1 =
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

    Logger.getGroup = function getGroup(name) {
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

        if (group.name === name) {
          return group;
        }
      }

      return null;
    };

    Logger.displayConsole = function displayConsole(value) {
      this.options.console = value;

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
        group.displayConsole(this.options.console);
      }

      return this.options.console;
    };

    Logger.addGroup = function addGroup(name) {
      return this.getGroup(name) || this.createGroup(name);
    };

    Logger.sendLogs = function sendLogs(url, headers) {
      var _this = this;

      var logs = [];

      if (headers) {
        HTTP.setHeaders("POST", headers);
      }

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
        logs.push.apply(logs, group.logs);
      }

      return HTTP.post(url, "json", logs).then(function (response) {
        for (var _iterator5 = _this.groups, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
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
          group.initLogs();
        }

        return response;
      }).catch(function (err) {
        console.log("error", err);
        return err;
      });
    };

    Logger.createGroup = function createGroup(name) {
      var group = new Group$1(name, this.options);
      this.groups.push(group);
      return group;
    };

    return Logger;
  }();
  Logger$1.groups = [];
  Logger$1.options = new Options();

  exports.Logger = Logger$1;

  return exports;

}({}));
