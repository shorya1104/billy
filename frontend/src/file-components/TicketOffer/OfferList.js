import React, { useState ,useEffect, useRef} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
// import TicketDownload from 'file-components/TicketDownload/TicketDownload';
// import CloseIcon from '@mui/icons-material/Close';
// import { GetAllTicket, GetTicketDetails   } from "@mock-api/data/datatable";
import { GetAllOffer , DeleteOfferService } from "@mock-api/data/datatable";

import html2canvas from 'html2canvas';
import OfferCard from 'file-components/OfferCard/OfferCard';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { toast } from 'react-toastify';

const OfferList = () => {
    const cancel = () => toast('Cancel Successfully!');
    const offerdelete = () => toast('Delete Successfully!');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState([]);
    const [deleteData, setDeleteData] = useState("");


    const [detail,setDetail]=useState(null);
    const handleShow = (item) => {
        setSelectedItem(item);
        setShow(true);
      };

    const handleclickdelete =(offer_id) =>{
        setShow(true)
        setDeleteData(offer_id)
    }

    const handleDeleteBlog =() =>{
        DeleteOfferService({ offer_id:deleteData}, (res) => {
            console.log(res);
            setShow(false);
            // window.location.reload();
            offerdelete();
            GetAllOffer((response)=>{
                console.log(response);
                setOfferList(response);
               // console.log(response);
            })
            
          });
    }
   
   

    const [startDate, setStartDate] = useState(null);
    const title = 'Offer List';
    const description = 'Elearning Portal Course Detail Page';

    const breadcrumbs = [
        { to: '', text: 'Dashboard' },
    ];



    const [offerList,setOfferList]=useState([])
    useEffect(()=>{
        GetAllOffer((response)=>{
            console.log(response);
            setOfferList(response);
           // console.log(response);
        })
    },[])

    const rowRefs=useRef([]);
    const handleDownload = (index,ticket) => {
     
        const rowRef = rowRefs.current[index];
         html2canvas(rowRef).then((canvas) => {
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
                <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl- row-cols-xxl-2 g-2">
                
                    {/* <div class="row row-cols-1 row-cols-lg-2 g-2"> */}
                    { offerList.length !== 0 ? (offerList.length !== 0 && offerList.map((value, index) =>{
                    

                  
                   return(
                 <div>
                    <div class="col">
                        <div class="card">
                            <OfferCard  offername={value.offer_name}  startdate={value.start_date} enddate={value.end_date} Frame={`http://localhost:8000/offer/${value.offer_url}`}/>
                            {/* <OfferCard  offername={value.offer_name}  startdate={value.start_date} enddate={value.end_date} Frame={`http://billy247.com:3002/offer/${value.offer_url}`}/> */}
                            <div class="card-body11">
                                <div className='d-flex justify-content-around align-items-center p-3'>
                                    {/* <button type="button" className="btn-secondary px-3 mx-1 border border-0 rounded-3" onClick={accept} >Accept</button>
                                    <button type="button" className="btn-danger px-3  mx-1 border border-0 rounded-3" onClick={reject}>Reject</button> */}

                                    <Link to={`/editoffer?offer_id=${value.offer_id}`}>
                                        <SaveAsOutlinedIcon className="text-primary pointer cursor-pointer mx-2" />
                                    </Link>
                                    <DeleteOutlineOutlinedIcon className="text-primary pointer cursor-pointer" onClick={() => handleclickdelete(value.offer_id)}/>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>       )
                        })
                    ) : (
                        <div>No data found</div>
                    )}
                 </div>
            </Row>

            {/* Popup Modal code start from here */}
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
                        <Button className="mx-2" variant="secondary" onClick={() => {
                            handleClose();
                            cancel();
                        }}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleDeleteBlog}>
                            Delete
                        </Button>
                    </div>
                </Modal>
            </div>
{/* {          detail!=null?
            <Modal show={show} onHide={handleClose} backdrop="static"
                size="lg"
                keyboard={false}>
                <Modal.Header closeButton style={{ height: '0px' }}>

                    <Modal.Title className='px-3 pt-3 fw-bolder text-primary fs-4'>Ticket Details
                    </Modal.Title>

                </Modal.Header>

                <div className='rounded border-primary m-1'>
                    <TicketDownload ticketnumber={detail.ticketid} announcementdate={detail.announcement_date} Frame={`http://localhost:8000/offer/${detail.offer_url}`} validitydate={detail.end_date} offername={detail.offer_name}/>

                   
                </div>
            </Modal >:null
} */}
        </>
    );
};

export default OfferList;