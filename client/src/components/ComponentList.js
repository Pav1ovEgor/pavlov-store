import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {Row} from 'react-bootstrap'
import { Context } from '../index';
import ComponentItem from './ComponentItem';

const ComponentList = observer(() => {
    const {component} = useContext(Context)
    return (        
        <Row className="d-flex">
            {component.components.length !== 0 ?
            null
            :
            <div className='fs-2 d-flex ms-5 mt-5'>Ничего не найдено</div>
            }
            {component.components.map(component =>
                <ComponentItem key={component.id} component={component}/>
            )}            
        </Row>       
    )
})

export default ComponentList;