import React, {  useState,useRef ,useEffect } from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { Link } from 'react-router-dom';
import style from "../../file-components/Style/style.css"
// import style from "../../../file-components/Style/style.css"
import { addMonths } from 'date-fns';
import 'antd/dist/reset.css';
import { DatePicker } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import locale from 'antd/locale/zh_CN';
// import { AddOfferService } from '@mock-api/data/datatable';
const { RangePicker } = DatePicker;
import {UpdateOfferService ,GetOfferService,withoutUpdateOfferService } from '@mock-api/data/datatable';



const EditOffer = () => {
    const offerUpdate = () => toast('Offer Updated Sucessfully');
    const [selectFile, setSelectFile] = useState("No selected file")
    const [picture, setPicture] = React.useState({preview:"",raw:""});
    const [startDate, setStartDate] = useState();
    const [endDate, setEndtDate] = useState();

     //const [startDate, setStartDate] = useState(null);
     //const [endDate, setEndDate] = useState(null);
    // const[offerName,setOffer]=useState('');
    const title = 'Edit Offer';
    const description = 'Elearning Portal Course Detail Page';

    const breadcrumbs = [
        { to: '', text: 'Dashboard' },
    ];

    // const [offerList,setOfferList]=useState([])
    // useEffect(()=>{
    //     GetAllOffer((response)=>{
    //         console.log(response);
    //         setOfferList(response);
    //        // console.log(response);
    //     })
    // },[])
    // const handleDateChange = (date, dateString) => {
    //     console.log(date, dateString);
    //     setStartDate(date);
    //     setEndtDate(date);
    //   };

    const[data,setData]=useState({
        offer_name:"",
        offer_code:"",
        start_date: "",
        end_date:"",
        offer_url:"",
        // user_id:"2d9ac544-efc0-4d4e-8b62-6654da1ff052"
    })

    let id = window.location.search.split("=").at(-1)
    useEffect(() => {
        GetOfferService({offer_id:id},(data)=>{
            console.log(data.data)
            setData(data.data)
            console.log()
            setStartDate(data.data.start_date);
            setEndtDate(data.data.end_date);
            // setPicture({preview:`http://localhost:8000/offer/${data.data.offer_url}`})
            // setPicture({preview:`http://billy247.com:3002/offer/${data.data.offer_url}`})
        })

    }, [])

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
      }
      
    const submitHandler = () =>{

        data.start_date=startDate;
        data.end_date=endDate;
       // console.log(data)
       // return;
        if(picture.raw!=''){
            const updateFormData = new FormData();
            updateFormData.append("offer_id", id)
            updateFormData.append("offer_name", data.offer_name)
            updateFormData.append("offer_code", data.offer_code)
            updateFormData.append("start_date",  data.start_date)
            updateFormData.append("end_date",   data.end_date)
            updateFormData.append("offer",picture.raw);
           // updateFormData.append("offer_url",data.offer_url)
            // console.log(picture.raw)
            UpdateOfferService(updateFormData,res=>{
                console.log(res)
                if(res.status==="success"){
                    console.log("hi")
                    offerUpdate();
                }else{
                    console.log("bye");
                }
            })
        }else{
           
             console.log(data)
           //  return;
             withoutUpdateOfferService(data,res=>{
                console.log(res)
                if(res.status==="success"){
                    offerUpdate();
                    console.log("hi")
                }else{
                    console.log("bye");
                }
            })
        }
       
    }  


    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title and Top Buttons Start */}
            <div className="page-title-container">
                <Row className="g-0">
                    {/* Title Start */}
                    <Col className="col-auto mb-sm-0 me-auto">
                        <h1 className="mb-0 pb-0 display-4">{title}</h1>
                        <BreadcrumbList items={breadcrumbs} />
                    </Col>
                    {/* Title End */}

                </Row>
            </div>
            {/* Title and Top Buttons End */}

            {/* Form Code start from here */}
            <Row>
                <Col className='d-flex justify-content-center flex-column align-items-center rounded p-4 border-primary border'>
                    <form className='col-sm-12' autocomplete="off">

                        <Row style={{ width: '70%' }}>
                            <div className="row mb-3">
                                <label  className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Offer Name</label>
                                <div className="col-sm-6 col-md-4 col-lg-5 ">
                                    <input type="text" name="offer_name"  className="form-control" onChange={changeHandler} value={data.offer_name} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label  className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Offer Code</label>
                                <div className="col-sm-6 col-md-4 col-lg-5 ">
                                    <input maxLength={5} type="text" name="offer_code"  className="form-control" onChange={changeHandler} value={data.offer_code.toUpperCase()} />
                                </div>
                            </div>


                            <div className="row mb-3">
                                {/* <label for="inputtickets" className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Validity Date</label>
                                <div className="col-sm-6 col-md-4 col-lg-5">
                                    < RangePicker
                                        onChange={(values) => {
                                            setDates(values.map(item => {
                                                return moment(item).format('YYYY-DD-MM')
                                            }))
                                        }}
                                    />
                                </div> */}
                                <label className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Validity Date</label>
                                <div className="col-sm-6 col-md-4 col-lg-3 ">
                                    {/* <DatePicker className="form-control" placeholderText='Start Date'
                                        minDate={new Date()}
                                        maxDate={addMonths(new Date(), 5)}
                                        showDisabledMonthNavigation 
                                        // startDate ? moment(startDate) : moment(prevStartDate)
                                        value={startDate ? moment(startDate) : ''}
                                        onChange={handleDateChange} /> */}

                                    {startDate ? <DatePicker className="form-control" placeholderText='Start Date'
                                        minDate={new Date()}
                                        maxDate={addMonths(new Date(), 5)}
                                       // locale= "en_US"
                                        showDisabledMonthNavigation  
                                        defaultValue={dayjs(moment(startDate))} 
                                        // value={new Date(startDate)} 
                                     
                                         onChange={(date) => {
                                            console.log(date)

                                            setStartDate(date.toLocaleString('en-US', { timeZone: 'GMT', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }))
                                        }} 
                                       
                                    /> : null}


                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3 ">

                                {endDate ?<DatePicker className="form-control" placeholderText='End Date'
                                        minDate={new Date()}
                                        maxDate={addMonths(new Date(), 5)}
                                      
                                        defaultValue={dayjs(moment(endDate))} 
                                      
                                        onChange={(date) => {
                                            console.log(date)

                                            setEndtDate(date.toLocaleString('en-US', { timeZone: 'GMT', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }))
                                        }} 
                                        />:null }

                                </div>
                            </div>

                            <div className="row mb-3">
                                <label  className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Offer Image</label>
                                <div className="col-sm-6 col-md-4 col-lg-5 ">
                                {data.offer_url ? (<img src={picture.preview} alt="" width='274px' />):null}

                                        <input type="file" id="myfile" name="myfile"
                                        onChange={(e) => {
                                            if (e.target.files.length) {
                                                console.log(e.target.files);
                                                setPicture({
                                                // preview: URL.createObjectURL(e.target.files[0]),
                                                raw: e.target.files[0],
                                                });
                                            } else console.log("upload img");


                                        }
                                        }/>
                                    <p  style={{color: "red"}}>
                                        *please upload the image in a size of 746*520 pixels.
                                    </p>
                                </div>
                            </div>

                            {/* <div className="row mb-3">
                                <label for="inputtickets" className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Offer Image</label>
                                <div className="col-sm-6 col-md-4 col-lg-5">
                                    <form className='form-handler border-primary' action=""
                                        onClick={() => document.querySelector(".input-field").click()}>
                                        <input type="file" accept='image/*' className='input-field' hidden
                                            onChange={({ target: { files } }) => {
                                                files[0] && setFileName(files[0].name)
                                                if (files) {
                                                    setImage(URL.createObjectURL(files[0]))
                                                }
                                            }}
                                        />

                                        {image ?
                                            <img src={image} width={300} height={200} alt="fileName" style={{ objectFit: 'contain' }} />
                                            :
                                            <>
                                                <MdCloudUpload className='text-primary' size={60} />
                                                <p>Browse Files to Upload</p>
                                            </>
                                        }
                                    </form>
                                </div>
                            </div> */}
                        </Row>

                        <div className='float-end'>
                            {/* <Link to="/ticketdetails"> */}
                            <button type="button" className="btn btn-primary" onClick={() => {
                                submitHandler();
                            }}>Edit Offer </button>
                            {/* </Link> */}
                        </div>
                    </form>
                </Col>
            </Row>
        </>
    );
};
export default EditOffer;