import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ComponentStore from './store/ComponentStore';
import UserStore from './store/UserStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        component: new ComponentStore()
    }}>
    <App />
    </Context.Provider>,
);

