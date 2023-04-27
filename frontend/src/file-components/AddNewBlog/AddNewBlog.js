import React, { useState ,  useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Card, ProgressBar, Button, Form, Badge, Accordion } from 'react-bootstrap';
// import { Link, NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
import style from "../../file-components/Style/style.css"
// import { Editor } from "react-draft-wysiwyg";
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import Dropdown from 'react-bootstrap/Dropdown';
import AddIcon from '@mui/icons-material/Add';
import { padding } from '@mui/system';
import { AddBlogService , AddCategoryService , GetAllCategory } from "../../@mock-api/data/datatable"

async function uploadImageCallBack(file) {
    console.log(file)
    // return new Promise(
    //   (resolve, reject) => {
    // resolve({ data: { link: URL.createObjectURL(file) } });
    //   })
    //return;
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8000/api/v1/blog/blogimageupload');
            //  xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
            const data = new FormData();
            data.append('blog', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {

                const response = JSON.parse(xhr.responseText);
                console.log(xhr.responseText)
                resolve({ data: { link: response.url } });
                // URL.createObjectURL(event.target.files[0])
                //resolve(xhr.responseText);
            });
            xhr.addEventListener('error', () => {
                console.log(xhr.responseText)
                //const error = JSON.parse(xhr.responseText);

                reject(xhr.responseText);
            });
        }
    );
}


const AddNewBlog = () => {
    const history = useHistory();
    const BlogAdd = () => toast('Blog Added Successfully');
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No selected file");
    const [titleName, setTitleName] = useState('');
    const [metaTitle, setMetaTitle] = useState('')

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [picture, setPicture] = React.useState(null);
    const [metakeyword, setMetaKeyword] = useState('');

    const title = 'Add Blog';
    const description = 'Dashboard';

    const breadcrumbs = [{ to: '', text: 'Dashboard' }];

    // const validationSchema = Yup.object().shape({
    //     titleName: Yup.string().required('Title name is required'),
    //     authorName: Yup.string().required('Author name is required'),
    //     selectDate: Yup.string().required('date is required'),
    // });
    // const initialValues = { titleName: '', authorName: '', selectDate: '' };
    // const onSubmit = (values) => console.log('submit form', values);


    // const formik = useFormik({ initialValues, validationSchema, onSubmit });
    // const { handleSubmit, handleChange, values, touched, errors } = formik;
    const[categorylist,setCategoryList]=useState([])
    
    const [category_name , setCategoryName] = useState('');
    const addCategory = ()=>{
        if(category_name == '' ){
            alert("Please Enter The Category Name");
        }else{
            AddCategoryService({category_name:category_name},(result) =>{
                    if(result.status === "success"){
                       console.log(result.data)
                       
                       setCategoryList(oldArray => [result.data,...oldArray] );
                       setCategoryName('')
                    }else{
                        console.log("error")
                    }
            });
        }


    };
    
   
    useEffect(()=>{
        GetAllCategory((response)=>{
            console.log(response);
            setCategoryList(response);
           // console.log(response);
        })
    },[])



    const [selectedOption, setSelectedOption] = useState('');
    const [data, setData] = useState(
        {}
    )
    const changeCategory=(e)=>{
        console.log(e.target.value)
        setCategoryName(e.target.value)
       
      }

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleEditorStateChange = (state) => {
        console.log(state)
        setEditorState(state);
      };

    const PublishBlog= () => {

        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const text = rawContentState.blocks
          .map((block) => block.text)
          .join('\n');

          let htmlData=draftToHtml(convertToRaw(editorState.getCurrentContent()));
          //data.planintext=text;
         // data.blog_block=rawContentState;
        
          if(data.title_name=="" ||data.title_name==undefined){

             alert("Please enter title")
           
        }
      
       else if(picture=="" ||picture==null){
          
          
                alert("Please select image")
            
        }
        else if(data.meta_title=="" ||data.meta_title==undefined){
        
          
                alert("Please enter Meta Title")
          
        }
        else if(data.meta_description=="" ||data.meta_description==undefined){
        
           
                alert("Please enter Meta description")
           
        }
        else if(data. meta_keyword=="" ||data. meta_keyword==undefined){
         
          
                alert("Please enter Meta keywords")
            
        }
        else if(category_name=="" || category_name==undefined){
                
                alert("Please Select the Category Name")
        }
        else if(htmlData.length==8){
        
           
                alert("Please enter description")
           
        }
        else{
            data.blog_description=htmlData;
            console.log(category_name)
            const addFormData = new FormData();
            addFormData.append("title_name", data.title_name);
            addFormData.append("blog_description", data.blog_description)
            addFormData.append("blog", picture)
           
            addFormData.append("meta_title", data.meta_title)
            addFormData.append("meta_description", data.meta_description)
            addFormData.append("meta_keyword", data.meta_keyword)
            addFormData.append("category_name", category_name)
            addFormData.append("blog_block", JSON.stringify(rawContentState))
            addFormData.append("blog_plaintxt", text)
            addFormData.append("status", true);

            AddBlogService(addFormData, result => {
               if(result.status=="success"){
                history.push("/blog");
               }
                //console.log(result)
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
                    <Card className='p-2 pt-2 mb-3 w-100'>

                        <Row className='w-100 add-container row'>
                            <div className='add-left-container'>
                                <Row>
                                    <Col>
                                        <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                            <Form.Label className='px-1 fw-bolder'>Title</Form.Label>
                                            <Form.Control type="text" name="title_name" onChange={changeHandler} value={data.title_name} />
                                        </Form.Group>
                                    </Col>
                                </Row >

                                <Row>
                                <Col style={{
                                        border: '1px solid',
                                        borderColor: 'whitesmoke',
                                        margin: '1rem 0px',
                                        padding: '1rem',
                                    }} >
                                        <Editor
                                            defaultEditorState={editorState}
                                            onEditorStateChange={handleEditorStateChange}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class"
                                            toolbarClassName="toolbar-class"
                                            // customStyleMap={customStyleMap}
                                            toolbar={{
                                              fontFamily: {
                                                options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana','ProductLight'],
                                                className: undefined,
                                                component: undefined,
                                                dropdownClassName: undefined,
                                              },
                                                video: {
                                                    defaultSize: {
                                                    height: 'auto',
                                                    width: 'auto',
                                                    },
                                                    video:{
                                                    uploadEnabled: true,
                                                //  uploadCallback: handleVideoUpload,
                                                    previewImage: true,
                                                    alignmentEnabled: true,
                                                    }
                                                },
                                                image: {
                                                    uploadCallback: uploadImageCallBack,
                                                    previewImage: true,
                                                // previewSrcFn: previewImage,
                                                    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                                                    alt: { present: true, mandatory: true }
                                                },
                                            }}
                                           
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                            <Form.Label className='px-1 fw-bolder'>Meta Title</Form.Label>
                                            <Form.Control type="text" name="meta_title" onChange={changeHandler} value={data.meta_title} />
                                        </Form.Group>
                                    </Col>
                                </Row >

                                <Row>
                                    <Col>
                                        <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                            <Form.Label className='px-1 fw-bolder'>Meta Description</Form.Label>
                                            <Form.Control type="text" name="meta_description"  onChange={changeHandler} value={data.meta_description} />
                                        </Form.Group>
                                    </Col>
                                </Row >

                                <Row>
                                    <Col>
                                        <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                            <Form.Label className='px-1 fw-bolder'>Meta Keyword</Form.Label>
                                            <Form.Control type="text" name="meta_keyword" onChange={changeHandler} value={data.meta_keyword}  />
                                        </Form.Group>
                                    </Col>
                                </Row >
                            </div>


                            <div className='add-right-container pt-2'>
                                <Row>
                                    <Card>
                                    <form className='form-handler border-0 px-5'
                                        onClick={() => document.querySelector(".input-field").click()}>
                                        <input type="file" accept='image/*' name='blog_image' className='input-field' hidden
                                            onChange={({ target: { files } }) => {

                                                files[0] && setFileName(files[0].name);
                                                setPicture(files[0])
                                            }} />

                                        {image ?
                                            <img src={image} width={200} height={200} alt="fileName" style={{ objectFit: 'contain' }} />
                                            :
                                            <>
                                                <MdCloudUpload className='text-primary' size={60} />
                                                <p style={{fontSize:'10px'}}>Upload feature image (500KB 900X600px)</p>
                                            </>
                                        }

                                        <section className='uploded-row'>
                                            <span>
                                                {fileName}
                                                <MdDelete
                                                    size={20}
                                                    className='float-end mx-2 text-primary'
                                                    onClick={() => {
                                                        setFileName(" No Selected File ")
                                                        setImage(null)
                                                    }}
                                                />
                                            </span>
                                        </section>
                                    </form>
                                    </Card>
                                </Row>

                                <Row>
                                    <Col>
                                        <Card className='border mb-2'>

                                            <Row className='text-primary'>
                                                <h4 className='px-4 pt-1 fs-6'>Categories</h4>
                                            </Row>
                                            <Row>
                                                <Col className='mx-2 mb-3'>
                                                    <button className='border px-1 w-100 text-start' >
                                                        All Categories
                                                    </button>
                                                </Col>
                                            </Row>

                                            <div className="category-handler">
                                                {categorylist.length > 0 && categorylist.map((item , index)=>{
                                                   
                                                    return(
                                                        <>
                                                        <p key={index}>
                                                        <label>
                                                        <input type="radio" name='option' value={item.category_id}  onChange={changeCategory} /> {item.category_name}
                                                        </label>
                                                        </p>
                                                        </>
                                                    )
                                                })}
                                            </div>

                                            <Col className='m-2'>
                                                <Accordion>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header className='text-primary fw-bolder' style={{ margin: '-15px', fontSize: '10px', padding: '1rem 5px ' }}>  <AddIcon style={{ fontSize: '12px', margin: '0px 5px' }} />Add Categories</Accordion.Header>
                                                        <Accordion.Body style={{ padding: '5px 10px' }}>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Control as="textarea" placeholder="Add category here" name='category_name' style={{ width: '200px', height: '40px' }} onChange={changeCategory} />
                                                                    <Button variant="outline-secondary" size="sm" className='float-end px-5' onClick={addCategory} >Add</Button>
                                                                </Col>
                                                            </Row>
                                                        </Accordion.Body>
                                                    </Accordion.Item>

                                                </Accordion>
                                            </Col>
                                        </Card>
                                    </Col>
                                </Row >
                            </div>
                        </Row>
                        <Col className='pb-2'>
                            <Button className='m-2 px-5 fs-6 mx-5 float-end' type="submit" onClick={PublishBlog}>Publish</Button>
                        </Col>
                    </Card>


                </Col >
            </Row >
        </>
    );
};
export default AddNewBlog;