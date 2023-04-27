import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import Clamp from 'components/clamp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { GetAllBlogService , DeleteBlogService} from "@mock-api/data/datatable";
import { useEffect } from "react";
import moment from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommentsDisabledOutlined } from "@mui/icons-material";







const ReadMore = ({ blogid, children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 50) : text}
            <Link to={"/blog-details?blog_id=" + blogid} className="read-or-hide">
                {isReadMore ? "...read more" : " "}
            </Link>
        </p>
    );
};
const TitleMore = ({ blogid, children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 20) : text}
            {/* <Link to={"/blog-details?blog_id=" + blogid} className="read-or-hide">
                {isReadMore ? "...read more" : " "}
            </Link> */}
        </p>
    );
};


const Blog = () => {

    // Delete modal 
    // const [ data , setData] = useState(dataJson);
    const BlogDelete = () => toast('Blog Deleted Successfully');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [deleteData, setDeleteData] = useState("");
    const handleShow = () => setShow(true);
    const handleclickdelete =(blog_id) =>{
        setShow(true)
        setDeleteData(blog_id)
    }

    const handleDeleteBlog =() =>{
        DeleteBlogService({ blog_id:deleteData}, (res) => {
            console.log(res);
            setShow(false);
            // window.location.reload();
            BlogDelete();
            GetAllBlogService((data) => {
                console.log(data)
                //return;
                setBlogList(data)
            })
            
          });
    }

    
    
  
   
    const title = 'Blog';
    const description = 'Elearning Portal School Dashboard Page';
    const breadcrumbs = [{ to: '', text: 'Dashboard' }];

    const [blogList, setBlogList] = useState([])

    useEffect(() => {
        GetAllBlogService((data) => {
            console.log(data)
            //return;
            setBlogList(data)
        })

    }, [])
  


    console.log()
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

            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 g-3">
                {blogList.length !== 0 && blogList.map((value, index) =>


                    <Col key={index++}>
                        <Card>
                            <Link to="#" className="p-2">
                            {/* <img src={`http://billy247.com:3002/blog/${value.blog_url}`} className="card-img scale" alt="card image" height="300px" style={{ objectFit: 'contain' }}/> */}

                                <img src={`http://localhost:8000/blog/${value.blog_url}`} className="card-img scale" alt="card image" height="250px" style={{ objectFit: 'fill' }}/>
                            </Link>
                            <Card className="p-3">
                                <div className="mb-2" style={{height : '40px'}}>
                                    <Link to="#" className="heading">
                                        <p className="fs-6" ><TitleMore>{value.title_name}</TitleMore></p>
                                    </Link>
                                  
                                </div>

                                <Clamp>

                                    <ReadMore blogid={value.blog_id} children={value.blog_plaintxt}>

                                    </ReadMore>

                                </Clamp>
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  
                                    <div>
                                        <Link to={`/edit-blog?blog_id=${value.blog_id}`}>
                                            <SaveAsOutlinedIcon className="text-primary pointer cursor-pointer mx-2" />
                                        </Link>
                                        <DeleteOutlineOutlinedIcon  className="text-primary pointer cursor-pointer" onClick={() => handleclickdelete(value.blog_id)} />
                                    </div>
                                </div>
                            </Card>
                        </Card>
                    </Col>
                )}
            </Row>

            <div>
                <Modal show={show} onHide={handleClose}>
                    {/* <Modal.Header closeButton> */}
                    <Modal.Title className="px-3 pt-2">
                        <DeleteIcon className="text-primary mx-2" />
                        <span style={{ fontFamily: 'monospace' }}>
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
                        <Button variant="primary" onClick={handleDeleteBlog}>
                            Delete
                        </Button>
                    </div>
                </Modal>
            </div>
        </>
    );
};
export default Blog;