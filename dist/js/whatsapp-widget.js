/*!
  * WhatsApp Widget v1.0.0 (c) 2020 - Fajar Setya Budi
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

  function _readOnlyError(name) {
    throw new Error("\"" + name + "\" is read-only");
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var CLASS_NAME_WIDGET_TOGGLE = 'wa-widget-toggle';
  var CLASS_NAME_WIDGET_CONTENT = 'wa-widget-content';
  var CLASS_NAME_WIDGET_EXPANDED = 'expanded';
  var CLASS_NAME_WIDGET_FORM_REQUIRED = 'required';
  var SELECTOR_VALUE_TOGGLE_CHAT = 'wa-chat';
  var SELECTOR_VALUE_TOGGLE_SEND = 'wa-send';
  var SELECTOR_CHAT_WIDGET = '[data-chat]';
  var SELECTOR_DATA_TOGGLE_CHAT = "[data-toggle=\"".concat(SELECTOR_VALUE_TOGGLE_CHAT, "\"]");
  var SELECTOR_DATA_TOGGLE_SEND = "[data-toggle=\"".concat(SELECTOR_VALUE_TOGGLE_SEND, "\"]");
  var SELECTOR_DATA_MESSAGE = "[data-message]";
  var DefaultConfig = {
    name: '',
    division: '',
    photo: '',
    introduction: '',
    nameInput: true,
    emailInput: false,
    subjectInput: false,
    messageInput: true
  };
  var DefaultType = {
    name: 'string',
    division: 'string',
    photo: 'string',
    introduction: 'string',
    nameInput: 'boolean',
    emailInput: 'boolean',
    subjectInput: 'boolean',
    messageInput: 'boolean'
  };
  var ChatData = {};
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Chat = /*#__PURE__*/function () {
    function Chat(element, config) {
      _classCallCheck(this, Chat);

      if (ChatData[element.id]) return;
      this._element = element;
      this._config = this._getConfig(config);
      this._phoneNumber = this._element.getAttribute('action');
      this._isShown = false;
      this._toggleChat = '';
      this._contentElement = '';
      this._toggleSend = '';

      this._buildHTML();

      this._cacheElements();

      ChatData[element.id] = this;
    } // PUBLIC


    _createClass(Chat, [{
      key: "toggle",
      value: function toggle() {
        this._isShown ? this._hide() : this._show();
      } // PRIVATE

    }, {
      key: "_sendMessage",
      value: function _sendMessage() {
        var _this = this;

        var send_url = 'https://web.whatsapp.com/send';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) send_url = (_readOnlyError("send_url"), 'whatsapp://send');

        var inputs = this._element.querySelectorAll(SELECTOR_DATA_MESSAGE);

        var parameters = send_url + '?phone=' + this._phoneNumber + '&text=';
        var valid = true;
        inputs.forEach(function (item) {
          if (!_this._formValidation(item)) return valid = false;
          var title = item.getAttribute('data-message');
          parameters += title.replace(/^./, title[0].toUpperCase()) + ': ' + item.value + ';\n';
        });
        if (valid) window.open(parameters, '_blank');
      }
    }, {
      key: "_buildHTML",
      value: function _buildHTML() {
        if (this._element.innerHTML) return false;
        var HTML_ELEMENT_INPUT_NAME = this._config.nameInput ? '<input data-message="name" type="text" placeholder="Name" required>' : '';
        var HTML_ELEMENT_INPUT_EMAIL = this._config.emailInput ? '<input data-message="email" type="email" placeholder="Email" required>' : '';
        var HTML_ELEMENT_INPUT_SUBJECT = this._config.subjectInput ? '<input data-message="subject" type="text" placeholder="Subject" required>' : '';
        var HTML_ELEMENT_INPUT_MESSAGE = this._config.messageInput ? '<input data-message="message" type="text" placeholder="Message" required>' : '';
        var HTML_ELEMENT_WIDGET_MAIN = "<a class=\"".concat(CLASS_NAME_WIDGET_TOGGLE, "\" data-toggle=\"").concat(SELECTOR_VALUE_TOGGLE_CHAT, "\" data-target=\"#").concat(this._element.id, "\" href=\"#").concat(this._element.id, "\">\n                <svg viewBox=\"0 0 90 90\" fill=\"rgb(79, 206, 93)\" width=\"32\" height=\"32\">\n                    <path\n                        d=\"M90,43.841c0,24.213-19.779,43.841-44.182,43.841c-7.747,0-15.025-1.98-21.357-5.455L0,90l7.975-23.522   c-4.023-6.606-6.34-14.354-6.34-22.637C1.635,19.628,21.416,0,45.818,0C70.223,0,90,19.628,90,43.841z M45.818,6.982   c-20.484,0-37.146,16.535-37.146,36.859c0,8.065,2.629,15.534,7.076,21.61L11.107,79.14l14.275-4.537   c5.865,3.851,12.891,6.097,20.437,6.097c20.481,0,37.146-16.533,37.146-36.857S66.301,6.982,45.818,6.982z M68.129,53.938   c-0.273-0.447-0.994-0.717-2.076-1.254c-1.084-0.537-6.41-3.138-7.4-3.495c-0.993-0.358-1.717-0.538-2.438,0.537   c-0.721,1.076-2.797,3.495-3.43,4.212c-0.632,0.719-1.263,0.809-2.347,0.271c-1.082-0.537-4.571-1.673-8.708-5.333   c-3.219-2.848-5.393-6.364-6.025-7.441c-0.631-1.075-0.066-1.656,0.475-2.191c0.488-0.482,1.084-1.255,1.625-1.882   c0.543-0.628,0.723-1.075,1.082-1.793c0.363-0.717,0.182-1.344-0.09-1.883c-0.27-0.537-2.438-5.825-3.34-7.977   c-0.902-2.15-1.803-1.792-2.436-1.792c-0.631,0-1.354-0.09-2.076-0.09c-0.722,0-1.896,0.269-2.889,1.344   c-0.992,1.076-3.789,3.676-3.789,8.963c0,5.288,3.879,10.397,4.422,11.113c0.541,0.716,7.49,11.92,18.5,16.223   C58.2,65.771,58.2,64.336,60.186,64.156c1.984-0.179,6.406-2.599,7.312-5.107C68.398,56.537,68.398,54.386,68.129,53.938z\">\n                    </path>\n                </svg>\n            </a>\n            <div class=\"").concat(CLASS_NAME_WIDGET_CONTENT, " chat-tab\">\n                <header class=\"chat-header\">\n                    <div class=\"chat-admin-picture\">\n                        <img src=\"").concat(this._config.photo, "\" alt=\"").concat(this._config.name, "'s Photos\">\n                    </div>\n                    <div class=\"chat-admin-details\">\n                        <h4>").concat(this._config.name, "</h4>\n                        <p><small>").concat(this._config.division, "</small></p>\n                    </div>\n                </header>\n                <div class=\"chat-content\">\n                    <div class=\"chat-item\">\n                        <p>").concat(this._config.introduction, "</p>\n                    </div>\n                </div>\n                <div class=\"chat-form\">\n                    ").concat(HTML_ELEMENT_INPUT_NAME, "\n                    ").concat(HTML_ELEMENT_INPUT_EMAIL, "\n                    ").concat(HTML_ELEMENT_INPUT_SUBJECT, "\n                    ").concat(HTML_ELEMENT_INPUT_MESSAGE, "\n                    <button class=\"chat-send\" type=\"submit\" data-toggle=\"").concat(SELECTOR_VALUE_TOGGLE_SEND, "\"><strong>Send</strong></button>\n                </div>\n            </div>");

        this._element.insertAdjacentHTML('afterbegin', HTML_ELEMENT_WIDGET_MAIN);

        return true;
      }
    }, {
      key: "_cacheElements",
      value: function _cacheElements() {
        var _this2 = this;

        this._toggleChat = document.querySelector("".concat(SELECTOR_DATA_TOGGLE_CHAT, "[data-target=\"#").concat(this._element.id, "\"]"));
        this._contentElement = this._element.getElementsByClassName(CLASS_NAME_WIDGET_CONTENT).item(0);
        this._toggleSend = this._element.querySelector(SELECTOR_DATA_TOGGLE_SEND);

        if (this._toggleChat) {
          this._toggleChat.addEventListener("click", function (e) {
            e.preventDefault();

            _this2.toggle();
          });
        }

        if (this._toggleSend) {
          this._toggleSend.addEventListener('click', function (e) {
            e.preventDefault();

            _this2._sendMessage();
          });
        }
      }
    }, {
      key: "_show",
      value: function _show() {
        var _this3 = this;

        this._element.classList.add(CLASS_NAME_WIDGET_EXPANDED);

        this._toggleChat.classList.add(CLASS_NAME_WIDGET_EXPANDED);

        this._contentElement.classList.add(CLASS_NAME_WIDGET_EXPANDED);

        this._isShown = true;
        Object.keys(ChatData).forEach(function (key) {
          if (key !== _this3._element.id && ChatData[key]._isShown) ChatData[key].toggle();
        });
      }
    }, {
      key: "_hide",
      value: function _hide() {
        this._element.classList.remove(CLASS_NAME_WIDGET_EXPANDED);

        this._toggleChat.classList.remove(CLASS_NAME_WIDGET_EXPANDED);

        this._contentElement.classList.remove(CLASS_NAME_WIDGET_EXPANDED);

        this._isShown = false;
      }
    }, {
      key: "_formValidation",
      value: function _formValidation(formElement) {
        if (!formElement.required) return true;
        formElement.classList.remove(CLASS_NAME_WIDGET_FORM_REQUIRED);

        switch (formElement.type) {
          case 'email':
            if (!/^\S+@\S+$/.test(formElement.value)) {
              formElement.classList.add(CLASS_NAME_WIDGET_FORM_REQUIRED);
              return false;
            }

            break;

          default:
            if (formElement.value == '' || formElement.value == null) {
              formElement.classList.add(CLASS_NAME_WIDGET_FORM_REQUIRED);
              return false;
            }

            break;
        }

        return true;
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
        var _this4 = this;

        Object.keys(configTypes).forEach(function (property) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && _this4._isElement(value) ? 'element' : _this4._toType(value);

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

  document.body.onload = function () {
    var chatSelector = document.querySelectorAll(SELECTOR_CHAT_WIDGET);

    for (var i = 0; i < chatSelector.length; i++) {
      var element = chatSelector[i];
      var data = new Chat(element, {});
    }
  };

  return Chat;

})));
