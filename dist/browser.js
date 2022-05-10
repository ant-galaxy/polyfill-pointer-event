(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@oasisEngine/pointerPolyfill"] = {}));
})(this, (function (exports) { 'use strict';

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  var PointerEvent = /*#__PURE__*/function (_Event) {
    _inheritsLoose(PointerEvent, _Event);

    function PointerEvent(type) {
      var _this;

      _this = _Event.call(this, type) || this;
      _this.pointerType = void 0;
      _this.pointerId = void 0;
      _this.offsetX = void 0;
      _this.offsetY = void 0;
      return _this;
    }

    PointerEvent.createFromTouch = function createFromTouch(type, touch) {
      var e = new PointerEvent(type);
      e.pointerType = "touch";
      e.pointerId = (touch.identifier || 0) + 2;
      e.offsetX = touch.pageX - PointerPolyfill.canvas.offsetLeft;
      e.offsetY = touch.pageY - PointerPolyfill.canvas.offsetTop;
      return e;
    };

    return PointerEvent;
  }( /*#__PURE__*/_wrapNativeSuper(Event));

  var PointerPolyfill = /*#__PURE__*/function () {
    function PointerPolyfill() {}

    PointerPolyfill.register = function register(canvas) {
      if (window.PointerEvent) {
        console.info("支持 PointerEvent ");
        return;
      }

      if (PointerPolyfill.canvas) {
        if (PointerPolyfill.canvas === canvas) {
          console.info("已经注册了画布", canvas);
          return;
        } else {
          PointerPolyfill.unregister();
        }
      }

      PointerPolyfill.canvas = canvas;
      canvas.addEventListener("touchstart", PointerPolyfill.onTouchStart);
      canvas.addEventListener("touchmove", PointerPolyfill.onTouchMove);
      canvas.addEventListener("touchend", PointerPolyfill.onTouchEnd);
      canvas.addEventListener("touchcancel", PointerPolyfill.onTouchCancel);
    };

    PointerPolyfill.unregister = function unregister() {
      if (PointerPolyfill.canvas) {
        var canvas = PointerPolyfill.canvas;
        canvas.removeEventListener("touchstart", PointerPolyfill.onTouchStart);
        canvas.removeEventListener("touchmove", PointerPolyfill.onTouchMove);
        canvas.removeEventListener("touchend", PointerPolyfill.onTouchEnd);
        canvas.removeEventListener("touchcancel", PointerPolyfill.onTouchCancel);
        PointerPolyfill.canvas = null;
      }
    };

    PointerPolyfill.onTouchStart = function onTouchStart(evt) {
      var canvas = PointerPolyfill.canvas;

      if (!canvas) {
        return;
      }

      var changedTouches = evt.changedTouches || evt.touches;

      for (var i = 0; i < changedTouches.length; i++) {
        // @ts-ignore
        canvas.onpointerdown(PointerEvent.createFromTouch("pointerdown", changedTouches[i]));
      }
    };

    PointerPolyfill.onTouchEnd = function onTouchEnd(evt) {
      var canvas = PointerPolyfill.canvas;

      if (!canvas) {
        return;
      }

      var changedTouches = evt.changedTouches || evt.touches;

      for (var i = 0; i < changedTouches.length; i++) {
        var touch = changedTouches[i]; // @ts-ignore

        canvas.onpointerup(PointerEvent.createFromTouch("pointerup", touch)); // @ts-ignore

        canvas.onpointerout(PointerEvent.createFromTouch("pointerout", touch));
      }
    };

    PointerPolyfill.onTouchMove = function onTouchMove(evt) {
      var canvas = PointerPolyfill.canvas;

      if (!canvas) {
        return;
      }

      var changedTouches = evt.changedTouches || evt.touches;

      for (var i = 0; i < changedTouches.length; i++) {
        // @ts-ignore
        canvas.onpointermove(PointerEvent.createFromTouch("pointermove", changedTouches[i]));
      }
    };

    PointerPolyfill.onTouchCancel = function onTouchCancel(evt) {
      var canvas = PointerPolyfill.canvas;

      if (!canvas) {
        return;
      }

      var changedTouches = evt.changedTouches || evt.touches;

      for (var i = 0; i < changedTouches.length; i++) {
        // @ts-ignore
        canvas.onpointerout(PointerEvent.createFromTouch("pointerout", changedTouches[i]));
      }
    };

    return PointerPolyfill;
  }();
  PointerPolyfill.canvas = void 0;

  exports.PointerPolyfill = PointerPolyfill;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
