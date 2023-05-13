import "../styles/Basket.css";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { Container, Button, ListGroup, Row, Col, Form } from 'react-bootstrap';
import { fetchOneComponent, fetchOrder, fetchBasket, createOrder } from '../http/componentAPI';
import { getId } from '../http/userAPI';
import BasketRow from '../components/BasketRow';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
	// Подгрузка заказов и корзин.
	const { component } = useContext(Context)
	const { user } = useContext(Context) // userStore

	const userId = user.user.id
	const [basket, setBasket] = useState([])
	const [address, setAddress] = useState('')
	const [polzId, setPolzId] = useState('') //Id пользователя

	getId().then((result) => { setPolzId(result.data) }) //Id пользователя

	useEffect(() => {
		fetchOrder(polzId).then(data => component.setOrders(data))
	}, [polzId])

	useEffect(() => {
		fetchBasket(component.selectedOrder.id).then(data => component.setBaskets(data))
	}, [component.selectedOrder.id])

	let finalPrice = 0;

	const addOrder = async () => {
		try {
			let data;
			const formData = new FormData()
			formData.append('address', address)
			formData.append('status', "Создано")
			formData.append('userId', polzId)
			formData.append('finalPrice', finalPrice)
			formData.append('baskets', JSON.stringify(basket))
			data = await createOrder(formData).then(data => setAddress(''))
		} catch (e) {
			alert(e.response.data.message)
		}
	}

	const updateBasket = useCallback(() => {
		const basketData = localStorage.getItem(userId)
		const newBasketData = JSON.parse(basketData)
		if (basketData !== null) {
			const newBasket = []
			const ids = Object.keys(JSON.parse(basketData))
			const promises = []

			if (ids.length === 0) {
				setBasket(newBasket)
			} else {
				ids.forEach((id) => {
					promises.push(fetchOneComponent(id).then(data => {
						if (data === null) {
							delete newBasketData[id]
							localStorage.setItem(userId, JSON.stringify(newBasketData))
						}

						return {
							...data,
							amountInBasket: JSON.parse(basketData)[id]
						}
					}))
				})
				Promise.all(promises)
					.then(data => setBasket(data))
					.catch((e) => alert("Всё плохо"))
			}

		}
	}, [])

	const onCreateOrder = useCallback(() => {
		addOrder()
		setBasket([])

		localStorage.removeItem(userId)
		window.location.reload()
	}, [addOrder])

	useEffect(() => updateBasket(), [])

	return (
		<Container className="pt-4">
			<div className='fs-1 text-success d-flex justify-content-around mb-3'>Корзина</div>
			{
				basket.length > 0
					?
					<div>
						{basket.map((item, index) => (
							<BasketRow
								key={item.id}
								id={item.id}
								name={item.name}
								index={index}
								amountInBasket={item.amountInBasket}
								price={item.price}
								amount={item.amount}
								updateBasket={updateBasket}
							/>
						))}

						{basket.forEach(i => finalPrice += (i.price * i.amountInBasket))}

						<div className='d-flex justify-content-end p-2 mt-3'>
							<div className='d-flex align-items-center'>
								<div className='text-nowrap  me-3'>
									<b>Цена: {finalPrice} ₽</b>
								</div>
								<Form.Control
									value={address}
									style={{ minWidth: '135px' }}
									onChange={e => {
										const value = e.target.value;
										setAddress(value);
										const regex = /^\s*([^\d,]+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$/i;
										if (regex.test(value) || value === {}) {
											e.target.classList.remove('is-invalid');
											e.target.classList.add('is-valid');
										} else {
											e.target.classList.remove('is-valid');
											e.target.classList.add('is-invalid');
										}
									}}
									//onChange={e => setAddress(e.target.value)}
									className='me-3'
									placeholder='Улица, дом, кв'
								/>
							</div>
							<Button
								variant='btn btn-primary'
								onClick={onCreateOrder}
								disabled={!address || !address.trim() || !/^\s*([^\d,]+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$/i.test(address)}
							>
								Оформить заказ
							</Button>
						</div>
					</div>
					: <div className='fs-1 text-danger d-flex justify-content-around'>Корзина пустая</div>
			}


			<div className='pt-5 fs-1 text-success d-flex justify-content-around'>Заказы</div>

			{component.orders.length > 0 ?
				<Form>
					<ListGroup className='list-group-horizontal-sm'>
						{component.orders.map(order =>
							<ListGroup.Item
								style={{ cursor: 'pointer' }}
								key={order.id}
								active={order.id === component.selectedOrder.id}
								className="basket__orders-list p-3"
								onClick={() => component.setSelectedOrder(order)}
							>
								<div>
									Заказ от {new Date(order.createdAt).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
								</div>
								<div className='text-danger'>
									Статус: {order.status}
								</div>
								<div>
									Адрес: {order.address}
								</div>
								<div>
									Цена: {order.finalPrice} <b>₽</b>
								</div>
							</ListGroup.Item>
						)}
					</ListGroup>


					<Row className="d-flex flex-column mt-3">
						<h3>Купленные компоненты:</h3>
						{component.baskets.map((basket, index) =>
							<Row key={basket.id} className="d-flex align-items-center" style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
								<Col className=''>
									<b>{basket.component.name}</b> в количестве {basket.amount}
								</Col>
								<Col md={2} className="d-flex align-items-center justify-content-end">
									{basket.component.price * basket.amount} &nbsp;<b>₽</b>
								</Col>
							</Row>
						)}
					</Row>
				</Form>
				:
				<Form>
					<div className='pt-5 fs-1 text-danger d-flex justify-content-around'>Предыдущих заказов нет</div>
				</Form>
			}
		</Container>
	)
});

export default Basket;
