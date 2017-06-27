import React from 'react';
import { withRouter, Link } from 'react-router';
import { parseUrlToArray } from 'utils/string';
import Dropdown from 'components/dropdown';
import './sub-nav.scss';

class SubNav extends React.Component {
    state = {
        active: ''
    }

    constructor (props) {
        super(props);

        this.state = {
            active: props.location.pathname
        };
    }

    render () {
        const { className, items } = this.props;
        const { active } = this.state;
        const selectedKeys = parseUrlToArray(active);

        if (!items) {
            return null;
        }

        return (
            <div
                className={`asc-sub-nav ${className}`}
            >
                {
                    items.map((item) => {
                        const { children, path, label } = item;

                        return (
                            <Dropdown
                                id={this.idGenerator(label)}
                                data-walkme-id={this.walkMeIdGenerator(label + ' Menu Item')}
                                className='asc-menu-item'
                                key={path}
                                onClick={this.handleClick}
                                trigger='focus'
                                toggle={<div className={'asc-menu-title'}>{label}</div>}
                            >
                                {item.children && this.renderMenuItems(children, '/' + path, selectedKeys)}
                            </Dropdown>
                        );
                    })
                }
            </div>
        );
    }

    renderMenuItems (items, parentPath = '', selectedKeys) {
        return items.map((item) => {
            const { children, path, label } = item;
            const itemPath = `${parentPath}/${path}`;
            const labelComponent = children
                ? label
                : <Link
                    id={this.idGenerator(label)}
                    data-walkme-id={this.walkMeIdGenerator(label + ' Menu Item')}
                    to={itemPath}
                    activeClassName='route--active'>
                    {label}
                </Link>;
            const active = selectedKeys.indexOf(itemPath) !== -1;

            return (
                <Dropdown.Item
                    active={active}
                    label={labelComponent}
                    key={itemPath}
                >
                    {children && this.renderMenuItems(children, itemPath, selectedKeys)}
                </Dropdown.Item>
            );
        });
    }

    idGenerator = (label) => {
        return 'asc_' + label.toLowerCase().split(' ').join('_');
    }

    walkMeIdGenerator = (label) => {
        return label.toLowerCase().split(' ').join('_');
    }

    handleClick = (e) => {
        console.log(e.key);

        this.setState({
            active: e.key
        });
    }
}

SubNav.defaultProps = {
    className: ''
};

SubNav.propTypes = {
    className: React.PropTypes.string,
    location: React.PropTypes.object,
    items: React.PropTypes.array
};

export default withRouter(SubNav);
