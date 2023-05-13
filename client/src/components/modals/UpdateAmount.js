import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Modal, Button, Form, Dropdown } from "react-bootstrap"
import { updateAmountComponent, fetchComponents } from "../../http/componentAPI";
import { observer } from 'mobx-react-lite';


const UpdateAmount = observer(({ show, onHide }) => {
    const { component } = useContext(Context)
    const [newAmount, setNewAmount] = useState(0) // Количество на складе

    useEffect(() => {
        fetchComponents(null, null, 1, 25).then(data => {
            component.setComponents(data.rows)
            component.setTotalCount(data.count)
        })
    }, [])

    const updateAmount = () => {
        const formData = new FormData()
        formData.append('id', component.selectedComponent.id)
        formData.append('newAmount', newAmount)
        updateAmountComponent(formData).then(data => onHide())
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
                    Изменить компонент
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

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
                    <Form.Control
                        value={newAmount}
                        onChange={e => setNewAmount(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Введите количество на складе'
                        type="number"
                    />
                    Кол-во на складе
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='btn btn-success' onClick={updateAmount}>Изменить</Button>
                <Button variant='btn btn-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
});

export default UpdateAmount;