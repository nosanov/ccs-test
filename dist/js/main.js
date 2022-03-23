(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Anchor = /*#__PURE__*/function () {
  function Anchor(el) {
    _classCallCheck(this, Anchor);

    this.link = document.querySelector(el); // standard or advanced

    this.headerBehaviour = 'standard';
    this.animationDuration = 600;
    this.init();
  }

  _createClass(Anchor, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (this.link) {
        this.link.addEventListener('click', function (ev) {
          ev.preventDefault();
          var target = document.querySelector(_this.link.getAttribute('href'));

          if (target) {
            header.classList.add('header--freezed');
            var headerHeight = document.querySelector('header').getBoundingClientRect().height;
            var offset = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({
              top: offset,
              behaviour: 'smooth'
            });
            setTimeout(function () {
              header.classList.remove('header--freezed');
            }, _this.animationDuration);
          } else {
            console.error('Anchor\'s target not found!');
          }
        });
      }
    }
  }]);

  return Anchor;
}();

exports["default"] = Anchor;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Form = /*#__PURE__*/function () {
  function Form(el) {
    var _this = this;

    _classCallCheck(this, Form);

    this.el = el;
    this.form = document.querySelector(this.el);
    this.form.addEventListener('submit', function (evt) {
      _this.send(evt);
    });
    this.setInputListeners();
    this.setRange();
  }

  _createClass(Form, [{
    key: "setInputListeners",
    value: function setInputListeners() {
      var textInputs = this.form.querySelectorAll('.order__input');
      var fileInput = this.form.querySelector('.order__file label');
      textInputs.forEach(function (input) {
        var label = input.parentElement.querySelector('label');
        input.addEventListener('focus', function () {
          label.classList.add('hidden');
        });
        input.addEventListener('blur', function () {
          if (input.value.length < 1) {
            label.classList.remove('hidden');
          }
        });
        input.addEventListener('keyup', function () {
          input.classList.remove('invalid');
        });
      }); // remove red border when click on button

      fileInput.addEventListener('click', function () {
        fileInput.classList.remove('invalid');
      });
    }
  }, {
    key: "setRange",
    value: function setRange() {
      var range = this.form.querySelector('.order__input-range');
      var valueField = this.form.querySelector('#range__value');
      valueField.innerText = range.value + '%';
      range.addEventListener('input', function () {
        valueField.innerText = range.value + '%';
      });
    }
  }, {
    key: "send",
    value: function send(evt) {
      evt.preventDefault();
      var data = {};

      function showWrongField(input) {
        input.classList.add('invalid');
      }

      function resetWrongField(input) {
        input.classList.remove('invalid');
      }

      var type = this.form.querySelector('option[selected]');
      var typeCustom = this.form.querySelector('.order__select-title');
      var email = this.form.querySelector('input[name="email"]');
      var emailValue = email.value;
      var name = this.form.querySelector('input[name="name"]');
      var nameValue = name.value;
      var range = this.form.querySelector('input[name="range"]');
      var rangeValue = range.value + '%';
      var file = this.form.querySelector('input[name="file"]');
      var fileBtn = this.form.querySelector('.order__file label');
      var fileValue = file.files[0];

      function checkSelect() {
        if (type) {
          resetWrongField(typeCustom);
          return true;
        }

        showWrongField(typeCustom);
        return false;
      }

      function checkName() {
        if (nameValue.length > 0) return true;
        showWrongField(name);
        return false;
      }

      function checkEmail() {
        var validString = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var isValid = new RegExp(validString);
        if (isValid.test(emailValue)) return true;
        showWrongField(email);
        return false;
      }

      function checkFile() {
        if (fileValue) {
          resetWrongField(fileBtn);
          return true;
        }

        showWrongField(fileBtn);
        return false;
      }

      if (checkSelect() && checkEmail() && checkName() && checkFile()) {
        data.type = type.value;
        data.name = nameValue;
        data.email = emailValue;
        data.range = rangeValue;
        data.file = fileValue;
        console.log('data is: ', data);
      }
    }
  }]);

  return Form;
}();

exports["default"] = Form;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Header = /*#__PURE__*/function () {
  function Header(el) {
    _classCallCheck(this, Header);

    this.el = el;
    this.header = document.querySelector(this.el);
    this.init();
    this.setLinkListeners();
  }

  _createClass(Header, [{
    key: "init",
    value: function init() {
      if (this.header) {
        var behaviour = this.header.dataset.behaviour;

        switch (behaviour) {
          case 'standard':
            this.initStandardBehaviour();
            break;

          case 'fixed':
            // nothing to do, just css-fixed header
            break;

          default:
            this.initStandardBehaviour();
        }

        this.changeMenuBtnState();
      }
    }
    /*
    ** when scroll down we should hide 'header'
    */

  }, {
    key: "initStandardBehaviour",
    value: function initStandardBehaviour() {
      var prev_scroll_position = 0;
      var last_known_scroll_position = 0;
      var ticking = false;

      function toggleHeader(last_scroll_pos, prev_scroll_pos) {
        if (!header.classList.contains('header--freezed')) {
          if (last_scroll_pos > prev_scroll_pos) {
            // scrolled down
            header.classList.add('header--collapsed');
          } else {
            // scrolled up
            header.classList.remove('header--collapsed');
          }

          prev_scroll_position = last_known_scroll_position;
        }
      }

      window.addEventListener('scroll', function (ev) {
        last_known_scroll_position = window.scrollY;

        if (!ticking) {
          window.requestAnimationFrame(function () {
            toggleHeader(last_known_scroll_position, prev_scroll_position);
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  }, {
    key: "setLinkListeners",
    value: function setLinkListeners() {
      var _this = this;

      var links = this.header.querySelectorAll('.header__link');
      links.forEach(function (link) {
        link.addEventListener('click', function () {
          if (_this.header.querySelector('.header__link_active')) {
            _this.header.querySelector('.header__link_active').classList.remove('header__link_active');
          }

          link.classList.toggle('header__link_active');
        });
      });
    }
    /*
    ** change state for menu button
    */

  }, {
    key: "changeMenuBtnState",
    value: function changeMenuBtnState() {
      var menuBtn = this.header.querySelector('.header__menu-button');

      if (menuBtn) {
        menuBtn.addEventListener('click', function () {
          menuBtn.classList.toggle('header__menu-button_opened');
        });
      }
    }
  }]);

  return Header;
}();

exports["default"] = Header;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initOwlCarousel = initOwlCarousel;

function initOwlCarousel() {
  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 30,
    nav: false,
    autoWidth: true,
    items: 5,
    responsive: {
      1440: {
        mouseDrag: false
      }
    }
  });
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Popup = /*#__PURE__*/function () {
  function Popup(el) {
    var _this = this;

    _classCallCheck(this, Popup);

    this.el = el;
    this.popUp = document.getElementById(this.el);
    this.closeBtn = this.popUp.querySelector('.pop-up__close');
    this.links = this.popUp.querySelectorAll('a[data-type="anchor"]');
    document.querySelectorAll('[data-for="pop-up"]').forEach(function (button) {
      if (button.dataset.target == _this.el) {
        _this.openBtn = button;
      }
    });

    if (!this.openBtn) {
      console.error(this.popUp, 'has no open button');
    } else {
      if (!this.closeBtn) {
        // same button
        this.closeBtn = this.openBtn;
        this.closeBtn.setAttribute('data-state', 'closed');
        this.openBtn.addEventListener('click', function () {
          _this.toggle(_this.popUp);
        });
      } else {
        this.openBtn.addEventListener('click', function () {
          _this.show(_this.popUp);
        });
        this.closeBtn.addEventListener('click', function () {
          _this.hide(_this.popUp);
        });
      }
    }

    this.links.forEach(function (link) {
      link.addEventListener('click', function () {
        var menuBtn = document.querySelector('.header__menu-button');

        if (menuBtn) {
          menuBtn.classList.toggle('header__menu-button_opened');
        }

        _this.toggle(_this.popUp);
      });
    });
  }

  _createClass(Popup, [{
    key: "toggle",
    value: function toggle(popUp) {
      if (this.closeBtn.dataset.state == 'closed') {
        popUp.classList.add('visible');
        document.body.classList.add('fixed');
        this.closeBtn.setAttribute('data-state', 'opened');
      } else {
        popUp.classList.remove('visible');
        document.body.classList.remove('fixed');
        this.closeBtn.setAttribute('data-state', 'closed');
      }
    }
  }, {
    key: "show",
    value: function show(popUp) {
      popUp.classList.add('visible');
      document.body.classList.add('fixed');
    }
  }, {
    key: "hide",
    value: function hide(popUp) {
      popUp.classList.remove('visible');
      document.body.classList.remove('fixed');
    }
  }]);

  return Popup;
}();

exports["default"] = Popup;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = initSelect;

function initSelect() {
  var select = document.querySelector('#system-type');

  if (select) {
    (function () {
      var parent = select.parentElement; // container for title

      var selectTitle = document.createElement('div');
      selectTitle.classList.add('order__select-title', 'order__input'); // container for other options (needs for scroll-padding)

      var selectOptionsContainer = document.createElement('div');
      selectOptionsContainer.classList.add('order__select-container');
      var selectOptions = document.createElement('div');
      selectOptions.classList.add('order__select-options');
      var options = select.querySelectorAll('option'); // first option for title

      selectTitle.innerText = options[0].text; // set up events for title

      selectTitle.addEventListener('click', function () {
        selectTitle.classList.toggle('opened');
        selectOptionsContainer.classList.toggle('opened');
      }); // from 2nd option for other elements

      var _loop = function _loop(i) {
        var selectOption = document.createElement('div');
        selectOption.innerText = options[i].text;
        selectOptions.appendChild(selectOption); // set up events for options

        selectOption.addEventListener('click', function () {
          if (parent.querySelector('.order__select-options .selected') && parent.querySelector('option.selected')) {
            parent.querySelector('option.selected').removeAttribute('selected');
            parent.querySelector('option.selected').classList.remove('selected');
            parent.querySelector('.order__select-options .selected').classList.remove('selected');
          }

          options[i].classList.add('selected');
          options[i].setAttribute('selected', '');
          selectOption.classList.add('selected');
          selectTitle.innerText = selectOption.textContent;
          selectTitle.classList.toggle('opened');
          selectOptionsContainer.classList.toggle('opened');
          selectTitle.classList.remove('invalid');
        });
      };

      for (var i = 1; i < options.length; i++) {
        _loop(i);
      }

      selectOptionsContainer.appendChild(selectOptions);
      parent.appendChild(selectTitle);
      parent.appendChild(selectOptionsContainer);
    })();
  }
}

},{}],7:[function(require,module,exports){
"use strict";

var _header = _interopRequireDefault(require("./components/header"));

var _popUp = _interopRequireDefault(require("./components/pop-up"));

var _anchor = _interopRequireDefault(require("./components/anchor"));

var _owl = require("./components/owl");

var _lazyload = _interopRequireDefault(require("../../../test-layout/src/js/components/lazyload"));

var _select = _interopRequireDefault(require("./components/select"));

var _form = _interopRequireDefault(require("./components/form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', function () {
  // init pop-ups
  document.querySelectorAll('[data-for="pop-up"]').forEach(function (button) {
    var popUp = new _popUp["default"](button.dataset.target);
  }); // init header

  var header = new _header["default"]('#header'); // init forms

  var form = new _form["default"]('#order__form'); // init anchors

  var link = new _anchor["default"]('[data-type="anchor"]'); // init carousel

  (0, _owl.initOwlCarousel)(); // load images

  (0, _lazyload["default"])(); // init select

  (0, _select["default"])();
});

},{"../../../test-layout/src/js/components/lazyload":8,"./components/anchor":1,"./components/form":2,"./components/header":3,"./components/owl":4,"./components/pop-up":5,"./components/select":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function initLazyload() {
  var imgObserver = new IntersectionObserver(function (entries, self) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        lazyLoad(entry.target);
        self.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll('.lazy-picture').forEach(function (picture) {
    imgObserver.observe(picture);
  });

  var lazyLoad = function lazyLoad(picture) {
    var img = picture.querySelector('img') || picture;
    var sources = picture.querySelectorAll('source');
    sources.forEach(function (source) {
      source.srcset = source.dataset.srcset;
      source.removeAttribute('data-srcset');
    });

    if (img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  };
}

var _default = initLazyload;
exports["default"] = _default;

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tcG9uZW50cy9hbmNob3IuanMiLCJzcmMvanMvY29tcG9uZW50cy9mb3JtLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvb3dsLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvcG9wLXVwLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2VsZWN0LmpzIiwic3JjL2pzL21haW4uanMiLCIuLi90ZXN0LWxheW91dC9zcmMvanMvY29tcG9uZW50cy9sYXp5bG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7SUNBcUIsTTtBQUVqQixrQkFBWSxFQUFaLEVBQWdCO0FBQUE7O0FBQ1osU0FBSyxJQUFMLEdBQVksUUFBUSxDQUFDLGFBQVQsQ0FBdUIsRUFBdkIsQ0FBWixDQURZLENBR1o7O0FBQ0EsU0FBSyxlQUFMLEdBQXVCLFVBQXZCO0FBQ0EsU0FBSyxpQkFBTCxHQUF5QixHQUF6QjtBQUVBLFNBQUssSUFBTDtBQUNIOzs7O1dBRUQsZ0JBQU87QUFBQTs7QUFDSCxVQUFJLEtBQUssSUFBVCxFQUFlO0FBQ1gsYUFBSyxJQUFMLENBQVUsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBQyxFQUFELEVBQVE7QUFDeEMsVUFBQSxFQUFFLENBQUMsY0FBSDtBQUVBLGNBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQUksQ0FBQyxJQUFMLENBQVUsWUFBVixDQUF1QixNQUF2QixDQUF2QixDQUFmOztBQUVBLGNBQUksTUFBSixFQUFZO0FBQ1IsWUFBQSxNQUFNLENBQUMsU0FBUCxDQUFpQixHQUFqQixDQUFxQixpQkFBckI7QUFFQSxnQkFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMscUJBQWpDLEdBQXlELE1BQTlFO0FBQ0EsZ0JBQU0sTUFBTSxH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O0FBQ0EsTUFBQSxHQUFHLENBQUMsZUFBSixDQUFvQixVQUFwQjtBQUNEO0FBQ0YsR0FaRDtBQWFEOztlQUVjLFkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbmNob3Ige1xuXG4gICAgY29uc3RydWN0b3IoZWwpIHtcbiAgICAgICAgdGhpcy5saW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG5cbiAgICAgICAgLy8gc3RhbmRhcmQgb3IgYWR2YW5jZWRcbiAgICAgICAgdGhpcy5oZWFkZXJCZWhhdmlvdXIgPSAnc3RhbmRhcmQnO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uID0gNjAwO1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpbmspIHtcbiAgICAgICAgICAgIHRoaXMubGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMubGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdoZWFkZXItLWZyZWV6ZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWSAtIGhlYWRlckhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvdXI6ICdzbW9vdGgnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXItLWZyZWV6ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5hbmltYXRpb25EdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQW5jaG9yXFwncyB0YXJnZXQgbm90IGZvdW5kIScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0ge1xuXG4gICAgY29uc3RydWN0b3IoZWwpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICB0aGlzLmZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZWwpO1xuXG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmQoZXZ0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnNldFJhbmdlKCk7XG4gICAgfVxuXG4gICAgc2V0SW5wdXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IHRleHRJbnB1dHMgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLm9yZGVyX19pbnB1dCcpO1xuICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLm9yZGVyX19maWxlIGxhYmVsJyk7XG5cbiAgICAgICAgdGV4dElucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpbnB1dC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJyk7XG5cbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoaW5wdXQudmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlbW92ZSByZWQgYm9yZGVyIHdoZW4gY2xpY2sgb24gYnV0dG9uXG4gICAgICAgIGZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGZpbGVJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFJhbmdlKCkge1xuICAgICAgICBjb25zdCByYW5nZSA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcub3JkZXJfX2lucHV0LXJhbmdlJyk7XG4gICAgICAgIGNvbnN0IHZhbHVlRmllbGQgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignI3JhbmdlX192YWx1ZScpO1xuICAgICAgICB2YWx1ZUZpZWxkLmlubmVyVGV4dCA9IHJhbmdlLnZhbHVlICsgJyUnO1xuXG4gICAgICAgIHJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgdmFsdWVGaWVsZC5pbm5lclRleHQgPSByYW5nZS52YWx1ZSArICclJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VuZChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcblxuICAgICAgICBmdW5jdGlvbiBzaG93V3JvbmdGaWVsZChpbnB1dCkge1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJlc2V0V3JvbmdGaWVsZChpbnB1dCkge1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCdvcHRpb25bc2VsZWN0ZWRdJyk7XG4gICAgICAgIGNvbnN0IHR5cGVDdXN0b20gPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLm9yZGVyX19zZWxlY3QtdGl0bGUnKTtcbiAgICAgICAgY29uc3QgZW1haWwgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImVtYWlsXCJdJyk7XG4gICAgICAgIGNvbnN0IGVtYWlsVmFsdWUgPSBlbWFpbC52YWx1ZTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBjb25zdCBuYW1lVmFsdWUgPSBuYW1lLnZhbHVlO1xuICAgICAgICBjb25zdCByYW5nZSA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicmFuZ2VcIl0nKTtcbiAgICAgICAgY29uc3QgcmFuZ2VWYWx1ZSA9IHJhbmdlLnZhbHVlICsgJyUnO1xuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJmaWxlXCJdJyk7XG4gICAgICAgIGNvbnN0IGZpbGVCdG4gPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignLm9yZGVyX19maWxlIGxhYmVsJyk7XG4gICAgICAgIGNvbnN0IGZpbGVWYWx1ZSA9IGZpbGUuZmlsZXNbMF07XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tTZWxlY3QoKSB7XG4gICAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHJlc2V0V3JvbmdGaWVsZCh0eXBlQ3VzdG9tKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dXcm9uZ0ZpZWxkKHR5cGVDdXN0b20pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTmFtZSgpIHtcbiAgICAgICAgICAgIGlmIChuYW1lVmFsdWUubGVuZ3RoID4gMCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBzaG93V3JvbmdGaWVsZChuYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0VtYWlsKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsaWRTdHJpbmcgPSAvXihbYS16QS1aMC05Xy4rLV0pK0AoKFthLXpBLVowLTktXSkrXFwuKSsoW2EtekEtWjAtOV17Miw0fSkrJC87XG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gbmV3IFJlZ0V4cCh2YWxpZFN0cmluZyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkLnRlc3QoZW1haWxWYWx1ZSkpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgc2hvd1dyb25nRmllbGQoZW1haWwpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRmlsZSgpIHtcbiAgICAgICAgICAgIGlmIChmaWxlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXNldFdyb25nRmllbGQoZmlsZUJ0bik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93V3JvbmdGaWVsZChmaWxlQnRuKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVja1NlbGVjdCgpICYmIGNoZWNrRW1haWwoKSAmJiBjaGVja05hbWUoKSAmJiBjaGVja0ZpbGUoKSkge1xuICAgICAgICAgICAgZGF0YS50eXBlID0gdHlwZS52YWx1ZTtcbiAgICAgICAgICAgIGRhdGEubmFtZSA9IG5hbWVWYWx1ZTtcbiAgICAgICAgICAgIGRhdGEuZW1haWwgPSBlbWFpbFZhbHVlO1xuICAgICAgICAgICAgZGF0YS5yYW5nZSA9IHJhbmdlVmFsdWU7XG4gICAgICAgICAgICBkYXRhLmZpbGUgPSBmaWxlVmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGlzOiAnLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIge1xuXG4gICAgY29uc3RydWN0b3IoZWwpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbCk7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuc2V0TGlua0xpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICAgICAgY29uc3QgYmVoYXZpb3VyID0gdGhpcy5oZWFkZXIuZGF0YXNldC5iZWhhdmlvdXI7XG5cbiAgICAgICAgICAgIHN3aXRjaChiZWhhdmlvdXIpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFuZGFyZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFN0YW5kYXJkQmVoYXZpb3VyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpeGVkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gbm90aGluZyB0byBkbywganVzdCBjc3MtZml4ZWQgaGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFN0YW5kYXJkQmVoYXZpb3VyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTWVudUJ0blN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICoqIHdoZW4gc2Nyb2xsIGRvd24gd2Ugc2hvdWxkIGhpZGUgJ2hlYWRlcidcbiAgICAqL1xuICAgIGluaXRTdGFuZGFyZEJlaGF2aW91cigpIHtcbiAgICAgICAgbGV0IHByZXZfc2Nyb2xsX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgbGV0IGxhc3Rfa25vd25fc2Nyb2xsX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVIZWFkZXIobGFzdF9zY3JvbGxfcG9zLCBwcmV2X3Njcm9sbF9wb3MpIHtcbiAgICAgICAgICAgIGlmICghaGVhZGVyLmNsYXNzTGlzdC5jb250YWlucygnaGVhZGVyLS1mcmVlemVkJykpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdF9zY3JvbGxfcG9zID4gcHJldl9zY3JvbGxfcG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNjcm9sbGVkIGRvd25cbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2Nyb2xsZWQgdXBcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZfc2Nyb2xsX3Bvc2l0aW9uID0gbGFzdF9rbm93bl9zY3JvbGxfcG9zaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGV2KSA9PiB7XG4gICAgICAgICAgICBsYXN0X2tub3duX3Njcm9sbF9wb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuXG4gICAgICAgICAgICBpZiAoIXRpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVIZWFkZXIobGFzdF9rbm93bl9zY3JvbGxfcG9zaXRpb24sIHByZXZfc2Nyb2xsX3Bvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldExpbmtMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IGxpbmtzID0gdGhpcy5oZWFkZXIucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9fbGluaycpO1xuXG4gICAgICAgIGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2xpbmtfYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXIucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbGlua19hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXJfX2xpbmtfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX19saW5rX2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLypcbiAgICAqKiBjaGFuZ2Ugc3RhdGUgZm9yIG1lbnUgYnV0dG9uXG4gICAgKi9cbiAgICBjaGFuZ2VNZW51QnRuU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVCdG4gPSB0aGlzLmhlYWRlci5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19tZW51LWJ1dHRvbicpO1xuXG4gICAgICAgIGlmIChtZW51QnRuKSB7XG4gICAgICAgICAgICBtZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1lbnVCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX19tZW51LWJ1dHRvbl9vcGVuZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsImZ1bmN0aW9uIGluaXRPd2xDYXJvdXNlbCAoKSB7XG5cbiAgICAkKFwiLm93bC1jYXJvdXNlbFwiKS5vd2xDYXJvdXNlbCh7XG4gICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICBtYXJnaW46IDMwLFxuICAgICAgICBuYXY6IGZhbHNlLFxuICAgICAgICBhdXRvV2lkdGg6IHRydWUsXG4gICAgICAgIGl0ZW1zOiA1LFxuICAgICAgICByZXNwb25zaXZlOiB7XG4gICAgICAgICAgICAxNDQwOiB7XG4gICAgICAgICAgICAgICAgbW91c2VEcmFnOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG5leHBvcnQgeyBpbml0T3dsQ2Fyb3VzZWwgfTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG5cbiAgICBjb25zdHJ1Y3RvcihlbCkge1xuICAgICAgICB0aGlzLmVsID0gZWw7XG4gICAgICAgIHRoaXMucG9wVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmVsKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0biA9IHRoaXMucG9wVXAucXVlcnlTZWxlY3RvcignLnBvcC11cF9fY2xvc2UnKTtcbiAgICAgICAgdGhpcy5saW5rcyA9IHRoaXMucG9wVXAucXVlcnlTZWxlY3RvckFsbCgnYVtkYXRhLXR5cGU9XCJhbmNob3JcIl0nKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mb3I9XCJwb3AtdXBcIl0nKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmRhdGFzZXQudGFyZ2V0ID09IHRoaXMuZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5CdG4gPSBidXR0b247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMub3BlbkJ0bikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnBvcFVwLCAnaGFzIG5vIG9wZW4gYnV0dG9uJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2xvc2VCdG4pIHtcbiAgICAgICAgICAgICAgICAvLyBzYW1lIGJ1dHRvblxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VCdG4gPSB0aGlzLm9wZW5CdG47XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnLCAnY2xvc2VkJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSh0aGlzLnBvcFVwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3codGhpcy5wb3BVcCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKHRoaXMucG9wVXApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lbnVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19tZW51LWJ1dHRvbicpO1xuICAgICAgICAgICAgICAgIGlmIChtZW51QnRuKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnVCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX19tZW51LWJ1dHRvbl9vcGVuZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUodGhpcy5wb3BVcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKHBvcFVwKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlQnRuLmRhdGFzZXQuc3RhdGUgPT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgICAgIHBvcFVwLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZml4ZWQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdG4uc2V0QXR0cmlidXRlKCdkYXRhLXN0YXRlJywgJ29wZW5lZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9wVXAuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdmaXhlZCcpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnLCAnY2xvc2VkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KHBvcFVwKSB7XG4gICAgICAgIHBvcFVwLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdmaXhlZCcpO1xuICAgIH1cblxuICAgIGhpZGUocG9wVXApIHtcbiAgICAgICAgcG9wVXAuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpeGVkJyk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRTZWxlY3QoKSB7XG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N5c3RlbS10eXBlJyk7XG5cbiAgICBpZiAoc2VsZWN0KSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHNlbGVjdC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIC8vIGNvbnRhaW5lciBmb3IgdGl0bGVcbiAgICAgICAgY29uc3Qgc2VsZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2VsZWN0VGl0bGUuY2xhc3NMaXN0LmFkZCgnb3JkZXJfX3NlbGVjdC10aXRsZScsICdvcmRlcl9faW5wdXQnKTtcblxuICAgICAgICAvLyBjb250YWluZXIgZm9yIG90aGVyIG9wdGlvbnMgKG5lZWRzIGZvciBzY3JvbGwtcGFkZGluZylcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzZWxlY3RPcHRpb25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ29yZGVyX19zZWxlY3QtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2VsZWN0T3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdvcmRlcl9fc2VsZWN0LW9wdGlvbnMnKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpO1xuXG4gICAgICAgIC8vIGZpcnN0IG9wdGlvbiBmb3IgdGl0bGVcbiAgICAgICAgc2VsZWN0VGl0bGUuaW5uZXJUZXh0ID0gb3B0aW9uc1swXS50ZXh0O1xuXG4gICAgICAgIC8vIHNldCB1cCBldmVudHMgZm9yIHRpdGxlXG4gICAgICAgIHNlbGVjdFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgc2VsZWN0VGl0bGUuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbmVkJyk7XG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ29wZW5lZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmcm9tIDJuZCBvcHRpb24gZm9yIG90aGVyIGVsZW1lbnRzXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzZWxlY3RPcHRpb24uaW5uZXJUZXh0ID0gb3B0aW9uc1tpXS50ZXh0O1xuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucy5hcHBlbmRDaGlsZChzZWxlY3RPcHRpb24pO1xuXG4gICAgICAgICAgICAvLyBzZXQgdXAgZXZlbnRzIGZvciBvcHRpb25zXG4gICAgICAgICAgICBzZWxlY3RPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5xdWVyeVNlbGVjdG9yKCcub3JkZXJfX3NlbGVjdC1vcHRpb25zIC5zZWxlY3RlZCcpICYmIHBhcmVudC5xdWVyeVNlbGVjdG9yKCdvcHRpb24uc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQucXVlcnlTZWxlY3Rvcignb3B0aW9uLnNlbGVjdGVkJykucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQucXVlcnlTZWxlY3Rvcignb3B0aW9uLnNlbGVjdGVkJykuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlcl9fc2VsZWN0LW9wdGlvbnMgLnNlbGVjdGVkJykuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc1tpXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnNbaV0uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RUaXRsZS5pbm5lclRleHQgPSBzZWxlY3RPcHRpb24udGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICAgICAgICBzZWxlY3RUaXRsZS5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ29wZW5lZCcpO1xuICAgICAgICAgICAgICAgIHNlbGVjdFRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0T3B0aW9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RPcHRpb25zKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHNlbGVjdFRpdGxlKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHNlbGVjdE9wdGlvbnNDb250YWluZXIpO1xuICAgIH1cbn0iLCJpbXBvcnQgSGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXInO1xuaW1wb3J0IFBvcHVwIGZyb20gJy4vY29tcG9uZW50cy9wb3AtdXAnO1xuaW1wb3J0IEFuY2hvciBmcm9tICcuL2NvbXBvbmVudHMvYW5jaG9yJztcbmltcG9ydCB7IGluaXRPd2xDYXJvdXNlbCB9IGZyb20gJy4vY29tcG9uZW50cy9vd2wnO1xuaW1wb3J0IGluaXRMYXp5bG9hZCBmcm9tICcuLi8uLi8uLi90ZXN0LWxheW91dC9zcmMvanMvY29tcG9uZW50cy9sYXp5bG9hZCc7XG5pbXBvcnQgaW5pdFNlbGVjdCBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0JztcbmltcG9ydCBGb3JtIGZyb20gJy4vY29tcG9uZW50cy9mb3JtJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAvLyBpbml0IHBvcC11cHNcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mb3I9XCJwb3AtdXBcIl0nKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGNvbnN0IHBvcFVwID0gbmV3IFBvcHVwKGJ1dHRvbi5kYXRhc2V0LnRhcmdldCk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0IGhlYWRlclxuICAgIGNvbnN0IGhlYWRlciA9IG5ldyBIZWFkZXIoJyNoZWFkZXInKTtcblxuICAgIC8vIGluaXQgZm9ybXNcbiAgICBjb25zdCBmb3JtID0gbmV3IEZvcm0oJyNvcmRlcl9fZm9ybScpO1xuXG4gICAgLy8gaW5pdCBhbmNob3JzXG4gICAgY29uc3QgbGluayA9IG5ldyBBbmNob3IoJ1tkYXRhLXR5cGU9XCJhbmNob3JcIl0nKTtcblxuICAgIC8vIGluaXQgY2Fyb3VzZWxcbiAgICBpbml0T3dsQ2Fyb3VzZWwoKTtcblxuICAgIC8vIGxvYWQgaW1hZ2VzXG4gICAgaW5pdExhenlsb2FkKCk7XG5cbiAgICAvLyBpbml0IHNlbGVjdFxuICAgIGluaXRTZWxlY3QoKTtcbn0pOyIsImZ1bmN0aW9uIGluaXRMYXp5bG9hZCgpIHtcbiAgY29uc3QgaW1nT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIHNlbGYpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgIGxhenlMb2FkKGVudHJ5LnRhcmdldCk7XG4gICAgICAgIHNlbGYudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGF6eS1waWN0dXJlJykuZm9yRWFjaCgocGljdHVyZSkgPT4ge1xuICAgIGltZ09ic2VydmVyLm9ic2VydmUocGljdHVyZSk7XG4gIH0pO1xuXG4gIGNvbnN0IGxhenlMb2FkID0gKHBpY3R1cmUpID0+IHtcbiAgICBjb25zdCBpbWcgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpIHx8IHBpY3R1cmU7XG4gICAgY29uc3Qgc291cmNlcyA9IHBpY3R1cmUucXVlcnlTZWxlY3RvckFsbCgnc291cmNlJyk7XG4gIFxuICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICBzb3VyY2Uuc3Jjc2V0ID0gc291cmNlLmRhdGFzZXQuc3Jjc2V0O1xuICAgICAgc291cmNlLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcbiAgICB9KTtcbiAgICBpZiAoaW1nKSB7XG4gICAgICBpbWcuc3JjID0gaW1nLmRhdGFzZXQuc3JjO1xuICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdExhenlsb2FkOyJdfQ==
