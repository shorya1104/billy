import React, { useState,useEffect } from "react";
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import style from "../../file-components/Style/style.css"
import { GetBlogService } from "@mock-api/data/datatable";
import moment from "moment";

// import { useEffect } from "react";


const Blog_Details = () => {
    // Delet modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const title = 'Blog Details';
    const description = 'Elearning Portal Course Explore Page';

    const breadcrumbs = [{ to: '', text: 'Dashboard' }];

    const [blog, setBlog] = useState([])
    let id = window.location.search.split("=").at(-1)
    useEffect(() => {
        GetBlogService({blog_id:id},(data)=>{
            setBlog(data.data)
            console.log(data)
        })

    }, [])
    
    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title and Top Buttons Start */}
            <div className="page-title-container">
                <Row>
                    {/* Title Start */}
                    <Col md="7">
                        <h1 className="mb-0 pb-0 display-4">{title}</h1>
                        <BreadcrumbList items={breadcrumbs} />
                    </Col>
                    {/* Title End */}
                </Row>
            </div>
            {/* Title and Top Buttons End */}

            <Col lg="12" xxl="12">
                <Card className="mb-3">
                    <div className='blog-handler d-flex'>
                        <Col lg="4" xxl="3 col-md-4">
                            <div>
                                <Card className="m-3">
                                {/* <img src={`http://billy247.com:3002/blog/${blog.blog_url}`} className="rounded-3 sh-50" alt="card image" /> */}
                                    <img src={`http://localhost:8000/blog/${blog.blog_url}`} className="rounded-3 sh-50" alt="card image" />
                                </Card>
                            </div>
                        </Col>
                        <Card.Body>

                            <div className="d-flex flex-row align-content-center align-items-center">
                                <div className="mb-0 text-alternate">

                                    <h1 className="fw-bolder text-primary" >
                                       {blog.title_name}
                                    </h1>
                                </div>
                            </div>

                            {/* <div className="d-flex flex-row align-content-center align-items-center">
                                <div className="mb-0 text-alternate">
                                    <span className='fs-5'>
                                        <span>{moment(blog.createdAt).format('l')}</span> <span>|</span> <span>{blog.author_name}</span>
                                    </span>
                                </div>
                            </div> */}

                            <div className="d-flex flex-row align-content-center align-items-center mt-4 mb-4">
                                <div className="mt3-0 mb-3 fs-6 text-alternate">
                                    {blog.blog_plaintxt}
                                </div>
                            </div>

                            <div>
                                

                                {/* <Link to="/edit-blog">
                                    <SaveAsOutlinedIcon className="text-primary pointer cursor-pointer mx-2" />
                                </Link> */}
                                {/* <DeleteOutlineOutlinedIcon className="text-primary cursor-pointer ml-5" onClick={handleShow} style={{ marginLeft: '10px', fontSize: '1.7rem' }} /> */}
                            </div>

                        </Card.Body>
                    </div>
                </Card>
            </Col>

            <div>
                <Modal show={show} onHide={handleClose}>
                    {/* <Modal.Header closeButton> */}
                    <Modal.Title className="px-3 pt-2">
                        <DeleteIcon className="text-primary mx-2" />
                        <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>
                            Delete
                        </span>

                    </Modal.Title>
                    <div>
                        <hr />
                        <p className="px-5 fs-6">
                            Are You Sure to delete this item !
                        </p>
                        <hr />
                    </div>
                    <div className="d-flex align-items-center justify-content-end m-2" >
                        <Button className="mx-2" variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Delete
                        </Button>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default Blog_Details;
