import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
const Home = () => {

    const [data, setData] = useState([]);

    // console.log(data);
    const [pageData, setPageData] = useState([]);

    const [page, setPage] = useState(1);

    const [pageCount, setPageCount] = useState(0)

    const getData = async () => {
        const response = await axios.get("https://dummyjson.com/products");
        // console.log(response.data.products);
        setData(response.data.products)
    }

    // handle next 

    const handleNext = () => {
        if (page === pageCount) return page;
        setPage(page + 1)
    }

    //    handle private 

    const handlePrevios = () => {
        if (page === 1) return page;
        setPage(page - 1)
    }
    useEffect(() => {
        getData()
    }, [page])

    useEffect(() => {
        const pagedataCount = Math.ceil(data.length / 5);
        setPageCount(pagedataCount);

        if (page) {
            const LIMIT = 5;
            const skip = LIMIT * page
            const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);
            setPageData(dataskip)
        }
    }, [data])
    return (
        <div>
            <div className="container">
                <h1>User Data</h1>

                <div className='table_id mt-3'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pageData.length > 0 ?
                                    pageData.map((element, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{element.id}</td>
                                                    <td>{element.price}</td>
                                                    <td>{element.price}</td>
                                                    <td>{element.title}</td>
                                                    <td><img src={element.thumbnail} style={{ width: 150, height: 95 }} alt="" /></td>
                                                </tr>
                                            </>
                                        )
                                    }) : <div className='d-flex justify-content-center mt-4'>

                                        Loading... <Spinner animation="border" variant='danger' />
                                    </div>
                            }
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className='d-flex justify-content-end'>
                <Pagination>

                    <Pagination.Prev onClick={handlePrevios} disabled={page === 1} />

                    {
                        Array(pageCount).fill(null).map((ele, index) => {
                            return (
                                <>
                                    <Pagination.Item active={page === index + 1 ? true : false} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                                </>
                            )
                        })
                    }

                    <Pagination.Item>{11}</Pagination.Item>

                    <Pagination.Next onClick={handleNext} disabled={page === pageCount} />
                </Pagination>
            </div>
        </div>
    )
}

export default Home