    import { observer } from 'mobx-react-lite';
    import React, { useContext, useState } from 'react';
    import { ListGroup, Dropdown } from 'react-bootstrap';
    import { Context } from '../index';

    const BrandBar = observer(() => {
    const { component } = useContext(Context);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleBrandSelect = (brand) => {
        if (component.selectedBrand?.id === brand.id) {
        component.setSelectedBrand({});
        } else {
        component.setSelectedBrand(brand);
        }
    };

    const listGroupItems = component.brands.map((brand) => (
        <ListGroup.Item
        style={{ cursor: 'pointer' }}
        active={brand.id === component.selectedBrand?.id}
        key={brand.id}
        className="p-3"
        onClick={() => handleBrandSelect(brand)}
        >
        {brand.name}
        </ListGroup.Item>
    ));

    const dropdownItems = component.brands.slice(12).map((brand) => (
        <Dropdown.Item
            style={{ cursor: 'pointer' }}
            active={brand.id === component.selectedBrand?.id}
            key={brand.id}
            onClick={() => handleBrandSelect(brand)}
        >
            {brand.name}
        </Dropdown.Item>
        ));

    return (
        <div>
        {component.brands.length > 12 ? (
            <div>
            <ListGroup className="list-group-horizontal-sm">
                {listGroupItems.slice(0, 12)}
            </ListGroup>
            <Dropdown
                className='d-flex align-items-center'
                show={showDropdown}
                align="end"
                onToggle={(isOpen) => setShowDropdown(isOpen)}
            >
                <Dropdown.Toggle variant="light">
                {component.selectedBrand?.name || 'Выберите бренд'}
                </Dropdown.Toggle>
                <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
            </Dropdown>
            </div>
        ) : (
            <ListGroup className="list-group-horizontal-sm">
            {listGroupItems}
            </ListGroup>
        )}
        </div>
    );
    });

    export default BrandBar;