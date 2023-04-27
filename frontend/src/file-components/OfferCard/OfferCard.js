import React from 'react'
import style from "../../file-components/Style/style.css"
import moment from "moment";


// const TicketDownload = ({ticketnumber , enddate , startdate , offername ,Frame}) => {


const OfferCard = ({ticketnumber , enddate , startdate , offername ,Frame}) => {
    return (
        <>
           
           <div className="responsive-bg-w-text">
            <img src={Frame} alt="" />
                <div class="header">
                    <p className='offer-text-handler'>O F F E R</p>
                    <p className='win-text-handler'>{offername}</p>
                    <p className='date-text-handler'>
                        <span>{moment(startdate, 'ddd, DD MMM YYYY HH:mm:ss z').format('MMMM Do YYYY')}</span> <span>to</span> <span>{moment(enddate, 'ddd, DD MMM YYYY HH:mm:ss z').format('MMMM Do YYYY')}</span>
                    </p>
                    {/* <p className='card-id-handler' > Ticket Id: <span> 1023586699</span> </p> */}
                </div>
            </div>
        </>
    )
}
export default OfferCard;