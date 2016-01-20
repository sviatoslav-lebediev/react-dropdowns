(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-addons-clicked-away-mixin"), require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react-addons-clicked-away-mixin", "react", "classnames"], factory);
	else if(typeof exports === 'object')
		exports["ReactDropdownMenus"] = factory(require("react-addons-clicked-away-mixin"), require("react"), require("classnames"));
	else
		root["ReactDropdownMenus"] = factory(root["ClickedAwayMixin"], root["React"], root["classNames"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DropdownItem = exports.Dropdown = undefined;

	var _Dropdown = __webpack_require__(1);

	var _Dropdown2 = _interopRequireDefault(_Dropdown);

	var _DropdownItem = __webpack_require__(6);

	var _DropdownItem2 = _interopRequireDefault(_DropdownItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Dropdown = _Dropdown2.default;
	exports.DropdownItem = _DropdownItem2.default;
	exports.default = {
	  Dropdown: _Dropdown2.default,
	  DropdownItem: _DropdownItem2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactAddonsClickedAwayMixin = __webpack_require__(2);

	var _reactAddonsClickedAwayMixin2 = _interopRequireDefault(_reactAddonsClickedAwayMixin);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _DropdownMenu = __webpack_require__(5);

	var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Dropdown = _react2.default.createClass({
	  displayName: 'Dropdown',

	  propTypes: {

	    /**
	     * Specify what component should this <Dropdown> render as. This can be a
	     * valid React Component class or a string (eg. "div", "li", "span", etc.)
	     *
	     * defaults to "div"
	     */
	    Component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.string]),

	    /**
	     * This needs to either be a valid React Element or a string value.
	     *
	     * If this is a string, we will generate a simple <button type="button">
	     * element. You may wish to style this via CSS class (eg. ".dropdown > button")
	     */
	    button: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.string]).isRequired,

	    /**
	     * Elements should be <DropdownItem>'s.
	     */
	    children: _react2.default.PropTypes.node,

	    className: _react2.default.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      Component: 'div'
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      open: false
	    };
	  },

	  mixins: [_reactAddonsClickedAwayMixin2.default],

	  render: function render() {
	    var _this = this;

	    var toggle = undefined;
	    var _props = this.props;
	    var Component = _props.Component;
	    var button = _props.button;
	    var children = _props.children;
	    var className = _props.className;

	    var other = _objectWithoutProperties(_props, ['Component', 'button', 'children', 'className']);

	    var classes = (0, _classnames2.default)(className, {
	      "dropdown": true
	    });
	    var toggleProps = {
	      "aria-expanded": open ? 'true' : 'false',
	      "aria-haspopup": 'true',
	      "role": 'button'
	    };

	    if (_react2.default.isValidElement(button)) {
	      // preserve "onClick" prop if set
	      if (typeof button.props.onClick === 'function') {
	        (function () {
	          var callback = button.props.onClick;
	          toggleProps.onClick = function (event) {
	            this._onButtonClick(event, callback);
	          }.bind(_this);
	        })();
	      } else {
	        button.props.onClick = this._onButtonClick;
	      }

	      toggle = _react2.default.cloneElement(button, toggleProps);
	    } else {
	      toggle = _react2.default.createElement(
	        'button',
	        _extends({}, toggleProps, {
	          onClick: this._onButtonClick,
	          type: 'button'
	        }),
	        button
	      );
	    }

	    return _react2.default.createElement(
	      Component,
	      _extends({}, other, { className: classes }),
	      toggle,
	      _react2.default.createElement(
	        _DropdownMenu2.default,
	        {
	          ref: 'menu',
	          onItemSelected: this._onItemSelected,
	          onRequestClose: this.close,
	          open: this.state.open
	        },
	        children
	      )
	    );
	  },
	  close: function close() {
	    if (this.state.open) this.setState({ open: false });
	  },
	  onClickedAway: function onClickedAway() {
	    this.close();
	  },
	  focus: function focus() {
	    if (this.refs.menu) this.refs.menu.focus();
	  },

	  /**
	   * On button click, toggle "open" state and focus the menu if next open
	   * state is `true`. Always invoke "callback" if it is a function.
	   *
	   * @param {SyntheticEvent} event
	   * @param {function} callback
	   * @private
	   */
	  _onButtonClick: function _onButtonClick(event, callback) {
	    var _this2 = this;

	    if (this.state.open) {
	      this.setState({ open: false }, typeof callback == 'function' ? function () {
	        return callback(event);
	      } : null);
	    } else {
	      (function () {
	        var focus = _this2.focus;

	        _this2.setState({ open: true }, function () {
	          focus();
	          if (typeof callback == 'function') callback(event);
	        });
	      })();
	    }
	  },
	  _onItemSelected: function _onItemSelected(callback) {
	    if (this.state.open) {
	      this.setState({ open: false }, function () {
	        return callback && callback();
	      });
	    } else if (callback) {
	      callback();
	    }
	  }
	});

	exports.default = Dropdown;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var DropdownMenu = _react2.default.createClass({
	  displayName: 'DropdownMenu',

	  propTypes: {
	    /**
	     * The <DropdownItem>'s elements to populate <DropdownMenu> with.
	     */
	    children: _react2.default.PropTypes.node,

	    /**
	     * Fires when this component is requesting to be closed.
	     */
	    onRequestClose: _react2.default.PropTypes.func,

	    /**
	     * Fires when an item "onClick" prop has been triggered.
	     */
	    onItemSelected: _react2.default.PropTypes.func,

	    open: _react2.default.PropTypes.bool
	  },

	  getInitialState: function getInitialState() {
	    return {
	      activeIndex: null
	    };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    var childRef = this.refs[this.state.activeIndex];

	    if (childRef && childRef.hasSubMenu() && !childRef.isOpen()) {
	      childRef.focus();
	    }
	  },
	  render: function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var className = _props.className;

	    var other = _objectWithoutProperties(_props, ['children', 'className']);

	    var classes = (0, _classnames2.default)(className, {
	      "dropdown-menu": true
	    });
	    var items = this.renderChildren(children);

	    if (items.length) {
	      // Set a 'tabindex="-1"' so that this menu can be '.focus()'.
	      //
	      // see: http://javascript.info/tutorial/focus-blur
	      return _react2.default.createElement(
	        'ul',
	        _extends({}, other, {
	          className: classes,
	          ref: 'menu',
	          role: 'menu',
	          onKeyDown: this._onKeyDown,
	          tabIndex: '0'
	        }),
	        items
	      );
	    } else {
	      return null;
	    }
	  },
	  renderChildren: function renderChildren(children) {
	    var _this = this;

	    this._children = [];

	    // Return early if this menu is not open.
	    if (!this.props.open) return this._children;

	    _react2.default.Children.forEach(children, function (child, index) {
	      // ignore 'null' or 'undefined' children
	      if (!child) return;

	      // Validate child and show warning if this child is not the component
	      // we expect.
	      if (!(child.type && child.type.displayName === 'DropdownItem')) {
	        // Only supports console functions when developer tools are open,
	        // otherwise the console object is undefined and any calls will
	        // throw errors.
	        if (console) {
	          console.warn('DropdownMenu only accepts DropdownItem elements as\n          children. Found ' + (child.type.displayName || child.type) + ' as child\n          member ' + index + ' of children.');
	        }
	      }

	      // we need to listen to specific events for this child element. if user
	      // has provided props for these events, we pass in a "chain" function
	      // which essentially proxies the event.
	      var _child$props = child.props;
	      var onMouseEnter = _child$props.onMouseEnter;
	      var onMouseLeave = _child$props.onMouseLeave;

	      var props = _objectWithoutProperties(_child$props, ['onMouseEnter', 'onMouseLeave']);

	      props.key = index;
	      props.ref = index;
	      props.active = _this.state.activeIndex == index;
	      props.onMouseEnter = _this._onItemMouseEnter.bind(_this, index, onMouseEnter);
	      props.onMouseLeave = _this._onItemMouseLeave.bind(_this, index, onMouseLeave);
	      props.onRequestClose = _this.close;
	      props.onSubMenuClose = _this.focus;

	      _this._children.push(_react2.default.cloneElement(child, props));
	    });

	    return this._children;
	  },
	  close: function close(callback) {
	    var _this2 = this;

	    if (this.props.open) {
	      (function () {
	        var onRequestClose = _this2.props.onRequestClose;

	        _this2.setState({ activeIndex: null }, function () {
	          onRequestClose();
	          if (callback) callback();
	        });
	      })();
	    }
	  },
	  focus: function focus() {
	    if (this.refs.menu) this.refs.menu.focus();
	  },

	  /**
	   * Attempts to "focus" the item submenu. If the submenu does not exist,
	   * this will be a noop.
	   *
	   * @param {number} index
	   * @private
	   */
	  focusItemSubMenu: function focusItemSubMenu(index) {
	    var childRef = this.refs[index];

	    if (childRef) childRef.focus();
	  },
	  isOpen: function isOpen() {
	    return this.props.open;
	  },

	  /**
	   * When user enters the <DropdownItem> component, we need to set it's "index"
	   * to be the current "activeIndex" value.
	   *
	   * @param {number} index
	   * @param {function} handler
	   * @param {object} e
	   * @private
	   */
	  _onItemMouseEnter: function _onItemMouseEnter(index, handler, e) {
	    this.setState({ activeIndex: index }, function () {
	      return handler && handler(e);
	    });
	  },

	  /**
	   * When user leaves the <DropdownItem> component, we need to unset
	   * "activeIndex" value *IF* the "activeIndex" matches "index".
	   *
	   * @param {number} index
	   * @param {function} handler
	   * @param {object} e
	   * @private
	   */
	  _onItemMouseLeave: function _onItemMouseLeave(index, handler, e) {
	    if (index === this.state.activeIndex) {
	      this.setState({ activeIndex: null }, function () {
	        return handler && handler(e);
	      });
	    } else if (typeof handler === 'function') {
	      handler(e);
	    }
	  },
	  _onKeyDown: function _onKeyDown(e) {
	    if (!this.props.open) {
	      return;
	    }

	    var childRef = undefined;
	    switch (e.which) {
	      // down arrow
	      case 40:
	        e.preventDefault();
	        e.stopPropagation();

	        this._setPreviousActiveIndex();
	        break;

	      // right arrow
	      case 39:
	        e.preventDefault();
	        e.stopPropagation();

	        childRef = this.refs[this.state.activeIndex];

	        if (childRef) childRef.focus();
	        break;

	      // up arrow
	      case 38:
	        e.preventDefault();
	        e.stopPropagation();

	        this._setNextActiveIndex();
	        break;

	      // left arrow
	      case 37:
	        e.preventDefault();
	        e.stopPropagation();

	        this.close();
	        break;

	      // Esc
	      case 27:
	        e.preventDefault();
	        e.stopPropagation();

	        this.close();
	        break;

	      // Enter
	      case 13:
	        e.preventDefault();
	        e.stopPropagation();

	        childRef = this.refs[this.state.activeIndex];

	        if (childRef && childRef.hasSubMenu()) {
	          childRef.focus();
	        } else {
	          this._onItemSelected();
	        }
	        break;

	      // tab
	      case 9:
	        e.preventDefault();
	        e.stopPropagation();

	        if (e.shiftKey) {
	          this._setPreviousActiveIndex();
	        } else {
	          this._setNextActiveIndex();
	        }
	        break;
	    }
	  },
	  _onSubMenuClose: function _onSubMenuClose() {
	    this.focus();
	  },
	  _setNextActiveIndex: function _setNextActiveIndex() {
	    var activeIndex = this.state.activeIndex;
	    var children = this._children;

	    var child = undefined;
	    var index = activeIndex == null ? children.length - 1 : 0;
	    var i = activeIndex == null ? index : activeIndex - 1;

	    for (; i >= 0; i--) {
	      child = children[i];

	      var childIsDisabled = child.props.disabled;
	      var childIsADivider = child.props.divider;
	      var childIsAHeader = child.props.header;

	      if (!childIsDisabled && !childIsADivider && !childIsAHeader) {
	        index = i;
	        break;
	      }
	    }

	    if (index != activeIndex) this.setState({ activeIndex: index });
	  },
	  _setPreviousActiveIndex: function _setPreviousActiveIndex() {
	    var activeIndex = this.state.activeIndex;
	    var children = this._children;

	    var child = undefined,
	        index = undefined;
	    var len = children.length;
	    var i = activeIndex != null ? activeIndex + 1 : 0;

	    for (; i < len; i++) {
	      child = children[i];

	      var childIsDisabled = child.props.disabled;
	      var childIsADivider = child.props.divider;
	      var childIsAHeader = child.props.header;

	      if (!childIsDisabled && !childIsADivider && !childIsAHeader) {
	        index = i;
	        break;
	      }
	    }

	    if (index == null) index = len - 1;
	    if (index != activeIndex) this.setState({ activeIndex: index });
	  },

	  /**
	   * @param {function} handler
	   * @private
	   */
	  _onItemSelected: function _onItemSelected(handler) {
	    this.props.onItemSelected(handler);
	  }
	});

	exports.default = DropdownMenu;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _DropdownMenu = __webpack_require__(5);

	var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var DropdownItem = _react2.default.createClass({
	  displayName: 'DropdownItem',

	  propTypes: {
	    /**
	     * Set by parent <Dropdown> menu
	     */
	    active: _react2.default.PropTypes.bool,

	    className: _react2.default.PropTypes.string,

	    /**
	     *
	     */
	    children: _react2.default.PropTypes.node,

	    divider: function divider(props, propName, componentName) {
	      if (props.divider && props.children) {
	        return new Error('Children will not be rendered for dividers');
	      }
	    },

	    header: _react2.default.PropTypes.bool,

	    label: _react2.default.PropTypes.node.isRequired,

	    onRequestClose: _react2.default.PropTypes.func,

	    onSubMenuClose: _react2.default.PropTypes.func,

	    // <a> specific props
	    // ------------------

	    href: function href(props) {
	      if (props.children && props.href) {
	        return new Error('Children will not be rendered if "href" is set.');
	      }
	    },

	    target: _react2.default.PropTypes.string,

	    title: _react2.default.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      active: false,
	      divider: false,
	      header: false
	    };
	  },
	  render: function render() {
	    var menu = undefined;
	    var _props = this.props;
	    var active = _props.active;
	    var children = _props.children;
	    var className = _props.className;
	    var divider = _props.divider;
	    var header = _props.header;
	    var href = _props.href;
	    var label = _props.label;
	    var onRequestClose = _props.onRequestClose;
	    var onSubMenuClose = _props.onSubMenuClose;
	    var target = _props.target;
	    var title = _props.title;

	    var other = _objectWithoutProperties(_props, ['active', 'children', 'className', 'divider', 'header', 'href', 'label', 'onRequestClose', 'onSubMenuClose', 'target', 'title']);

	    var classes = (0, _classnames2.default)(className, {
	      "active": active,
	      "divider": divider,
	      "dropdown-header": header,
	      "dropdown-submenu": !!children
	    });
	    var role = divider ? 'separator' : other.role;

	    if (children) {
	      menu = _react2.default.createElement(
	        _DropdownMenu2.default,
	        {
	          ref: 'menu',
	          onItemSelected: onRequestClose,
	          onRequestClose: onSubMenuClose,
	          open: active
	        },
	        children
	      );
	    }

	    return _react2.default.createElement(
	      'li',
	      _extends({}, other, {
	        className: classes,
	        onClick: this._onClick,
	        role: role
	      }),
	      _react2.default.createElement(
	        'a',
	        {
	          href: href,
	          onClick: this._onAnchorClick,
	          role: href == null ? 'button' : undefined,
	          target: target,
	          title: title
	        },
	        label
	      ),
	      menu
	    );
	  },

	  /**
	   * If this component has "menu" ref, focus it's menu.
	   */
	  focus: function focus() {
	    if (this.refs.menu) this.refs.menu.focus();
	  },
	  hasSubMenu: function hasSubMenu() {
	    return !!this.props.children;
	  },
	  isOpen: function isOpen() {
	    return !!this.refs.menu;
	  },
	  _onAnchorClick: function _onAnchorClick(e) {
	    if (this.props.href == null) {
	      e.preventDefault();
	    }
	  },
	  _onClick: function _onClick(e) {
	    var _props2 = this.props;
	    var onClick = _props2.onClick;
	    var onRequestClose = _props2.onRequestClose;

	    onRequestClose();

	    if (onClick) onClick(e);
	  }
	});

	exports.default = DropdownItem;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;