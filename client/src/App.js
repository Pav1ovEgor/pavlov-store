import React, {useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import {Context} from "./index";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true) //Проверка.

  useEffect(() => {
    check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
      <BrowserRouter>
          <NavBar />
          <AppRouter />
          <Footer />
      </BrowserRouter>
  )
});

export default App;
