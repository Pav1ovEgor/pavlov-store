import React, { useEffect, useContext } from 'react';
import {Modal, Button, Dropdown, Form} from "react-bootstrap"
import {updateOneType, updateOneBrand} from "../../http/componentAPI";
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import {fetchTypes, fetchBrands} from "../../http/componentAPI";

const Update = observer(({show, onHide}) => {  

    const {component} = useContext(Context) 
      useEffect(() => {
        fetchTypes().then(data => component.setTypes(data))
        fetchBrands().then(data => component.setBrands(data))
    }, [])

    const updateType = () => {
      updateOneType(component.selectedType.id, component.selectedName).then(data => {
          onHide()
      })
    }
    const updateBrand = () => {
      updateOneBrand(component.selectedBrand.id, component.selectedName).then(data => {
          onHide()
      })
    }

    return (

    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {(component.selectedButton === 1) ? 'Изменить тип' : 'Изменить бренд'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {(component.selectedButton === 1) ? 
            <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{component.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {component.types.map(type => 
                    <Dropdown.Item 
                        onClick={() => component.setSelectedType(type)} 
                        key={type.id}
                    >
                        {type.name}
                    </Dropdown.Item>
                )}

            </Dropdown.Menu>
            <Form className='mt-2 mb-2'>
                    <Form.Control
                        onChange={e => component.setSelectedName(e.target.value)}
                        placeholder={"Введите новое название"}
                    />
            </Form>
            </Dropdown>
        :
            <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{component.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {component.brands.map(brand => 
                    <Dropdown.Item 
                        onClick={() => component.setSelectedBrand(brand)} 
                        key={brand.id}
                    >
                        {brand.name}
                    </Dropdown.Item>
                )}

            </Dropdown.Menu>    
            <Form className='mt-2 mb-2'>
                    <Form.Control
                        onChange={e => component.setSelectedName(e.target.value)}
                        placeholder={"Введите новое название"}
                    />
            </Form>
            </Dropdown>
        }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='btn btn-success' onClick={() => {(component.selectedButton === 1) ? updateType() : 
            updateBrand();
            component.setSelectedType({}); component.setSelectedBrand({}); component.setSelectedName({})}}>
              Изменить
          </Button>
          <Button variant='btn btn-danger' onClick={() => {onHide(); component.setSelectedType({}); component.setSelectedBrand({}); component.setSelectedName({})}}>Закрыть</Button>
        </Modal.Footer>
    </Modal>
    

    )
});

export default Update;