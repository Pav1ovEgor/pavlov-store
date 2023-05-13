import React, { useState } from 'react';
import { Modal, Button, Form } from "react-bootstrap"
import { createBrand } from "../../http/componentAPI";

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState('')

  const addBrand = () => {
    createBrand({ name: value }).then(data => {
      setValue('')
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
          Добавить новый брэнд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Введите название брэнда"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='btn btn-success' onClick={addBrand}>Добавить</Button>
        <Button variant='btn btn-danger' onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand;