import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { Link } from 'react-router-dom';
import style from "../../file-components/Style/style.css"

import { addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import { DatePicker } from 'antd';
import moment from 'moment';
import { AddOfferService } from '@mock-api/data/datatable';
const { RangePicker } = DatePicker;


const CreateOffer = () => {
    const [selectFile, setSelectFile] = useState("No selected file")

    const offerCreate = () => toast('Offer Created Sucessfully');

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [offerName, setOffer] = useState('');
    const [offerCode, setOfferCode] = useState('');
    const title = 'Create Offer';
    const description = 'Elearning Portal Course Detail Page';

    const breadcrumbs = [
        { to: '', text: 'Dashboard' },
    ];


    const submitHandler = () => {
        if (offerName == "") {
            alert("Please Enter The Offer Name");
        } else if (offerCode == "") {
            alert("Please Enter The Offer Code");
        }
        else if (startDate == null) {
            alert("Please Select The Start Date");
        }
        else if (endDate == null) {
            alert("Please Select The End Date");
        }
        else if (selectFile == "") {
            alert("Please Select Image");
        }
        else {
            let formData = new FormData
            formData.append("offer_name", offerName)
            formData.append("offer_code", offerCode)
            formData.append("start_date", startDate)
            formData.append("end_date", endDate)
            formData.append("offer", selectFile)

            AddOfferService(formData, result => {
                console.log(result.data.start_date)
                if (result.status === "success") {
                    setStartDate(null);
                    setOffer('');
                    setOfferCode('');
                    offerCreate();
                    setEndDate(null);
                    setSelectFile();
                    //    setPicture("No selected file");

                }
                // console.log(result)
            });
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
                                <label for="inputtickets" className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Offer Name</label>
                                <div className="col-sm-6 col-md-4 col-lg-5 ">
                                    <input type="text" name="offerName" value={offerName} className="form-control" id="inputtickets" onChange={(e) => { setOffer(e.target.value) }} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="inputtickets" className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Offer Code</label>
                                <div className="col-sm-6 col-md-4 col-lg-5 ">
                                    <input maxLength={5} type="text" name="offerCode" value={offerCode} className="form-control" id="inputtickets" onChange={(e) => { setOfferCode(e.target.value.toUpperCase()) }} />
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
                                <label htmlFor="inputtickets" className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Validity Date</label>
                                <div className="col-sm-6 col-md-4 col-lg-3 ">
                                    <DatePicker className="form-control" placeholderText='Start Date'
                                        minDate={new Date()}
                                        maxDate={addMonths(new Date(), 5)}
                                        showDisabledMonthNavigation selected={startDate} value={startDate} onChange={(date) => setStartDate(date)}
                                        disabledDate={(current) => {
                                            return (
                                                moment().add(-1, "day") >= current
                                            );
                                        }}                                  
                                        
                                        />

                                        
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3 ">

                                    <DatePicker className="form-control" placeholderText='End Date'
                                        minDate={new Date()}
                                        maxDate={addMonths(new Date(), 5)}
                                        showDisabledMonthNavigation selected={endDate} value={endDate} onChange={(date) =>
                                            setEndDate(date)}
                                            disabledDate={(current) => {
                                                return (
                                                    moment().add(-1, "day") >= current
                                                );
                                            }} />

                                </div>
                            </div>

                            <div className="row mb-4">
                                <label htmlFor="inputtickets" className="col-sm-3 col-form-label fw-bolder fs-6 text-primary mx-1">Offer Image</label>
                                <div className="col-sm-6 col-md-4 col-lg-5 ">
                                    <input type="file" name="ticket_image" onChange={(e) => setSelectFile(e.target.files[0])} />
                                    <p style={{ color: "red" }}>
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
                            <Link to="/ticketoffer/offerlist">
                            <button type="button" className="btn btn-primary" onClick={() => {
                                submitHandler();
                            }}>Create Offer </button>
                            </Link>
                        </div>
                    </form>
                </Col>
            </Row>
        </>
    );
};
export default CreateOffer;