import React from 'react';
import classNames from 'classnames';

import DropdownMenu from './DropdownMenu';

const DropdownItem = React.createClass({

  propTypes: {
    /**
     * Set by parent <Dropdown> menu
     */
    active: React.PropTypes.bool,

    className: React.PropTypes.string,

    /**
     *
     */
    children: React.PropTypes.node,

    divider: (props, propName, componentName) => {
      if (props.divider && props.children) {
        return new Error('Children will not be rendered for dividers');
      }
    },

    header: React.PropTypes.bool,

    label: React.PropTypes.node.isRequired,

    onRequestClose: React.PropTypes.func,

    onSubMenuClose: React.PropTypes.func,

    // <a> specific props
    // ------------------

    href: (props) => {
      if (props.children && props.href) {
        return new Error('Children will not be rendered if "href" is set.')
      }
    },

    target: React.PropTypes.string,

    title: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      active: false,
      divider: false,
      header: false
    };
  },

  render() {
    let menu;
    const {
      active,
      children,
      className,
      divider,
      header,
      href,
      label,
      onRequestClose,
      onSubMenuClose,
      target,
      title,
      ...other
    } = this.props;
    const classes = classNames(className, {
      "active": active,
      "divider": divider,
      "dropdown-header": header,
      "dropdown-submenu": !!children
    });
    const role = divider ? 'separator' : other.role;

    if (children) {
      menu = (
        <DropdownMenu
          ref="menu"
          onItemSelected={onRequestClose}
          onRequestClose={onSubMenuClose}
          open={active}
        >
          {children}
        </DropdownMenu>
      );
    }

    return (
      <li
        {...other}
        className={classes}
        onClick={this._onClick}
        role={role}
      >
        <a
          href={href}
          onClick={this._onAnchorClick}
          role={href == null ? 'button' : undefined}
          target={target}
          title={title}
        >
          {label}
        </a>
        {menu}
      </li>
    );
  },

  /**
   * If this component has "menu" ref, focus it's menu.
   */
  focus() {
    if (this.refs.menu) this.refs.menu.focus();
  },

  hasSubMenu() {
    return !!this.props.children;
  },

  isOpen() {
    return !!this.refs.menu;
  },

  _onAnchorClick(e) {
    if (this.props.href == null) {
      e.preventDefault();
    }
  },

  _onClick(e) {
    const { onClick, onRequestClose } = this.props;

    onRequestClose();

    if (onClick) onClick(e);
  }

});

export default DropdownItem;