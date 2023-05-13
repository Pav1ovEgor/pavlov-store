import "../styles/ComponentItem.css"
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
// import star from '../assets/star.png'
import { useNavigate } from "react-router-dom"
import { COMPONENT_ROUTE } from '../utils/consts';

const ComponentItem = ({ component }) => {
    const navigate = useNavigate()
    
    return (
        <Col md={3} className="mt-3" onClick={() => navigate(COMPONENT_ROUTE + '/' + component.id)}>
            <Card className="component-item">
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + component.img} />
                <div className="component-item__info">
                    <div className="component-item__title">{component.name}</div>
                    {component.amount !== 0 ? <div className='text-success'> {component.amount} на складе </div> : <div className='text-danger'>Нет на складе</div>}
                    <div className="text-primary">Цена : {component.price} <b>₽</b></div>
                </div>
            </Card>
        </Col>
    )
}

export default ComponentItem;