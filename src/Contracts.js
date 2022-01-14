import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ReactPaginate from 'react-paginate';

import { contactService } from './_services/contact.service';

export function Contracts() {

    const [pageCount, setPageCount] = useState(null);
    const [totalCount, setTotalCount] = useState(null);
    const [firstRow, setFirstRow] = useState(null);
    const [lastRow, setLastRow] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        refresh();
    }, []);

     const refresh = (pageNumber) => {
        setError();
        contactService.getPage({pageNumber}).then(
            result => {
                setPageCount(result.pageCount);
                setTotalCount(result.totalCount);
                setFirstRow(result.firstRow);
                setLastRow(result.lastRow);
                setData(result.data.map((row, index) => {
                    return {
                        index,
                        ...row
                    }
                }));
            },
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }

    const columns = [
        {
            dataField: "username",
            text: "User",
            headerClasses: 'col-md-3',
        },
        {
            dataField: "name",
            text: "Name",
            headerClasses: 'col-md-3',
        },
        {
            dataField: "email",
            text: "Email",
            headerClasses: 'col-md-3',
        },
        {
            dataField: "phone",
            text: "Phone",
            headerClasses: 'col-md-3',
        }
    ];

    const defaultSorted = [
        {
            dataField: "index",
            order: "asc"
        }
    ];

    return (
        <div className="contacts-container">
            <div className="contacts-title">
                Contacts<i className="item-action bi bi-arrow-counterclockwise" alt="refresh" onClick={() => refresh()}></i>
            </div>
            {lastRow && firstRow <= lastRow && (
                <div className="mb-2">Showing rows {firstRow} to {lastRow} of {totalCount}</div>
            )}
            <BootstrapTable
                bootstrap4
                wrapperClasses='contacts'
                keyField='index'
                data={ data || [] }
                columns={ columns }
                defaultSorted={defaultSorted}
            />
            {data && data.length > 0 &&
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={(data) => { refresh(data.selected+1) }}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            }
            {(!data || data.length === 0) && 
                <div className='ms-2 mb-3'>No data.</div>
            }
            {error && 
                <div className="alert alert-danger">{error}</div>
            }            
        </div>
    );
}
