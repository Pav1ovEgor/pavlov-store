import React, { useContext, useState } from 'react';
import { Context } from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { getRole, getEmail } from "../http/userAPI";
import userImage from '../assets/user.png'

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    getRole().then((result) => { setRole(result.data) });
    getEmail().then((result) => { setEmail(result.data) });

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }


    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} className="text-decoration-none h5" to={SHOP_ROUTE}>
                    Pavlov-Store
                </NavLink>
                {user.isAuth ?
                    <Nav className="ms-auto" style={{ color: 'white' }}>
                        <div className='d-flex align-items-center'><Image width={25} height={25} src={userImage}></Image></div>
                        <div className='d-flex align-items-center ms-2 me-3'>{email}</div>

                        <Button variant={"outline-light"}
                            onClick={() => navigate(BASKET_ROUTE)}
                            className="ms-2"
                        >
                            Корзина
                        </Button>

                        {role === "ADMIN" && (<Button variant={"outline-light"}
                            onClick={() => { navigate(ADMIN_ROUTE) }}
                            className="ms-2"
                        >
                            Админ панель
                        </Button>)
                        }
                        <Button variant={"outline-light"}
                            onClick={() => { logOut(); navigate(LOGIN_ROUTE); localStorage.clear() }}
                            className="ms-2"
                        >
                            Выйти
                        </Button>

                    </Nav>
                    :
                    <Nav className="ms-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
});

export default NavBar;