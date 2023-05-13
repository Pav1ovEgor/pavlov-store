import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';


const Footer = observer(() => {
  return (
    <footer className="bg-dark py-1 fixed-bottom bottom-0 mt-5 py-3">
      <Container>
        <Row>
          <Col xs={12} md={6} className="d-flex align-items-center">
            <p className="m-0" style={{ color: 'white' }}>&copy; {new Date().getFullYear()} Pavlov-Store.ru</p>
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-end">
            <ul className="list-inline text-end m-0">
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none">Связь: +79000000000</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
});


export default Footer;