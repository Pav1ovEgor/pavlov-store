import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import ComponentList from '../components/ComponentList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchBrands, fetchComponents, fetchTypes } from '../http/componentAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {
    const { component } = useContext(Context) //componentStore

    useEffect(() => {
        fetchTypes().then(data => component.setTypes(data))
        fetchBrands().then(data => component.setBrands(data))
        fetchComponents(null, null, 1, 8).then(data => {
            component.setComponents(data.rows)
            component.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchComponents(component.selectedType.id, component.selectedBrand.id, component.page, 8, component.selectedName).then(data => {
            component.setComponents(data.rows)
            component.setTotalCount(data.count)
        })
    }, [component.page, component.selectedType, component.selectedBrand, component.selectedName,])

    return (
        <Container>
            <Form>
                <Form.Control
                    onChange={e => component.setSelectedName(e.target.value)}
                    className='mt-3'
                    placeholder={"Введите название компонента"}
                />
            </Form>

            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <ComponentList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
});

export default Shop;