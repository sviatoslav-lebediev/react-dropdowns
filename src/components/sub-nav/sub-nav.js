import React from 'react';
import PropTypes from 'prop-types';
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
        const { className, items} = this.props;
        const { active } = this.state;
        const selectedKeys = parseUrlToArray(active);

        return (
            <div className={`asc-sub-nav ${className}`}>
                {
                    items.map((item) => {
                        const { children, path, label, walkMeId } = item;

                        return (
                            <Dropdown
                                data-walkme-id={walkMeId}
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
            const { children, path, label, walkMeId } = item;
            const itemPath = `${parentPath}/${path}`;
            const labelComponent = children
                ? label
                : <Link to={itemPath}>{label}</Link>;
            const active = selectedKeys.indexOf(itemPath) !== -1;

            return (
                <Dropdown.Item
                    data-walkme-id={walkMeId}
                    active={active}
                    label={labelComponent}
                    key={itemPath}
                >
                    {children && this.renderMenuItems(children, itemPath, selectedKeys)}
                </Dropdown.Item>
            );
        });
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
    className: PropTypes.string,
    location: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired
};

export default withRouter(SubNav);
