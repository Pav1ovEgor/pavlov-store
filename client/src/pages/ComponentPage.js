import "../styles/ComponentPage.css"
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Col, Row, Card, Button, Image } from 'react-bootstrap'
import { Context } from '../index';
import { useParams } from 'react-router-dom';
import { fetchOneComponent } from '../http/componentAPI';

const ComponentPage = () => {
    const [component, setComponent] = useState({ info: [] })
    const { user } = useContext(Context) //userStore
    const { id } = useParams()
    const [count, setCount] = useState(0)
    const userId = user.user.id

    useEffect(() => {
        fetchOneComponent(id).then(data => setComponent(data))
    }, [])

    const onAddToBasket = useCallback(() => {
        const basketData = localStorage.getItem(userId)
        // Проверяем, есть ли уже такая корзина
        if (basketData === null) {
            if (component.amount !== 0) {
                localStorage.setItem(userId, JSON.stringify({
                    [`${id}`]: 1
                }))
                setCount(1)
            }
        } else {
            if (component.amount !== 0) {
                let newBasketData = JSON.parse(basketData)
                if (newBasketData[id]) {
                    if (newBasketData[id] < component.amount) {
                        localStorage.setItem(userId, JSON.stringify({
                            ...newBasketData,
                            [`${id}`]: newBasketData[id] + 1
                        }))
                        setCount(newBasketData[id] + 1)
                    } else {
                        alert("Вы добавили максимум товара в корзину, больше на складе нет")
                    }
                } else {
                    localStorage.setItem(userId, JSON.stringify({
                        ...newBasketData,
                        [`${id}`]: 1
                    }))
                    setCount(1)
                }
            }
        }
    }, [id, component])

    useEffect(() => {
        const basketData = JSON.parse(localStorage.getItem(userId))
        if (basketData !== null && basketData[id]) {
            setCount(Number(basketData[id]))
        }
    }, [])

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={12}>
                    <h1>{component.name}</h1>
                </Col>
            </Row>
            <Row className="d-flex justify-content-between mb-5 mt-4">
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + component.img} />
                </Col>

                <Col md={3} className="d-flex justify-content-end">
                    <Card className='d-flex flex-column justify-content-between component-page__info'>
                        <div className="d-flex flex-column">
                            <span><b>Цена:</b> {component.price} ₽</span>
                            {component.amount !== 0 ?
                                <span><b>Количество на складе:</b> {component.amount} шт.</span>
                                :
                                <div className="text-danger">Отсутствует на складе</div>
                            }
                        </div>
                        <Button
                            variant={component.amount !== 0 && user.isAuth ? "outline-dark" : "outline-dark btn btn-secondary btn-lg disabled"}
                            onClick={onAddToBasket}
                        >
                            {count === 0 ? "В корзину" : `В корзине: ${count}`}
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column mb-5">
                <h3>Характеристики:</h3>
                {component.info.map((info, index) =>
                    <div key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}: {info.description}
                    </div>
                )}
            </Row>
        </Container>
    )
}

export default ComponentPage;