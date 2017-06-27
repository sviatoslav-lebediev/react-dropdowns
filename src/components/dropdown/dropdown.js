import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';

import './dropdown.scss';

class Dropdown extends React.Component {
    static Item = DropdownItem

    state = {
        open: false
    }

    render () {
        const {
            Component,
            align,
            children,
            className,
            menuProps = {},
            trigger,
            toggle,
            ...others } = this.props;
        const {
            open
        } = this.state;

        const classes = classNames(className, {
            'asc-dropdown': true,
            'open': this.state.open
        });

        return (
            <Component {...others} className={classes}>
                {this.renderToggle()}
                <DropdownMenu
                    ref='menu'
                    {...menuProps}
                    align={align}
                    children={children}
                    open={open}
                    onItemSelected={this.onItemSelected}
                    onMouseOver={() => this.closing = false}
                    onRequestClose={this.close}
                />
            </Component>
        );
    }

    /**
     * Renders the "toggle" component. We clone the existing element as we need
     * to hook into the "onClick" or "onBlur"/"onFocus" events.
     *
     * @return {ReactElement}
     */
    renderToggle () {
        const { toggle, trigger } = this.props;
        const toggleProps = {
            'aria-expanded': this.state.open ? 'true' : 'false',
            'aria-haspopup': 'true',
            'className': classNames(toggle.props.className, 'asc-dropdown-toggle')
        };

        if (trigger === 'click') {
            toggleProps.role = 'button';
            toggleProps.onClick = this.onClick;
        } else {
            // bind onFocus/onBlur events
            toggleProps.onMouseOut = this.onBlur;
            toggleProps.onMouseOver = this.onFocus;
        }

        return React.cloneElement(toggle, toggleProps);
    }

    /**
     * Triggered when a <DropdownItem> component was selected. If the menu is
     * shown, it will be closed and the "callback" function will be invoked after
     * the menu is closed. Otherwise the callback is invoked immediately.
     *
     * @param callback
     * @private
     */
    onItemSelected (callback) {
        if (this.state.open) {
            this.close(callback);
        } else if (callback) {
            callback();
        }
    }

    onBlur = (e) => {
        if (this.props.toggle.props.onBlur) {
            this.props.toggle.props.onBlur(e);
        }

        this.closing = true;

        setTimeout(() => {
            if (this.closing) {
                this.close();
            }
        }, 100);
    }

    /**
     * Toggles between showing/hiding the <DropdownMenu> component.
     *
     * @param {SyntheticEvent} e
     * @private
     */
    onClick = (e) => {
        if (this.props.toggle.props.onClick) {
            this.props.toggle.props.onClick(e);
        }

        this.state.open ? this.close() : this.open();
    }

    onFocus = (e) => {
        if (this.props.toggle.props.onFocus) {
            this.props.toggle.props.onFocus(e);
        }

        this.open();
    }

    /**
     * Close the menu if it is currently open, invoking "callback" after the menu
     * has been closed.
     *
     * @param {function} callback
     */
    close = (callback) => {
        if (this.state.open) {
            const { onClose } = this.props;

            this.setState({ open: false }, () => {
                if (onClose) onClose();
                if (callback) callback();
            });
        }
    }

    /**
     * Focus the <DropdownMenu> if it has been mounted.
     */
    focus () {
        if (this.refs.menu) {
            this.refs.menu.focus();
        }
    }

    /**
     * Open the menu if it is not currently open, invoking "callback" after the
     * menu has been openned.
     *
     * @param {function} callback
     */
    open (callback) {
        if (!this.state.open) {
            const self = this;

            this.setState({ open: true }, () => {
                if (callback) callback();
                if (self.props.onOpen) self.props.onOpen();
                self.focus();
            });
        }
    }

    componentDidMount () {
        // keep ref. to this component DOM element
        this.el = ReactDOM.findDOMNode(this);
        window.addEventListener('click', this._onWindowClick);
    }

    componentWillUnmount () {
        window.removeEventListener('click', this._onWindowClick);
    }

    _onWindowClick = (event) => {
        if (this.el !== event.target && !this.el.contains(event.target)) {
            this.close(null);
        }
    }
}

Dropdown.defaultProps = {
    Component: 'div',
    align: 'left',
    trigger: 'click'
};

Dropdown.propTypes = {
    Component: PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.string
    ]),
    align: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.node,
    className: PropTypes.string,
    menuProps: PropTypes.object,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    toggle: PropTypes.element.isRequired,
    trigger: PropTypes.oneOf(['click', 'focus'])
};

export default Dropdown;
