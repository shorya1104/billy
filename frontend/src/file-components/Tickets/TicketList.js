import React, { useState, useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import TicketDownload from 'file-components/TicketDownload/TicketDownload';
import moment from "moment";
import CloseIcon from '@mui/icons-material/Close';
import { GetAllTicket, GetTicketDetails, GetAllOffer } from "@mock-api/data/datatable";
import html2canvas from 'html2canvas';
const TicketPriview = ({ ticketnumber, announcementdate, validitydate, offername, Frame }) => {



    return (
        <>
            <div className="responsive-bg-w-text">
                <img src={Frame} alt="" />
                <div className="headerpriview">
                    <p className='offer-text-handler'>O F F E R</p>
                    <p className='win-text-handler'> {offername}</p>
                    <p className='ticket-id-handler' > Ticket Id: <span> {ticketnumber}</span> </p>
                    <p className='ticket-id-handler' > Valid Till: <span>{moment(validitydate, 'ddd, DD MMM YYYY HH:mm:ss z').format('MMMM Do YYYY')}</span> </p>
                    <p className='draw-announce-handler' > Draw Announcement date:</p>
                    <span className='date-text-handler'> {announcementdate}</span>
                </div>
            </div>
        </>
    )
}

const TicketDetails = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => { setDetail(null); setShow(false); }
    const [detail, setDetail] = useState(null);
    const handleShow = (value) => {
        setDetail(value);
        setShow(true);
    }


    const [startDate, setStartDate] = useState(null);
    const title = 'Ticket Details';
    const description = 'Elearning Portal Course Detail Page';

    const breadcrumbs = [
        { to: '', text: 'Dashboard' },
    ];

    const [ticketList, setTicketList] = useState([])
    let id = window.location.search.split("=").at(-1)
    useEffect(() => {
        GetAllTicket((data) => {
            console.log(data)
            setTicketList(data)

        })

    }, [])

    const [ticketDetails, setTicketDetails] = useState([])
    useEffect(() => {
        GetTicketDetails((response) => {
            console.log(response);
            setTicketDetails(response);
            // console.log(response);
        })
    }, [])

    const rowRefs = useRef([]);
    const imageRef = useRef(null);

    const handleDownload = (index, ticket ) => {
        console.log(index)
        const rowRef = rowRefs.current[index];  
        html2canvas(rowRef , { image: imageRef }).then((canvas) => {
            const link = document.createElement('a');
            link.download = `${ticket}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });

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

            <Row className="mb-5 lg=6 g-2">

                {/* row-cols-1 */}
                <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2  row-cols-xl-2 row-cols-xxl-2 g-2">

                    {/* <div class="row row-cols-1 row-cols-lg-2 g-2"> */}
                    {ticketDetails.length !== 0 ? (
                        ticketDetails.map((value, index) => {
                            return (
                                <div>
                                    <div className="col" id={value.ticketid} key={value.ticketid}>
                                        <div className="card" id={value.ticketid} ref={(el) => rowRefs.current[index] = el}>
                                            <TicketDownload ticketnumber={value.ticketid} announcementdate={value.announcement_date} validitydate={value.end_date} offername={value.offer_name} Frame={`http://localhost:8000/offer/${value.offer_url}`} />
                                            {/* <TicketDownload ticketnumber={value.ticketid} announcementdate={value.announcement_date} validitydate={value.end_date} offername={value.offer_name} Frame={`http://billy247.com:3002/offer/${value.offer_url}`}/> */}
                                            <div className="card-body11"></div>
                                        </div>
                                        <div className='d-flex justify-content-around align-items-center p-3'>
                                            <button onClick={() => { handleShow(value) }} type="button" className="btn-primary border-0 px-3" style={{ fontSize: '14px', borderRadius: '5px', padding: '2px 0px' }} >View </button>
                                            <button onClick={() => { handleDownload(index, value.ticketid ,value.offer_url) }} type="button" className="btn-primary border-0 px-3" style={{ fontSize: '14px', borderRadius: '5px', padding: '2px 0px' }}>Download</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div>No data found</div>
                    )}


                    {/* {ticketDetails.length !== 0  && ticketDetails.map((value, index) => {

                        return (
                            <div>
                                <div className="col" id={value.ticketid} key={value.ticketid}>
                                    <div className="card" id={value.ticketid} ref={(el) => rowRefs.current[index] = el} >
                                        <TicketDownload ticketnumber={value.ticketid} announcementdate={value.announcement_date}
                                            validitydate={value.end_date} offername={value.offer_name} Frame={`http://localhost:8000/offer/${value.offer_url}`} />
                                       
                                        <div className="card-body11">
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-around align-items-center p-3'>

                                        <button onClick={() => { handleShow(value) }} type="button" className="btn-primary border-0 px-3" style={{ fontSize: '14px', borderRadius: '5px', padding: '2px 0px' }} >View </button>
                                        <button onClick={() => { handleDownload(index, value.ticketid) }} type="button" className="btn-primary border-0 px-3" style={{ fontSize: '14px', borderRadius: '5px', padding: '2px 0px' }}>Download</button>

                                    </div>
                                </div>

                            </div>)
                    }

                    )} */}
                </div>
            </Row>

            {/* Popup Modal code start from here */}
            {detail != null ?
                <Modal show={show} onHide={handleClose} backdrop="static"
                    size="lg"
                    keyboard={false}>
                    <Modal.Header closeButton style={{ height: '0px' }}>

                        <Modal.Title className='px-3 pt-3 fw-bolder text-primary fs-4'>Ticket Details
                        </Modal.Title>
                        {/* <Modal.Title className='px-3 pt-3 fw-bolder text-primary'> <CloseIcon />
                </Modal.Title> */}
                    </Modal.Header>

                    <div className='rounded border-primary m-1'>
                        <TicketPriview ticketnumber={detail.ticketid} announcementdate={detail.announcement_date} Frame={`http://localhost:8000/offer/${detail.offer_url}`} validitydate={detail.end_date} offername={detail.offer_name} />
                        {/* <TicketPriview ticketnumber={detail.ticketid} announcementdate={detail.announcement_date} Frame={`http://billy247.com:3002/offer/${detail.offer_url}`} validitydate={detail.end_date} offername={detail.offer_name}/> */}
                        {/* <img src="/img/icon.jpg" className="card-img-top rounded" alt="/img/icon.jpg" /> */}
                    </div>
                </Modal > : null
            }
        </>
    );
};

export default TicketDetails;