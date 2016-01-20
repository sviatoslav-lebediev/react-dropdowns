import React from 'react';
import classNames from 'classnames';

const DropdownMenu = React.createClass({

  propTypes: {
    /**
     * The <DropdownItem>'s elements to populate <DropdownMenu> with.
     */
    children: React.PropTypes.node,

    /**
     * Fires when this component is requesting to be closed.
     */
    onRequestClose: React.PropTypes.func,

    /**
     * Fires when an item "onClick" prop has been triggered.
     */
    onItemSelected: React.PropTypes.func,

    open: React.PropTypes.bool
  },

  getInitialState() {
    return {
      activeIndex: null
    };
  },

  componentDidUpdate() {
    const childRef = this.refs[this.state.activeIndex];

    if (childRef && childRef.hasSubMenu() && !childRef.isOpen()) {
      childRef.focus();
    }
  },

  render() {
    const {
      children,
      className,
      ...other
    } = this.props;
    const classes = classNames(className, {
      "dropdown-menu": true
    });
    const items = this.renderChildren(children);

    if (items.length) {
      // Set a 'tabindex="-1"' so that this menu can be '.focus()'.
      //
      // see: http://javascript.info/tutorial/focus-blur
      return (
        <ul
          {...other}
          className={classes}
          ref="menu"
          role="menu"
          onKeyDown={this._onKeyDown}
          tabIndex="0"
        >
          {items}
        </ul>
      );
    } else {
      return null;
    }
  },

  renderChildren(children) {
    this._children = [];

    // Return early if this menu is not open.
    if (!this.props.open) return this._children;

    React.Children.forEach(children, (child, index) => {
      // ignore 'null' or 'undefined' children
      if (!child) return;

      // Validate child and show warning if this child is not the component
      // we expect.
      if (!(child.type && child.type.displayName === 'DropdownItem')) {
        // Only supports console functions when developer tools are open,
        // otherwise the console object is undefined and any calls will
        // throw errors.
        if (console) {
          console.warn(`DropdownMenu only accepts DropdownItem elements as
          children. Found ${child.type.displayName || child.type} as child
          member ${index} of children.`);
        }
      }

      // we need to listen to specific events for this child element. if user
      // has provided props for these events, we pass in a "chain" function
      // which essentially proxies the event.
      const {
        onMouseEnter,
        onMouseLeave,
        ...props
      } = child.props;

      props.key = index;
      props.ref = index;
      props.active = this.state.activeIndex == index;
      props.onMouseEnter = this._onItemMouseEnter.bind(this, index, onMouseEnter);
      props.onMouseLeave = this._onItemMouseLeave.bind(this, index, onMouseLeave);
      props.onRequestClose = this.close;
      props.onSubMenuClose = this.focus;

      this._children.push(
        React.cloneElement(child, props)
      );
    });

    return this._children;
  },

  close(callback) {
    if (this.props.open) {
      const onRequestClose = this.props.onRequestClose;

      this.setState({activeIndex: null}, () => {
        onRequestClose();
        if (callback) callback();
      });
    }
  },

  focus() {
    if (this.refs.menu) this.refs.menu.focus();
  },

  /**
   * Attempts to "focus" the item submenu. If the submenu does not exist,
   * this will be a noop.
   *
   * @param {number} index
   * @private
   */
  focusItemSubMenu(index) {
    const childRef = this.refs[index];

    if (childRef) childRef.focus();
  },

  isOpen() {
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
  _onItemMouseEnter(index, handler, e) {
    this.setState({activeIndex: index}, () => handler && handler(e));
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
  _onItemMouseLeave(index, handler, e) {
    if (index === this.state.activeIndex) {
      this.setState({activeIndex: null}, () => handler && handler(e));
    } else if (typeof handler === 'function') {
      handler(e);
    }
  },

  _onKeyDown(e) {
    if (!this.props.open) {
      return;
    }

    let childRef;
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

  _onSubMenuClose() {
    this.focus();
  },

  _setNextActiveIndex() {
    const activeIndex = this.state.activeIndex;
    const children = this._children;

    let child;
    let index = activeIndex == null ? children.length-1 : 0;
    let i = activeIndex == null ? index : activeIndex-1;

    for (; i >= 0; i--) {
      child = children[i];

      let childIsDisabled = child.props.disabled;
      let childIsADivider = child.props.divider;
      let childIsAHeader = child.props.header;

      if (!childIsDisabled && !childIsADivider && !childIsAHeader) {
        index = i;
        break;
      }
    }

    if (index != activeIndex) this.setState({activeIndex: index});
  },

  _setPreviousActiveIndex() {
    const activeIndex = this.state.activeIndex;
    const children = this._children;

    let child, index;
    let len = children.length;
    let i = activeIndex != null ? (activeIndex+1) : 0;

    for (; i < len; i++) {
      child = children[i];

      let childIsDisabled = child.props.disabled;
      let childIsADivider = child.props.divider;
      let childIsAHeader = child.props.header;

      if (!childIsDisabled && !childIsADivider && !childIsAHeader) {
        index = i;
        break;
      }
    }

    if (index == null) index = len-1;
    if (index != activeIndex) this.setState({activeIndex: index});
  },
  
  /**
   * @param {function} handler
   * @private
   */
  _onItemSelected(handler) {
    this.props.onItemSelected(handler);
  }

});

export default DropdownMenu;