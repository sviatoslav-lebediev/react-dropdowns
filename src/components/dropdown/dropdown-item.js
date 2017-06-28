import React  from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DropdownMenu from './dropdown-menu';

class DropdownItem extends React.Component {
    render () {
        const {
            active,
            children,
            className,
            href,
            label,
            onItemSelected,
            onRequestClose,
            target,
            title,
            ...other
            } = this.props;

        const classes = classNames(className, {
            'active': active,
            'asc-dropdown-submenu': !!children
        });

        let menu;

        if (children) {
            const display = active ? 'list-item' : 'none';
            menu = (
                <DropdownMenu
                    ref='menu'
                    style={{ display }}
                    onItemSelected={onItemSelected}
                    onRequestClose={onRequestClose}
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
                onClick={this.onClick}
            >
                { React.isValidElement(label)
                    ? label
                    : <a
                        href={href}
                        onClick={this.onAnchorClick}
                        role={href === null ? 'button' : undefined}
                        target={target}
                        title={title}
                    >
                        {label}
                    </a>
                }
                {menu}
            </li>
        );
    }

    /**
     * If this component has "menu" ref, focus it's menu.
     */
    focus () {
        if (this.refs.menu) {
            this.refs.menu.focus();
        }
    }

    onAnchorClick = (e) => {
        if (this.props.href === null) {
            e.preventDefault();
        }
    }

    onClick = (e) => {
        const { onClick, onRequestClose } = this.props;

        if (onClick) {
            onClick(e);
        }

        onRequestClose();
    }
}

DropdownItem.defaultProps = {
    active: false,
    href: null
};

DropdownItem.propTypes = {
    /**
     * Set by parent <Dropdown> menu
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    label: PropTypes.node,
    onClick: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,

    // <a> specific props
    // ------------------
    href: (props) => {
        if (props.children && props.href) {
            return new Error('Children will not be rendered if "href" is set.');
        }
    },
    target: PropTypes.string,
    title: PropTypes.string
};

export default DropdownItem;
