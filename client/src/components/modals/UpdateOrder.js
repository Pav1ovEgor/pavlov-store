import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap"
//import { Typeahead } from 'react-bootstrap-typeahead';
import { fetchByStatusOrder, fetchBasket, updateOneOrder } from "../../http/componentAPI";
import { observer } from 'mobx-react-lite';


const UpdateOrder = observer(({ show, onHide }) => {
    const { component } = useContext(Context)
    const [status, setStatus] = useState('')
    const [newStatus, setNewStatus] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        fetchByStatusOrder(status).then(data => component.setOrders(data))
    }, [status])
    useEffect(() => {
        fetchBasket(component.selectedOrder.id).then(data => component.setBaskets(data))
    }, [component.selectedOrder.id])

    const updateOrder = () => {
        updateOneOrder(component.selectedOrder.id, newStatus).then(data => {
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
                    Изменить компонент
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic"> {status || "Выберите статус заказа"} </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setStatus("Отменено"); component.setSelectedOrder({}); component.setBaskets([]) }}>Отменено</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setStatus("Создано"); component.setSelectedOrder({}); component.setBaskets([]) }}>Создано</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setStatus("Отправлено"); component.setSelectedOrder({}); component.setBaskets([]) }}>Отправлено</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setStatus("Доставлено"); component.setSelectedOrder({}); component.setBaskets([]) }}>Доставлено</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {status !== "" ?
                        <Form>
                            <Dropdown className='mt-2 mb-2'>
                                <Dropdown.Toggle>
                                    {component.selectedOrder.address && `Адрес "${component.selectedOrder.address}"
                    Дата "${component.selectedOrder.createdAt && new Date(component.selectedOrder.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}"
                    Email покупателя "${component.selectedOrder.user && component.selectedOrder.user.email ? component.selectedOrder.user.email : ''}"` || "Выберите заказ"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {component.orders.map(order =>
                                        <Dropdown.Item
                                            onClick={() => component.setSelectedOrder(order)}
                                            key={order.id}
                                        >
                                            {new Date(order.createdAt).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })} <div></div>
                                            {order.address} <div></div> {order.user && order.user.email ? order.user.email : ''}
                                        </Dropdown.Item>
                                    )}

                                </Dropdown.Menu>
                            </Dropdown>



                            <Row className="d-flex justify-content-around">
                                <h5>Купленные компоненты:</h5>
                                {component.baskets.map((basket, index) =>
                                    <Row key={basket.id} className="d-flex align-items-center" style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                                        <Col className=''>
                                            <b>{basket.component.name}</b> в количестве {basket.amount}
                                        </Col>
                                    </Row>
                                )}
                            </Row>



                            {component.baskets.length !== 0 ?
                                <Dropdown className='mt-2 mb-2'>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic"> {newStatus && `Новый статус заказа: "${newStatus}"` || "Выберите новый статус заказа"} </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => { setNewStatus("Отменено"); }}>Отменено</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { setNewStatus("Создано"); }}>Создано</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { setNewStatus("Отправлено"); }}>Отправлено</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { setNewStatus("Доставлено"); }}>Доставлено</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                :
                                null
                            }
                        </Form>




                        :
                        <div />
                    }

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='btn btn-success' onClick={updateOrder}>Изменить</Button>
                <Button variant='btn btn-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
});

export default UpdateOrder;