import { SERVICE_URL } from 'config';
import axios from 'axios';
axios.defaults.baseURL = SERVICE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const LoginService = async (requestData, callback) => {
  try {
    const response = await axios.post(`/user/login`, requestData);
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }

}

// // ADD NEW BLOG 
const AddBlogService = async (requestData, callback) => {
  try {
    const response = await axios.post(`/blog/create`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data',
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    
  }
}

// UPDATE EXISTING BLOG
const UpdateBlogService = async (requestData, callback) => {
  try {
    const response = await axios.post(`/blog/update`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data',
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}
const WithoutUpdateBlogService = async (requestData, callback) => {
  try {
    const response = await axios.post(`/blog/update`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
       }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}

// GET ALL BLOG
const GetAllBlogService = async (callback) => {
 
  try {
    const response = await axios.post(`/blog/get-all`, {},{
      headers: {
        'token':localStorage.getItem("token"),
      }
    });

    return callback(response.data);

  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}
// GET SINGLE EXISTING BLOG
const GetBlogService = async (requestData, callback) => {
//  console.log(requestData)
  try {
    const response = await axios.post(`/blog/get`, requestData,{
      headers: {
        'token':localStorage.getItem("token"),
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}
// DELETE EXISTING BLOG
const DeleteBlogService = async (requestData, callback) => {
  try {
    const response = await axios.post(`/blog/delete`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
        // 'Content-Type': 'app',
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}

// DELETE EXISTING BLOG
const LogoutService = async (requestData, callback) => {
  try {
    const response = await axios.post(`/user/logout`, requestData);
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}

//ADD TICKETS
const AddticketService = async(requestData,callback)=>{
  console.log(requestData)
  try {
    const response = await axios.post(`/ticket/create`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
        // 'Content-Type': 'app',
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    
  }
}

//TICKET DETAILS
const GetAllTicket = async (callback) => {
 console.log("iooioijoij")
  try {
    const response = await axios.post(`/ticket/getTicketlist`, {},{
      headers: {
        'token':localStorage.getItem("token"),
      }
    });

    return callback(response.data);

  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}

// add offer
const AddOfferService = async(requestData,callback)=>{
  console.log(requestData)
  try {
    const response = await axios.post(`/offer/create`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data',
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    
  }
}

//GET ALL OFFERS LIST
const GetAllOffer = async (callback) => {
 
  try {
    const response = await axios.post(`/offer/get-all`, {},{
      headers: {
        'token':localStorage.getItem("token"),
      }
    });

    return callback(response.data);

  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}

//GET ALL Ticket Data LIST
const GetTicketDetails = async (callback) => {
 
  try {
    const response = await axios.post(`/offer/get-Ticket-Data`, {},{
      headers: {
        'token':localStorage.getItem("token"),
      }
    });

    return callback(response.data);

  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}

//Update offer
const UpdateOfferService = async (requestData, callback) => {
  try {
    const response = await axios.post(`/offer/updateoffer`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
        'Content-Type': 'multipart/form-data',
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}
const withoutUpdateOfferService = async (requestData, callback) => {
  try {
    const response = await axios.post(`/offer/updateoffer`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
       
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}

// GET SINGLE EXISTING Offer
const GetOfferService = async (requestData, callback) => {
  console.log(requestData)
  try {
    const response = await axios.post(`/offer/get`, requestData,{
      headers: {
        'token':localStorage.getItem("token"),
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}


const DeleteOfferService = async (requestData, callback) => {
  try {
    const response = await axios.post(`/offer/deleteoffer`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
        // 'Content-Type': 'app',
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}
//ADD CATEGORY SERVICE 
const AddCategoryService = async(requestData,callback)=>{
  console.log(requestData)
  try {
    const response = await axios.post(`/category/create`, requestData,
    {
      headers: {
        'token':localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    return callback(response.data);
  } catch (error) {
    return callback(error);;
    
  }
}

//GET ALL CATEGORY LIST

const GetAllCategory = async (callback) => {
 
  try {
    const response = await axios.post(`/category/get-all`, {},{
      headers: {
        'token':localStorage.getItem("token"),
      }
    });

    return callback(response.data);

  } catch (error) {
    return callback(error);;
    // console.error(error);
  }
}









export { LoginService,AddBlogService, UpdateBlogService, 
  LogoutService, WithoutUpdateBlogService, AddCategoryService,GetAllCategory,
   DeleteBlogService, GetAllBlogService, GetBlogService, AddticketService,AddOfferService, GetAllTicket, GetAllOffer ,
   GetTicketDetails, UpdateOfferService, GetOfferService,withoutUpdateOfferService, DeleteOfferService }
