import React, { useCallback, useContext, useState } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; 
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE //true if sovpadenie
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const onInputEmail = useCallback((e) => {
        const { value } = e.target
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const isValid = value.match(regex)

        setIsEmailValid(isValid)
        setEmail(e.target.value)
    }, [])

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className='m-auto'> {isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вашу почту"
                        value={email}
                        onChange={onInputEmail}
                        isValid={isEmailValid}
                    />
                    <div style={{ color: 'gray' }}>
                        <small>Введите email в формате sameone@example.com</small>
                    </div>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйтесь!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунта? <NavLink to={LOGIN_ROUTE}> Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                            disabled={!isEmailValid}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;