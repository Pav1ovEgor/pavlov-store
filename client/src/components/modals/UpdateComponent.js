import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Modal, Button, Form, Dropdown } from "react-bootstrap"
//import { Typeahead } from 'react-bootstrap-typeahead';
import { updateOneComponent, fetchBrands, fetchTypes, fetchComponents } from "../../http/componentAPI";
import { observer } from 'mobx-react-lite';


const UpdateComponent = observer(({ show, onHide }) => {
    const { component } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [amount, setAmount] = useState(0) // Количество на складе

    useEffect(() => {
        fetchTypes().then(data => component.setTypes(data))
        fetchBrands().then(data => component.setBrands(data))
        fetchComponents(null, null, 1, 25).then(data => {
            component.setComponents(data.rows)
            component.setTotalCount(data.count)
        })
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const updateComponent = () => {
        const formData = new FormData()
        formData.append('id', component.selectedComponent.id)
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', component.selectedBrand.id)
        formData.append('typeId', component.selectedType.id)
        formData.append('amount', amount)
        updateOneComponent(formData, component.selectedComponent.id, component.selectedComponent.id).then(data => onHide())
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


                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-3'
                        placeholder='Введите название компонента'
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Введите стоимость компонента'
                        type="number"
                    />
                    Цена
                    <Form.Control
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Введите количество на складе'
                        type="number"
                    />
                    Кол-во на складе
                    <Form.Control
                        className='mt-3'
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='btn btn-success' onClick={updateComponent}>Изменить</Button>
                <Button variant='btn btn-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
});

export default UpdateComponent;