import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col, Card, Button, ProgressBar, FormControl } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { addMonths } from 'date-fns';
import style from "../../file-components/Style/style.css"

import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { AddticketService,GetAllOffer } from '@mock-api/data/datatable';
import { InputLabel, MenuItem, Select } from '@mui/material';

const Ticket_Register = () => {
    const [numInputs, setNumInputs] = useState('');
    const [textboxes, setTextboxes] = useState([]);
    // const [ticketImage, setTicketImage] = useState();
    //{authorName: "",email: "",mobile:"",startdate:"",ticketid: "",username: ""}
    // const handleNumInputsChange = (event) => {
    //     var value = parseInt(event.target.value);
    //     value = value > 0 ? value : 0
    //     setNumInputs(value);
    //     setTextboxes([])
    //     if (value > 0) {
    //         for (let i = 0; i < value; i++) {

    //             setTextboxes(prevState => [...prevState, { ticketid:generateUniqueNumber() }]);
    //         }
    //     }
    // };

    // function generateUniqueNumber() {
    //     console.log("sadjkhjyu")
    //     const maxNumber = 99999; // the maximum 10-digit number
    //     const minNumber = 10000; // the minimum 10-digit number
    //     const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    //     console.log(randomNumber)
    //     return  "kkkk"+randomNumber.toString();

    // }



    const title = 'Ticket Register';
    const description = 'Elearning Portal Course Detail Page';

    const breadcrumbs = [
        { to: '', text: 'Dashboard' },
    ];

    if(numInputs ==" "){

    }

    const generateInputFields = (numInputs) => {
        let inputFields = [];
        for (let i = 0; i < numInputs; i++) {

            inputFields.push(
                <div className="row mb-3 d-flex justify-content-center align-items-center" key={i}>
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label fw-bolder fs-6 text-primary">Ticket  {i + 1}</label>
                    <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-flex justify-content-center align-items-center gap-2">
                        <input type="text" name={`ticketid`} defaultValue={textboxes[i].ticketid} readOnly className="form-control text-center" />
                        <input type="text" name={`username`} onChange={(event) => handleInputChange(i, event)} className="form-control text-center" />
                        <input type="text" name={`mobile`} onChange={(event) => handleInputChange(i, event)} className="form-control text-center" />
                        <input type="text" name={`email`} onChange={(event) => handleInputChange(i, event)} className="form-control text-center" />

                    </div>
                </div>

            );
        }
        return inputFields;
    };
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputs = [...textboxes];
        newInputs[index] = { ...newInputs[index], [name]: value };
        setTextboxes(newInputs);
    };



    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    const [amtDate, setAmtDate] = useState(null);
    const [authorName, setAuthorName] = useState("");
    const [offername,setOfferName] = useState("")

    const offerHandler = (e)=>{
        if(e.target.value === ""){
            alert("Please select offers")
        }else{
            setOfferName(e.target.value)
        }
    }
    const handleInputstatic = (e) => {
        setAuthorName({ ...authorName, [e.target.name]: e.target.value })
    };
    const findData = () => {

        textboxes.map((item, index) => {
            if (textboxes[index].username == "" || textboxes[index].username == undefined) {
                console.log("please ender the usename index number " + index)

            }
            else if (textboxes[index].mobile == "" || textboxes[index].mobile == undefined) {
                console.log("please ender the mobile index number " + index);

            }
            else if (textboxes[index].email == "" || textboxes[index].email == undefined) {
                console.log("please ender the email index number " + index)

            }

            else {
                if (authorName == "" || authorName.authorname == undefined) {
                    console.log("please ender the authorName index number ")

                }
                else {
                    item.authorName = authorName.authorname;
                    item.announcement_date = amtDate.toISOString().slice(0, 10);
                    item.offername = offername
                }

            }
        })
        console.log("textboxes",textboxes)
        AddticketService(textboxes, result => {
            if (result.status === "success") {
                // setTextboxes([]);
               // setNumInputs('');
                console.log('good')
            }
            console.log(result)
        });


    }
    const [offerList,setOffer]=useState([])
    useEffect(()=>{
        GetAllOffer((response)=>{
            setOffer(response);
           // console.log(response);
        })
    },[])


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
                <Col className='d-flex justify-content-cente flex-column align-items-center rounded p-4 border-primary border'>
                    <form className='col-sm-12' autoComplete="off">
                        <div className="row mb-6">
                            <label htmlFor="inputtickets" className="col-sm-2 col-form-label fw-bolder fs-6 text-primary">Offer's</label>
                            <div className="col-sm-6 col-md-4 col-lg-4 ">

                            <select className="form-control fw-bolder fs-6 text-primary" name="offer" id="offer" onChange={offerHandler}>
                                <option value="">Select Offer</option>
                               {offerList.length>0 && offerList.map((item)=>{
                                return(
                                <>
                                 <option value={item.offer_id}>{item.offer_name}</option>
                                </>
                                )
                               })}
                               
                               
                                
                            </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputtickets" className="col-sm-2 col-form-label fw-bolder fs-6 text-primary">How Many Ticket's</label>
                            <div className="col-sm-6 col-md-4 col-lg-2 ">
                                <input type="text" className="form-control" id="inputtickets" value={numInputs} onChange={handleNumInputsChange} />
                            </div>
                        </div>
                        <div className="row mb-3 d-flex justify-content-center align-items-center">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"></label>
                            <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-flex justify-content-center align-items-center gap-2">
                                <div type="text" className="form-control text-center fw-bolder fs-6 text-primary">ID</div>
                                <div type="text" className="form-control text-center fw-bolder fs-6 text-primary">Name</div>
                                <div type="text" className="form-control text-center fw-bolder fs-6 text-primary">Mobile</div>
                                <div type="text" className="form-control text-center fw-bolder fs-6 text-primary">Email</div>

                            </div>
                        </div>

                        <div className='scrollHandler mb-3' style={{ height: (numInputs > 0) ? '15rem' : '0', overflowX: 'hidden', overflowY: 'scroll' }}>
                            {generateInputFields(numInputs)}
                        </div>


                        <div className="row mb-3">
                            <label htmlFor="inputtickets" className="col-sm-2 col-form-label fw-bolder fs-6 text-primary">Announcement Day</label>
                            <div className="col-sm-6 col-md-4 col-lg-2 ">
                                <DatePicker className="form-control" placeholderText='Select Date'
                                    minDate={new Date()}
                                    maxDate={addMonths(new Date(), 5)}
                                    showDisabledMonthNavigation selected={amtDate} onChange={(date) => setAmtDate(date)} />
                            </div>
                            {/* <label htmlFor="inputtickets" className="col-sm-2 col-form-label fw-bolder fs-6 text-primary">Start Date</label> */}
                            {/* <div className="col-sm-6 col-md-4 col-lg-2 ">
                                <DatePicker className="form-control" placeholderText='Select Date'
                                    minDate={new Date()}
                                    maxDate={addMonths(new Date(), 5)}
                                    showDisabledMonthNavigation selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <label htmlFor="inputtickets" className="col-sm-2 col-form-label fw-bolder fs-6 text-primary">End Date</label>
                            <div className="col-sm-6 col-md-4 col-lg-2 ">
                                <DatePicker className="form-control" placeholderText='Select Date'
                                    minDate={new Date()}
                                    maxDate={addMonths(new Date(), 5)}
                                    showDisabledMonthNavigation selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div> */}
                        </div>
                        {/* <div className="row mb-3">
                            <label htmlFor="inputtickets" className="col-sm-2 col-form-label fw-bolder fs-6 text-primary">Announcement Day</label>
                            <div className="col-sm-6 col-md-4 col-lg-2 ">
                                <input type="file" name="ticket_image" onChange={(e) => setTicketImage(e.target.files[0])} />
                            </div>
                        </div> */}

                        <div className="row mb-3">
                            <label htmlFor="inputtickets" className="col-sm-2 col-form-label fw-bolder fs-6 text-primary">Ticket Generated By</label>
                            {/* <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10"> */}
                            <div className="col-sm-6 col-md-4 col-lg-2">
                                <input type="text" className="form-control" name="authorname" onChange={handleInputstatic} />
                            </div>
                        </div>



                        <div className='float-end'>
                            <Link to="/ticketdetails">
                                <Button type="button" onClick={findData} disabled={numInputs==[]}className="btn btn-primary">Generate </Button>
                            </Link>
                        </div>
                    </form>
                </Col>
            </Row>

        </>
    );
};

export default Ticket_Register;