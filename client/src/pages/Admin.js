import React, { useState, useContext } from 'react';
import { Container, Button, Form } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand';
import CreateComponent from '../components/modals/CreateComponent';
import CreateType from '../components/modals/CreateType';
//
import Delete from '../components/modals/Delete';
import Update from '../components/modals/Update';
import UpdateComponent from '../components/modals/UpdateComponent';
import UpdateInfo from '../components/modals/UpdateInfo';
import UpdateAmount from '../components/modals/UpdateAmount';
import UpdateOrder from '../components/modals/UpdateOrder';
import { Context } from '../index';

const Admin = () => {
  const { component } = useContext(Context)
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [componentVisible, setComponentVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false)
  const [updateComponentVisible, setUpdateComponentVisible] = useState(false)
  const [updateInfoVisible, setUpdateInfoVisible] = useState(false)
  const [updateAmountVisible, setUpdateAmountVisible] = useState(false)
  const [updateOrderVisible, setUpdateOrderVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">


      <Form>
        <h2 className="py-3 pb-2 border-bottom">Настройка типов</h2>
        <Form className="row g-4 py-2 row-cols-lg-3">
          <Form className="col d-flex">
            <Form>
            </Form>
            <Form>
              <h2>Добавление</h2>
              <Button
                variant='btn btn-success'
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
              >
                Добавить тип
              </Button>
            </Form>
          </Form>
          <Form className="col d-flex">
            <Form>
            </Form>
            <Form>
              <h2>Удаление</h2>
              <Button
                variant='btn btn-danger'
                className="mt-4 p-2"
                onClick={() => { setDeleteVisible(true); component.setSelectedButton(1) }}
              >
                Удаление типа
              </Button>
            </Form>
          </Form>
          <Form className="col d-flex">
            <Form>
            </Form>
            <Form>
              <h2>Изменение</h2>
              <Button
                variant='btn btn-primary'
                className="mt-4 p-2"
                onClick={() => { setUpdateVisible(true); component.setSelectedButton(1) }}
              >
                Изменение типа
              </Button>
            </Form>
          </Form>
        </Form>
      </Form>
      <h1 className="border-bottom"> </h1>

      <div className="p-2 mt-4"/>

      <Form>
        <h2 className="py-3 pb-2 border-bottom ">Настройка брендов</h2>
        <Form className="row g-4 py-2 row-cols-lg-3">
          <Form className="col d-flex">
            <Form>
            </Form>
            <Form>
              <h2>Добавление</h2>
              <Button
                variant='btn btn-success'
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
              >
                Добавить бренд
              </Button>
            </Form>
          </Form>
          <Form className="col d-flex">
            <Form>
            </Form>
            <Form>
              <h2>Удаление</h2>
              <Button
                variant='btn btn-danger'
                className="mt-4 p-2"
                onClick={() => { setDeleteVisible(true); component.setSelectedButton(2) }}
              >
                Удаление бренда
              </Button>
            </Form>
          </Form>
          <Form className="col d-flex">
            <Form>
            </Form>
            <Form>
              <h2>Изменение</h2>
              <Button
                variant='btn btn-primary'
                className="mt-4 p-2"
                onClick={() => { setUpdateVisible(true); component.setSelectedButton(2) }}
              >
                Изменение бренда
              </Button>
            </Form>
          </Form>
        </Form>
      </Form>
      <h1 className="border-bottom"> </h1>

      <div className="p-2 mt-4"/>

      <Form>
        <h2 className="py-3 pb-2 border-bottom">Настройка компонентов</h2>
        <Form className="row g-4 py-2 row-cols-lg-3">
          <Form className="col d-flex">
            <Form>
            </Form>
            <Form>
              <h2>Добавление</h2>
              <Button
                variant='btn btn-success'
                className="mt-4 p-2"
                onClick={() => setComponentVisible(true)}
              >
                Добавить компонент
              </Button>
            </Form>
          </Form>
          <Form className="col d-flex">
            <Form>
            </Form>
            <Form>
              <h2>Удаление</h2>
              <Button
                variant='btn btn-danger'
                className="mt-4 p-2"
                onClick={() => { setDeleteVisible(true); component.setSelectedButton(3) }}
              >
                Удаление компонента
              </Button>
            </Form>
          </Form>
          <Form className="col d-flex">
            <Form>
              <h2>Изменение</h2>
              <Button
                variant='btn btn-primary'
                className="mt-4 p-2"
                onClick={() => { setUpdateComponentVisible(true) }}
              >
                Изменение компонента
              </Button>
            </Form>
          </Form>
        </Form>
      </Form>
        <Form className='d-flex justify-content-center me-5'>
        <Button
          variant='btn btn-info'
          className="mt-4 p-2 me-2"
          onClick={() => { setUpdateInfoVisible(true); }}
        >
          Настройка характеристик
        </Button>
        <Button
          variant='btn btn-info'
          className="mt-4 p-2"
          onClick={() => { setUpdateAmountVisible(true); }}
        >
          Изменение количества компонентов
        </Button>
        </Form>
      <h1 className="border-bottom mt-2"> </h1>

      <Button
          variant='btn btn-info'
          className="mt-3 p-2 mb-5"
          onClick={() => { setUpdateOrderVisible(true); }}
        >
          Заказы
      </Button>

      <div className="p-2 mt-4"/>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateComponent show={componentVisible} onHide={() => setComponentVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <Delete show={deleteVisible} onHide={() => setDeleteVisible(false)} />
      <Update show={updateVisible} onHide={() => setUpdateVisible(false)} />
      <UpdateComponent show={updateComponentVisible} onHide={() => setUpdateComponentVisible(false)} />
      <UpdateInfo show={updateInfoVisible} onHide={() => setUpdateInfoVisible(false)} />
      <UpdateAmount show={updateAmountVisible} onHide={() => setUpdateAmountVisible(false)} />
      <UpdateOrder show={updateOrderVisible} onHide={() => setUpdateOrderVisible(false)} />
    </Container>
  )
}

export default Admin;