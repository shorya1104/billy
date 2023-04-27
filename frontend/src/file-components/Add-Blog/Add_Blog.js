import React, { useState,useRef  } from 'react';
import { Row, Col, Card, ProgressBar, Button, Form, Badge } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import { convertToHTML } from 'draft-convert'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ImageUploader from 'react-images-upload';
import style from "../../file-components/Style/style.css"
import { addMonths } from 'date-fns';
import { AddBlogService } from "../../@mock-api/data/datatable"




const Add_Blog = () => {
    const [picture, setPicture] = React.useState({preview:"",raw:""});
    const [startDate, setStartDate] = useState(null);
    const editorRef = useRef(null);
    const myPicture=useRef();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const title = 'Add Blog';
    const description = 'Dashboard';
    const breadcrumbs = [{ to: '', text: 'Dashboard' }];

            const[data,setData]=useState({
                title_name:"",
                author_name:"",
                blog_description: "",
                image:"",
                user_id:"2d9ac544-efc0-4d4e-8b62-6654da1ff052"
            })

            const changeHandler = (e) => {
                setData({ ...data, [e.target.name]: e.target.value })
              }

            const AddBlog=()=>{

               

                //convertToRaw(contentStac:\ProgramData\Dell\Postman\app-10.12.0\resources\app.asar\html\scratchpad.htmlte).blocks[0].text;
                if(data.title_name==""){
                    alert("Please enter the title name");
                }else if(data.author_name==""){
                    alert("Please enter the author name");
                }
                // else if(convertToRaw(contentState).blocks[0].text==""){
                //     alert("Please enter the discription");
                // }
                else if(data.blog_description==""){
                    alert("please enter the description");
                }
                else if(picture.preview==null){
                    alert("Please choose image");
                }
                
                else {
                   
                   // console.log(picture.raw);
                   // return;
                    // data.blog_description= description;//convertToRaw(contentState).blocks[0].text;
                    data.image= picture.raw;
                    data.token=localStorage.getItem("token");

                    const addFormData = new FormData();
                    addFormData.append("title_name", data.title_name)
                    addFormData.append("author_name", data.author_name)
                    addFormData.append("blog", picture.raw)
                    addFormData.append("blog_description", data.blog_description)
                   // addFormData.append("token", localStorage.getItem("token"))
                    
                   // return;
                    // localStorage.getItem("token")
                    AddBlogService(addFormData, result => {
                       if(result.status==="success"){
                        setData({
                            title_name:"",
                            author_name:"",
                            blog_description: "",
                            image :"",
                            user_id:"2d9ac544-efc0-4d4e-8b62-6654da1ff052"
                            
                        });
                        setPicture({preview:"",raw:""});
                        
                       }
                       console.log(result)
                     });

                }
            }




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

            {/* Form Code End */}
            <Row>
                <Col>
                    <Card className='p-5 mb-3'>
                        <Row>
                            {/* image uplode */}
                            <Col xs={12} md={6} className="img-handler d-flex justify-content-center align-items-center xs={12} md={6}" >
                                {/* <div className='img-handler'> */}
                                {/* <div className='img-handler' style={{ border: '1px solid red', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
                                {picture.preview ? (<img src={picture.preview} alt="" width='274px' />):null}

                                <input type="file" id="myfile" name="myfile"
                                 onChange={(e) => {
                                    if (e.target.files.length) {
                                        console.log(e.target.files);
                                        setPicture({
                                          preview: URL.createObjectURL(e.target.files[0]),
                                          raw: e.target.files[0],
                                        });
                                      } else console.log("upload img");
                                //     console.log("picture: ", e[0].name);
                                //     setPicture(null)
                                //    if (e[0]) {
                                       
                                //        setPicture(e[0]);
                                //        const reader = new FileReader();
                                //        reader.addEventListener("load", () => {
                                //         alert();
                                //         setPicture(reader.result);
                                //         });
                                //        reader.readAsDataURL(e[0]);
                                //       }

                                    //console.log(URL.createObjectURL(e[0]))
                                    //myPicture.current.src=URL.createObjectURL(e[0])
                                   // setPicture(URL.createObjectURL(e[0]))
                                
                                }
                            }
                                
                                />
                                {/* <ImageUploader
                                    buttonText="Choose images"
                                    onChange={(e) => {
                                       
                                        console.log("picture: ", e[0].name);
                                        setPicture(null)
                                       if (e[0]) {
                                           
                                           setPicture(e[0]);
                                           const reader = new FileReader();
                                           reader.addEventListener("load", () => {
                                            alert();
                                            setPicture(reader.result);
                                            });
                                           reader.readAsDataURL(e[0]);
                                          }

                                        //console.log(URL.createObjectURL(e[0]))
                                        //myPicture.current.src=URL.createObjectURL(e[0])
                                       // setPicture(URL.createObjectURL(e[0]))
                                    
                                    }
                                }
                                    label={[".jpg", ".gif", ".png", ".gif"]}
                                    maxFileSize={5242880}
                                /> */}
                                {/* </div> */}
                            </Col>

                            {/* Form code start */}
                            <Col>
                                {/* <form onSubmit={handleSubmit}> */}
                                <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                    <Form.Label>Title Name</Form.Label>
                                    <Form.Control type="text" name="title_name" onChange={changeHandler} value={data.title_name} />
                                   
                                </Form.Group>

                                <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                    <Form.Label>Author Name</Form.Label>
                                    <Form.Control type="text" name="author_name" onChange={changeHandler} value={data.author_name} />
                                  
                                </Form.Group>
                                <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                    {/* <Form.Label>Description</Form.Label>
                                    <label>
                            
                                             <textarea name="postContent" rows={4} cols={40} />
                                     </label> */}
                                     {/* <label htmlFor="exampleFormControlTextarea1">Description</label> */}
                                     <Form.Label>Description</Form.Label>
                                        <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            type="text"
                                            name="blog_description"
                                            onChange={changeHandler}
                                            value={data.blog_description}
                                            rows="6"
                                        />
                                  
                                </Form.Group>
                                <Col className='pb-2'>
                                    <Button className='m-2 px-5 fs-6 mx-5 float-end' type="submit" onClick={AddBlog}>Submit</Button>
                                </Col>

                                

                                {/* <Form.Group className="form-group position-relative tooltip-end-top col-sm-8 mb-3">
                                    <Form.Label>Select Date</Form.Label>
                                    <DatePicker className="form-control" name="startDate" placeholderText="Please select a date" 
                                    minDate={new Date()}
                                        maxDate={addMonths(new Date(), 5)}
                                        showDisabledMonthNavigation
                                         selected={startDate} 
                                         onChange={(date) => 
                                         
                                         setStartDate(date)
                                         
                                         } />
                                  
                                </Form.Group> */}
                                {/* </form> */}
                                <Row>
                                    <Col className="d-flex align-items-center justify-content-end">
                                        {/* <Button className='m-2 px-5 fs-6' type="submit">Add</Button> */}
                                    </Col>
                                </Row>
                            </Col>
                        </Row >
                    </Card>

                    {/* Editor Code End */}
                    {/* <Card className=''>
                        <Row className="w-100 p-5">
                            <Col className="col-sm-12 col-lg-12 col-12">
                                <Card className="p-0">
                                    <Editor
                                    
                                       editorState={editorState}
                                       onEditorStateChange={setEditorState}
                                       ref={editorRef}
                                    />
                                </Card>
                            </Col>
                        </Row >
                        <Col className='pb-2'>
                            <Button className='m-2 px-5 fs-6 mx-5 float-end' type="submit" onClick={AddBlog}>Submit</Button>
                        </Col>
                    </Card > */}
                    
                </Col>
            </Row>
            {/* Editor Code End */}
        </>
    );
};
export default Add_Blog;