import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap"
import { createComponent, fetchBrands, fetchTypes } from "../../http/componentAPI";
import { observer } from 'mobx-react-lite';


const CreateComponent = observer(({ show, onHide }) => {
    const { component } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([]) // массив х-ик
    const [amount, setAmount] = useState(0) // Количество на складе

    useEffect(() => {
        fetchTypes().then(data => component.setTypes(data))
        fetchBrands().then(data => component.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]) // Вместо айди дата
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addComponent = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('img', file)
        formData.append('brandId', component.selectedBrand.id)
        formData.append('typeId', component.selectedType.id)
        formData.append('info', JSON.stringify(info))
        formData.append('amount', amount)
        createComponent(formData).then(data => onHide())
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
                    Добавить новый компонент
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
                    Стоимость
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
                    <hr />
                    <Button
                        variant={"btn btn-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое описание
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder='Введите название'
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder='Введите описание'
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"btn btn-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>

                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='btn btn-success' onClick={addComponent}>Добавить</Button>
                <Button variant='btn btn-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
});

export default CreateComponent;