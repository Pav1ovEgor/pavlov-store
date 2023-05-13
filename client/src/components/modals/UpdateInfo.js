import React, { useState, useEffect, useContext} from 'react';
import { Context } from '../../index';
import {Modal, Button, Form, Dropdown} from "react-bootstrap"
import {updateOneInfo, fetchComponents, fetchComponentInfo, createInfo, deleteOneInfo} from "../../http/componentAPI";
import { observer } from 'mobx-react-lite';

const UpdateInfo = observer(({show, onHide}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [createOrUpdate, setCreateOrUpdate] = useState(1)

    const {component} = useContext(Context)
    useEffect(() => {
        fetchComponentInfo(component.selectedComponent.id).then(data => component.setInfos(data))
        fetchComponents(null, null, 1, 25).then(data => {
            component.setComponents(data.rows)
            component.setTotalCount(data.count)
          })  
    }, [])

    useEffect(() => {
      fetchComponentInfo(component.selectedComponent.id).then(data => component.setInfos(data))
    }, [component.selectedComponent.id])

    const addInfo = () => {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('componentId', component.selectedComponent.id)
      createInfo(formData).then(data => onHide())
    }

    const updateInfo = () => {
      updateOneInfo(component.selectedName.id, component.selectedButton).then(data => {
          onHide()
      })
    }

    const deleteInfo = () => {
      deleteOneInfo(component.selectedName.id).then(data => {
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
            Настройка характеристик
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Dropdown className='mt-2 mb-2'>
          <Dropdown.Toggle>{component.selectedComponent.name || "Выберите компонент"}</Dropdown.Toggle>
          <Dropdown.Menu>
              {component.components.map(componente => 
                  <Dropdown.Item 
                      onClick={() => {{component.setSelectedComponent(componente); component.setSelectedName({})}}} 
                      key={componente.id}
                  >
                      {componente.name}
                  </Dropdown.Item>
              )}

          </Dropdown.Menu>
          </Dropdown>

          {(createOrUpdate === 1) ?
          <Form>
          <Form.Control
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className='mt-3'
                    placeholder='Введите название характеристики'
          />
          <Form.Control
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className='mt-3'
                    placeholder='Введите описание характеристики'
          />
          </Form>
            :
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{component.selectedName.title || "Выберите характеристику"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {component.infos.map(info => 
                    <Dropdown.Item 
                        onClick={() => component.setSelectedName(info)} 
                        key={info.id}
                    >
                        {info.title}
                    </Dropdown.Item>
                )}                
            </Dropdown.Menu>    
            <Form className='mt-2 mb-2'>
                    <Form.Control
                        onChange={e => component.setSelectedButton(e.target.value)}
                        placeholder={"Введите новое название"}
                    />
            </Form>
            </Dropdown>
          }

        </Modal.Body>
        <Modal.Footer>
          {(createOrUpdate === 1) ?
          <Button variant='btn btn-primary' className="position-absolute start-0" onClick={() => setCreateOrUpdate(2)}>Изменить хар-ки</Button>
          :
          <Button variant='btn btn-primary' className="position-absolute start-0" onClick={() => setCreateOrUpdate(1)}>Добавить хар-ки</Button>
          }
          {(createOrUpdate === 1) ?
          <Button variant='btn btn-success' onClick={() => {addInfo()}}>Добавить</Button>
          :
          <form>
          <Button variant='btn btn-success' className="ms-2" onClick={updateInfo}>Изменить</Button>

          <Button variant='btn btn-warning' className="ms-2" onClick={deleteInfo}>Удалить</Button>
          </form>
          }          
          <Button variant='btn btn-danger' onClick={() => {onHide(); component.setSelectedName({}); component.setSelectedComponent({}); component.selectedComponent.id([]);}}>Закрыть</Button>
        </Modal.Footer>
    </Modal>
    )
});

export default UpdateInfo;