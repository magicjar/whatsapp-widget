/*!
  * WhatsApp Widget v1.0.0 (c) 2020 - undefined
  * Contributors (https://github.com/agraris/whatsapp-widget/graphs/contributors)
  * Licensed under MIT (https://github.com/agraris/whatsapp-widget/blob/master/LICENSE)
  * WhatsApp Widget does not affiliate with WhatsApp Inc. in any way.
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.WhatsAppWidget = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var CLASS_NAME_WIDGET_CONTAINER = 'wa-widget';
  var CLASS_NAME_WIDGET_COLLAPSED = 'collapsed';
  var CLASS_NAME_WIDGET_TOGGLE = 'wa-widget-toggle';
  var CLASS_NAME_WIDGET_CONTENT = 'wa-widget-content';
  var DefaultConfig = {
    show: false,
    theme: 'default',
    phoneNumber: '62891234567890',
    name: 'Fajar Setya Budi',
    division: 'Customer Supports',
    photo: '',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  };
  var DefaultType = {
    show: 'boolean',
    theme: 'string',
    phoneNumber: 'string',
    name: 'string',
    division: 'string',
    photo: 'string',
    introduction: 'string'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Chat = /*#__PURE__*/function () {
    function Chat(element, config) {
      _classCallCheck(this, Chat);

      this._element = document.querySelector(".".concat(CLASS_NAME_WIDGET_CONTAINER, "[data-chat=\"").concat(element, "\"]"));
      this._elementInnerHTML = this._element;
      this._config = this._getConfig(config);
      this._isShown = this._config.show ? true : false;
      this._toggleElement = '';
      this._contentElement = '';
    } // PUBLIC


    _createClass(Chat, [{
      key: "init",
      value: function init() {
        this._buildHTML();
      } // PRIVATE

    }, {
      key: "_toggle",
      value: function _toggle() {
        console.log('TOGGLED');
        this._isShown ? this._hide() : this._show();
      }
    }, {
      key: "_buildHTML",
      value: function _buildHTML() {
        var _this = this;

        this._element.innerHTML = '';

        var _collapsed = this._isShown ? CLASS_NAME_WIDGET_COLLAPSED : '';

        var HTML_ELEMENT_WIDGET_MAIN = "<div class=\"".concat(CLASS_NAME_WIDGET_TOGGLE, " ").concat(_collapsed, "\"></div>\n        <div class=\"").concat(CLASS_NAME_WIDGET_CONTENT, " chat-tab ").concat(_collapsed, "\">\n            <header class=\"chat-header\">\n                <img class=\"chat-admin-picture\" src=\"").concat(this._config.photo, "\" alt=\"").concat(this._config.name, "'s Photos\">\n                <div class=\"chat-admin-details\">\n                    <h3>").concat(this._config.name, "</h3>\n                    <p>").concat(this._config.division, "</p>\n                </div>\n            </header>\n            <div class=\"chat-content\">\n                <div class=\"chat-item\">\n                    <img class=\"chat-admin-picture\" src=\"").concat(this._config.photo, "\" alt=\"").concat(this._config.name, "'s Photos\">\n                    <div>\n                        <p>").concat(this._config.introduction, "</p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"chat-form\">\n                <input type=\"text\" placeholder=\"Your message\">\n                <button class=\"chat-send\" type=\"submit\"><strong>Send</strong></button>\n            </div>\n        </div>");
        this._elementInnerHTML = this._element.insertAdjacentHTML('afterbegin', HTML_ELEMENT_WIDGET_MAIN);
        this._toggleElement = this._element.getElementsByClassName("".concat(CLASS_NAME_WIDGET_TOGGLE)).item(0);
        this._contentElement = this._element.getElementsByClassName("".concat(CLASS_NAME_WIDGET_CONTENT)).item(0);

        this._toggleElement.addEventListener("click", function () {
          _this._toggle();
        });

        this._isShown ? this._expandSection() : this._collapseSection();
      }
    }, {
      key: "_show",
      value: function _show() {
        console.log('SHOW');
        this._isShown = true;

        this._element.classList.add(CLASS_NAME_WIDGET_COLLAPSED);

        this._toggleElement.classList.add(CLASS_NAME_WIDGET_COLLAPSED);

        this._contentElement.classList.add(CLASS_NAME_WIDGET_COLLAPSED);

        this._expandSection();
      }
    }, {
      key: "_hide",
      value: function _hide() {
        console.log('HIDE');
        this._isShown = false;

        this._element.classList.remove(CLASS_NAME_WIDGET_COLLAPSED);

        this._toggleElement.classList.remove(CLASS_NAME_WIDGET_COLLAPSED);

        this._contentElement.classList.remove(CLASS_NAME_WIDGET_COLLAPSED);

        this._collapseSection();
      }
    }, {
      key: "_expandSection",
      value: function _expandSection() {
        var element = this._element;
        var contentElement = this._contentElement;
        element.style.width = contentElement.scrollWidth + 'px';
      }
    }, {
      key: "_collapseSection",
      value: function _collapseSection() {
        var element = this._element;
        var toggleElement = this._toggleElement;
        element.style.width = toggleElement.scrollWidth + 'px';
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread2(_objectSpread2({}, DefaultConfig), config);

        this._typeCheckConfig('Widget', config, DefaultType);

        return config;
      }
    }, {
      key: "_typeCheckConfig",
      value: function _typeCheckConfig(componentName, config, configTypes) {
        var _this2 = this;

        Object.keys(configTypes).forEach(function (property) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && _this2._isElement(value) ? 'element' : _this2._toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error("".concat(componentName.toUpperCase(), ": ") + "Option \"".concat(property, "\" provided type \"").concat(valueType, "\" ") + "but expected type \"".concat(expectedTypes, "\"."));
          }
        });
      }
    }, {
      key: "_isElement",
      value: function _isElement(obj) {
        (obj[0] || obj).nodeType;
      } // AngusCroll (https://goo.gl/pxwQGp)

    }, {
      key: "_toType",
      value: function _toType(obj) {
        if (obj === null || obj === undefined) {
          return "".concat(obj);
        }

        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      }
    }]);

    return Chat;
  }();

  return Chat;

})));
