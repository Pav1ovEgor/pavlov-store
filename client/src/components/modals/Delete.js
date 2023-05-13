import React, { useEffect, useContext } from 'react';
import {Modal, Button, Dropdown, Form} from "react-bootstrap"
import {deleteOneType, deleteOneBrand, deleteOneComponent} from "../../http/componentAPI";
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import {fetchTypes, fetchBrands, fetchComponents} from "../../http/componentAPI";

const Delete = observer(({show, onHide}) => {  

    const {component} = useContext(Context) 
      useEffect(() => {
        fetchTypes().then(data => component.setTypes(data))
        fetchBrands().then(data => component.setBrands(data))
        fetchComponents(null, null, 1, 25).then(data => {
          component.setComponents(data.rows)
          component.setTotalCount(data.count)
        })
    }, [])

    const deleteType = () => {
      deleteOneType(component.selectedType.id).then(data => {
          onHide()
      })
    }
    const deleteBrand = () => {
      deleteOneBrand(component.selectedBrand.id).then(data => {
          onHide()
      })
    }
    const deleteComponent = () => {
      deleteOneComponent(component.selectedComponent.id).then(data => {
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
            {(component.selectedButton === 1) ? 'Удалить тип' : (component.selectedButton === 2) ? 'Удалить бренд' : 'Удалить компонент'}
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
            </Dropdown>
        :
        (component.selectedButton === 2) ?
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
            </Dropdown>
        :
          <Dropdown className='mt-2 mb-2'>
          <Dropdown.Toggle>{component.selectedComponent.name || "Выберите компонент"}</Dropdown.Toggle>
          <Dropdown.Menu>
              {component.components.map(componente => 
                  <Dropdown.Item 
                      onClick={() => component.setSelectedComponent(componente)} 
                      key={componente.id}
                  >
                      {componente.name}
                  </Dropdown.Item>
              )}

          </Dropdown.Menu>
          </Dropdown>
        }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='btn btn-success' onClick={() => {(component.selectedButton === 1) ? deleteType() : 
            (component.selectedButton === 2) ? deleteBrand() : deleteComponent(); 
            component.setSelectedType({}); component.setSelectedBrand({}); component.setSelectedComponent({})}}>
              Удалить
          </Button>
          <Button variant='btn btn-danger' onClick={() => {onHide(); component.setSelectedType({}); component.setSelectedBrand({}); component.setSelectedComponent({})}}>Закрыть</Button>
        </Modal.Footer>
    </Modal>
    

    )
});

export default Delete;