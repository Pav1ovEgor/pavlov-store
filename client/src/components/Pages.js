import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container, Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {component} = useContext(Context)
    const pageCount = Math.ceil(component.totalCount / component.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3 p-5 mb-5">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={component.page === page}
                    onClick={() => component.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;