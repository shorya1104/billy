import React, { useState,useRef ,useEffect } from 'react';
import { Row, Col, Card, ProgressBar, Button, Form, Badge ,Accordion} from 'react-bootstrap';
import { AiFillFileImage } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import ImageUploader from 'react-images-upload';
import style from "../../file-components/Style/style.css"
import { addMonths } from 'date-fns';
import { GetBlogService , UpdateBlogService,WithoutUpdateBlogService,AddCategoryService , GetAllCategory } from '@mock-api/data/datatable';

async function uploadImageCallBack(file) {
    console.log(file)
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







const Edit_Blog = () => {
    const blogUpdate = () => toast('Blog Updated Sucessfully');
    const [picture, setPicture] = React.useState();
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")


    
    // const editorRef = useRef(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const title = 'Edit Blog';
    const description = 'Dashboard';
    const breadcrumbs = [{ to: '', text: 'Dashboard' }];

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

    const changeCategory=(e)=>{
        console.log(e.target.value)
        setCategoryName(e.target.value)
       
      }

  


    

    const [selectedOption, setSelectedOption] = useState('');
    const [data, setData] = useState(null)

    let id = window.location.search.split("=").at(-1)
    useEffect(() => {
        GetBlogService({blog_id:id},(response)=>{
            console.log(response.data1)
            setData({
                blog_id:response.data1.blog_id,
                title_name:response.data1.title_name,
                author_name:response.data1.author_name,
                blog_description:response.data1.blog_description,
                image:response.data1.blog_url,
                meta_title:response.data1.meta_title,
                meta_description:response.data1.meta_description,
                meta_keyword:response.data1.meta_keyword,
                blog_block:response.data1.blog_block,
                blog_plaintxt:response.data1.blog_plaintxt,
                category_name:response.data1.category_name,
                user_id:"2d9ac544-efc0-4d4e-8b62-6654da1ff052"
            })
           setCategoryName(response.data1.category_name);
            //setData(response.data.data)
           setFileName(response.data1.blog_url);
           const contentState = convertFromRaw(JSON.parse(response.data1.blog_block));
           const editorState = EditorState.createWithContent(contentState);
           setEditorState(editorState);
           
           

         
        })

    }, [])


    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
      }

    const handleEditorStateChange = (state) => {
        console.log(state)
        setEditorState(state);
      };

    const updateData= () => {
        console.log(category_name)

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
      
      
        else if(data.meta_title=="" ||data.meta_title==undefined){
        
          
                alert("Please enter Meta Title")
          
        }
        else if(data.meta_description=="" ||data.meta_description==undefined){
        
           
                alert("Please enter Meta description")
           
        }
        else if(data.meta_keyword=="" ||data.meta_keyword==undefined){
         
          
                alert("Please enter Meta keywords")
            
        }
        else if(category_name=="" ||category_name==undefined){
         
          
            alert("Please Select Category Name")
        
    }
        else if(htmlData.length==8){
        
           
                alert("Please enter description")
           
        }
        else{
            
            if(picture=="" ||picture==null){
                data.blog_description=htmlData;
                data.blog_block=JSON.stringify(rawContentState);
                data.blog_plaintxt=text;
                data.category_name=category_name;
                console.log(data)
               // return;
                WithoutUpdateBlogService(data,res=>{
                    console.log(res)
                    if(res.status==="success"){
                        blogUpdate();
                        console.log("hi")
                    }else{
                        console.log("bye");
                    }
                });
            }else{
                data.blog_description=htmlData;
                const addFormData = new FormData();
                addFormData.append("blog_id", data.blog_id);
                addFormData.append("title_name", data.title_name);
                addFormData.append("blog_description", data.blog_description)
                addFormData.append("blog", picture)
               
                addFormData.append("meta_title", data.meta_title)
                addFormData.append("meta_description", data.meta_description)
                addFormData.append("meta_keyword", data.meta_keyword)
                addFormData.append("blog_block", JSON.stringify(rawContentState))
                addFormData.append("blog_plaintxt", text)
                addFormData.append("category_name", data.category_name)
                addFormData.append("status", true);
    
                UpdateBlogService(addFormData,res=>{
                    console.log(res)
                    if(res.status==="success"){
                        blogUpdate();
                        console.log("hi")
                    }else{
                        console.log("bye");
                    }
                });

            }
           

        }
    }

    function validateImage(file) {
        var image = new Image();
      
        image.src = URL.createObjectURL(file);
        var imageLoaded = false;
          image.onload = function() {
          
            // if (image.width != 900 && image.height != 600) {
            //   imageLoaded = true;
            // }
            // call a function to handle the result
            handleImageValidationResult(file,imageLoaded);
          };
    
      }
      function handleImageValidationResult(files,isValid) {
      
        if(isValid){
          alert("Please upload width 900px and height 600px")
        }else{
          if(files.size<511741){
           
            files && setFileName(files.name);
            setPicture(files);
          }else{
            setFileName("No Selected File ");
            setPicture(null);
            alert("Please upload maximum 500kb image size")
          }
        }
         
      }
    return (
        <>
            <Row className="m-0">
                <Col>
                    <Card className='p-3'>
                        <Row className='w-100 add-container'>
                            <div className='add-left-container'>
                                <Row>
                                    <Col>
                                        <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                            <Form.Label className='px-1 fw-bolder'>Title</Form.Label>
                                            <Form.Control type="text" name="title_name" onChange={changeHandler} value={data && data.title_name} /> 
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
                                               editorState={editorState}
                                               onEditorStateChange={handleEditorStateChange}
                                            editorStyle={{
                                                border: '1px solid', height: '20vh',
                                                borderColor: 'whitesmoke',
                                                padding: '0px 10px'
                                            }}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class"
                                            toolbarClassName="toolbar-class"
                                            // customStyleMap={customStyleMap}
                                            toolbar={{
                                                fontFamily: {
                                                    options: ['Arial', 'Georgia', 'Impact','ProductLight', 'Tahoma', 'Times New Roman', 'Verdana'],
                                                    className: undefined,
                                                    component: undefined,
                                                    dropdownClassName: undefined,
                                                   // title: selectedFontFamily,
                                                    type: 'dropdown',
                                                    // onChange: (fontFamily) => {
                                                    //   setSelectedFontFamily(fontFamily);
                                                    // },
                                                    // value: selectedFontFamily,
                                                  },
                                                  fontSize: {
                                                    options: [12, 14, 16, 18, 20],
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
                                            <Form.Control type="text" name="meta_title" onChange={changeHandler} value={data && data.meta_title} />
                                           
                                        </Form.Group>
                                    </Col>
                                </Row >

                                <Row>
                                    <Col>
                                        <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                            <Form.Label className='px-1 fw-bolder'>Meta Description</Form.Label>
                                            <Form.Control type="text" name="meta_description" onChange={changeHandler} value={data && data.meta_description} />
                                          
                                        </Form.Group>
                                    </Col>
                                </Row >

                                <Row>
                                    <Col>
                                        <Form.Group className="form-group position-relative tooltip-end-top mb-3">
                                            <Form.Label className='px-1 fw-bolder'>Meta Keyword</Form.Label>
                                            <Form.Control type="text" name="meta_keyword" onChange={changeHandler} value={data && data.meta_keyword} />
                                          
                                        </Form.Group>
                                    </Col>
                                </Row >
                            </div>


                            <div className='add-right-container pt-2'>
                                <Row>
                                    <form className='form-handler border-0 px-5'
                                        onClick={() => document.querySelector(".input-field").click()}>
                                        <input type="file" accept='image/*' className='input-field' hidden
                                            onChange={({ target: { files } }) => {
                                             
                                              validateImage(files[0])
                                            }}  />

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
                                                        <input type="radio" name='option' checked={data && item.category_id==category_name} value={item.category_id}  onChange={changeCategory} /> {item.category_name}
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
                            <Button className='m-2 px-5 fs-6 mx-5 float-end border-0' type="button" onClick={updateData} style={{ backgroundColor: "#38BDF8" }}>Publish</Button>
                        </Col>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default Edit_Blog;