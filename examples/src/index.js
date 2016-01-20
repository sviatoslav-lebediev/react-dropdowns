var React = require('react');
var ReactDOM = require('react-dom');
var ReactDropdownMenus = require('../../dist/react-dropdown-menus');

var Dropdown = ReactDropdownMenus.Dropdown;
var DropdownItem = ReactDropdownMenus.DropdownItem;

var App = (
  <div className="react-dropdown-menus">
    <h3>react-dropdown-menus</h3>

    <Dropdown button="Toggle">
      <DropdownItem label="Item 1" />
      <DropdownItem label="Item 2">
        <DropdownItem label="Item A" />
        <DropdownItem label="Item B" href="/" />
        <DropdownItem label="Item C">
          <DropdownItem label="Item I" />
          <DropdownItem label="Item II" />
        </DropdownItem>
      </DropdownItem>
    </Dropdown>

  </div>
);

ReactDOM.render(App, document.getElementById('app'));