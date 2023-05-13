import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const TypeBar = observer(() => {
  const { component } = useContext(Context);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTypeSelect = (type) => {
    if (component.selectedType?.id === type.id) {
      component.setSelectedType({});
    } else {
      component.setSelectedType(type);
    }
  };

  const listGroupItems = component.types.map((type) => (
    <ListGroup.Item
      style={{ cursor: 'pointer' }}
      active={type.id === component.selectedType?.id}
      onClick={() => handleTypeSelect(type)}
      key={type.id}
    >
      {type.name}
    </ListGroup.Item>
  ));

  const dropdownItems = component.types.slice(12).map((type) => (
      <Dropdown.Item
        style={{ cursor: 'pointer' }}
        active={type.id === component.selectedType?.id}
        onClick={() => handleTypeSelect(type)}
        key={type.id}
      >
        {type.name}
      </Dropdown.Item>
    ));

  return (
    <div>
      {component.types.length > 12 ? (
        <div>
          <ListGroup>{listGroupItems.slice(0, 12)}</ListGroup>
          <Dropdown
            style={{ minWidth: '100px' }}
            show={showDropdown}
            onToggle={(isOpen) => setShowDropdown(isOpen)}
          >
            <Dropdown.Toggle variant="light">
              {component.selectedType?.name || 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <ListGroup>{listGroupItems}</ListGroup>
      )}
    </div>
  );
});

export default TypeBar;