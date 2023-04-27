import React from 'react'
import style from "../../file-components/Style/style.css"
// import { GetAllTicket } from "@mock-api/data/datatable";
import moment from "moment";


const TicketDownload = ({ticketnumber , announcementdate , validitydate , offername ,Frame}) => {
        

    
    return (
        <>
            <div className="responsive-bg-w-text">
            <img src={Frame} alt="" />
                <div className="header">
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


export default TicketDownload;
