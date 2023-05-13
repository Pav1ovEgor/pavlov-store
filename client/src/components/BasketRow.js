import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap'
import { Context } from '../index';


const BasketRow = ({ name, index, amountInBasket, price, id, updateBasket, amount }) => {
    const { user } = useContext(Context) // userStore
    const userId = user.user.id

    const onIncrease = useCallback(() => {
        const basketData = JSON.parse(localStorage.getItem(userId))
        if (basketData[id] === amount) {
            return
        }
        const newBasketData = {
            ...basketData,
            [`${id}`]: basketData[id] + 1
        }
        localStorage.setItem(userId, JSON.stringify(newBasketData))
        updateBasket()
    }, [updateBasket])

    const onDecrease = useCallback(() => {
        const basketData = JSON.parse(localStorage.getItem(userId))
        const newBasketData = {
            ...basketData,
            [`${id}`]: basketData[id] - 1
        }
        if (newBasketData[id] === 0) {
            delete newBasketData[id]
        }
        localStorage.setItem(userId, JSON.stringify(newBasketData))
        updateBasket()
    }, [updateBasket])


    return (
        <Row className="d-flex align-items-center" style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            <Col md={4}>
                {name}
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-end">
                <Button variant={"outline-dark"} onClick={()=>{onDecrease();}}>
                    -
                </Button>
                <div className="px-2 d-flex justify-content-center" style={{ width: 40 }}>
                    {amountInBasket}
                </div>
                <Button variant={"outline-dark"} onClick={()=>{onIncrease();}}>
                    +
                </Button>
            </Col>
            <Col md={2} className="d-flex align-items-center justify-content-end">
                {price * amountInBasket}&nbsp;<b>₽</b>
            </Col>
        </Row>
    )
}


export default BasketRow;