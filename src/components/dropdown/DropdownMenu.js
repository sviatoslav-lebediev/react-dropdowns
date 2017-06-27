import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class DropdownMenu extends React.Component {
    state = {
        activeIndex: null
    }

    render () {
        const {
            align,
            children,
            className,
            onItemSelected,
            onRequestClose,
            ...others } = this.props;
        const classes = classNames(className, {
            'asc-dropdown-menu': true,
            'asc-dropdown-menu-left': align === 'left',
            'asc-dropdown-menu-right': align === 'right'
        });
        const items = this.renderItems(children);

        if (items.length) {
            const display = this.props.open ? 'initial' : 'none';
            // Set a 'tabindex="-1"' so that this menu can be '.focus()'.
            //
            // see: http://javascript.info/tutorial/focus-blur
            return (
                <ul {...others}
                    style={{ display }}
                    ref='menu'
                    className={classes}
                    onClick={this.onClick}
                    onKeyDown={this.onKeyDown}
                    role='menu'
                    tabIndex='0'
                >
                    {items}
                </ul>
            );
        } else {
            return null;
        }
    }

    renderItems (children) {
        this._children = [];

        // Return early if this menu is not open.
        // if (!this.props.open) return this._children;

        React.Children.forEach(children, (child, index) => {
            // ignore 'null' or 'undefined' children
            if (!child) return;

            // Validate child and show warning if this child is not the component
            // we expect.
            if (!(child.type && child.type.displayName === 'DropdownItem')) {
                // Only supports console functions when developer tools are open,
                // otherwise the console object is undefined and any calls will
                // throw errors.
                /* if (console) {
                    console.warn(`DropdownMenu only accepts DropdownItem elements as
          children. Found ${child.type.displayName || child.type} as child
          member ${index} of children.`);
                } */
            }

            // we need to listen to specific events for this child element. if user
            // has provided props for these events, we pass in a "chain" function
            // which essentially proxies the event.
            const { onMouseEnter, onMouseLeave, ...props } = child.props;

            props.key = index;
            props.ref = index;
            props.active = this.state.activeIndex === index;
            props.onItemSelected = this.onItemSelected;
            props.onMouseEnter = this.onItemMouseEnter.bind(this, index, onMouseEnter);
            props.onMouseLeave = this.onItemMouseLeave.bind(this, index, onMouseLeave);
            props.onRequestClose = this.close;

            this._children.push(React.cloneElement(child, props));
        });

        return this._children;
    }

    /**
     * Close the menu
     *
     * @param callback
     */
    close = (callback) => {
        if (this.props.open) {
            const onRequestClose = this.props.onRequestClose;

            this.setState({ activeIndex: null }, () => {
                onRequestClose();
                if (callback) callback();
            });
        }
    }

    /**
     * Focus menu if it is open.
     */
    focus () {
        if (this.refs.menu) {
            this.refs.menu.focus();
        }
    }

    /**
     * Return the ref. to the active child. If none is active, returns `undefined`.
     *
     * @return {*}
     */
    getActive () {
        return this.refs[this.state.activeIndex];
    }

    /**
     *
     * @return {*}
     */
    isOpen () {
        return this.props.open;
    }

    /**
     * Capture children "onClick' event and prevent propagation.
     *
     * @param e
     * @private
     */
    onClick = (e) => {
        e.stopPropagation();

        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    /**
     * When user enters the <DropdownItem> component, we need to set it's "index"
     * to be the current "activeIndex" value.
     *
     * @param {number} index
     * @param {function} handler
     * @param {object} e
     * @private
     */
    onItemMouseEnter = (index, handler, e) => {
        this.setState({ activeIndex: index }, () => handler && handler(e));
    }

    /**
     * When user leaves the <DropdownItem> component, we need to unset
     * "activeIndex" value *IF* the "activeIndex" matches "index".
     *
     * @param {number} index
     * @param {function} handler
     * @param {object} e
     * @private
     */
    onItemMouseLeave = (index, handler, e) => {
        if (index === this.state.activeIndex) {
            this.setState({ activeIndex: null }, () => handler && handler(e));
        } else if (typeof handler === 'function') {
            handler(e);
        }
    }

    onKeyDown = (e) => {
        if (!this.props.open) return;

        switch (e.which) {
            // down arrow
        case 40:
            e.preventDefault();
            e.stopPropagation();
            this.setPreviousActiveIndex();
            break;

        // up arrow
        case 38:
            e.preventDefault();
            e.stopPropagation();
            this.setNextActiveIndex();
            break;

        // Esc
        case 27:
            e.preventDefault();
            e.stopPropagation();
            this.close();
            break;
        case 13:
            e.preventDefault();
            e.stopPropagation();
            break;

            // tab
        case 9:
            e.preventDefault();
            e.stopPropagation();

            if (e.shiftKey) {
                this.setPreviousActiveIndex();
            } else {
                this.setNextActiveIndex();
            }
            break;
        }
    }

    /**
     * Set next active index, ignoring "disabled", "divider" and "header" items.
     *
     * @private
     */
    setNextActiveIndex () {
        const activeIndex = this.state.activeIndex;
        const children = this._children;

        let child;
        let index = activeIndex === null ? children.length - 1 : 0;
        let i = activeIndex === null ? index : activeIndex - 1;

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

        if (index !== activeIndex) this.setState({ activeIndex: index });
    }

    /**
     * Set prev. active index, ignoring "disabled", "divider" and "header" items.
     *
     * @private
     */
    setPreviousActiveIndex () {
        const activeIndex = this.state.activeIndex;
        const children = this._children;

        let child, index;
        let len = children.length;
        let i = activeIndex !== null ? activeIndex + 1 : 0;

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

        if (index === null) index = len - 1;
        if (index !== activeIndex) this.setState({ activeIndex: index });
    }

    /**
     * @param {function} handler
     * @private
     */
    onItemSelected = (handler) => {
        this.props.onItemSelected(handler);
    }
}

DropdownMenu.defaultProps = {
    className: '',
    align: 'left',
    open: false
};

DropdownMenu.propTypes = {
    className: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right']),

    /**
     * The <DropdownItem>'s elements to populate <DropdownMenu> with.
     */
    children: PropTypes.node,

    /**
     * Fires when an item "onClick" prop has been triggered.
     */
    onItemSelected: PropTypes.func.isRequired,

    /**
     * Fires when this component is requesting to be closed.
     */
    onRequestClose: PropTypes.func.isRequired,

    /**
     * Open the menu?
     *
     * defaults to `false`
     */
    open: PropTypes.bool
};

export default DropdownMenu;
