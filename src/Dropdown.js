import ClickedAwayMixin from 'react-addons-clicked-away-mixin';
import React from 'react';
import classNames from 'classnames';

import DropdownMenu from './DropdownMenu';

const Dropdown = React.createClass({

  propTypes: {

    /**
     * This needs to either be a valid React Element or a string value.
     *
     * If this is a string, we will generate a simple <button type="button">
     * element. You may wish to style this via CSS class (eg. ".dropdown > button")
     */
    button: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.string
    ]).isRequired,

    /**
     * Elements should be <DropdownItem>'s.
     */
    children: React.PropTypes.node,

    className: React.PropTypes.string
  },

  getInitialState() {
    return {
      open: false
    };
  },

  mixins: [
    ClickedAwayMixin
  ],

  render() {
    let toggle;
    const {
      button,
      children,
      className,
      ...other
    } = this.props;
    const classes = classNames(className, {
      "dropdown": true
    });
    const toggleProps = {
      "aria-expanded": open ? 'true' : 'false',
      "aria-haspopup": 'true',
      "role": 'button'
    };

    if (React.isValidElement(button)) {
      // preserve "onClick" prop if set
      if (typeof button.props.onClick === 'function') {
        const callback = button.props.onClick;
        toggleProps.onClick = function(event) {
          this._onButtonClick(event, callback);
        }.bind(this);
      }
      toggle = React.cloneElement(button, toggleProps);
    } else {
      toggle = (
        <button
          {...toggleProps}
          onClick={this._onButtonClick}
          type="button"
        >
          {button}
        </button>
      );
    }

    return (
      <div {...other} className={classes}>
        {toggle}
        <DropdownMenu
          ref="menu"
          onItemSelected={this._onItemSelected}
          onRequestClose={this.close}
          open={this.state.open}
        >
          {children}
        </DropdownMenu>
      </div>
    );
  },

  close() {
    if (this.state.open) this.setState({open: false});
  },

  onClickedAway() {
    this.close();
  },

  focus() {
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
  _onButtonClick(event, callback) {
    if (this.state.open) {
      this.setState({open: false},
        typeof callback == 'function' ? () => callback(event) : null);
    } else {
      const focus = this.focus;

      this.setState({open: true}, () => {
        focus();
        if (typeof callback == 'function') callback(event);
      });
    }
  },

  _onItemSelected(callback) {
    if (this.state.open) {
      this.setState({open: false}, () => callback && callback());
    } else if (callback) {
      callback();
    }
  }

});

export default Dropdown;