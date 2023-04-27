import { lazy } from 'react';
import { DEFAULT_PATHS } from 'config.js';

// Code start here
const Dashboard = lazy(() => import("file-components/Dashboard/Dashboard"));
const Add_Blog = lazy(() => import("file-components/Add-Blog/Add_Blog"));
const Edit_Blog = lazy(() => import("file-components/Edit-Blog/Edit_Blog"));
const Blog = lazy(() => import("file-components/Blog/Blog"));
const Blog_Details = lazy(() => import("file-components/Blog-Details/Blog_Details"));
const Ticket_Register = lazy(() => import("file-components/Ticket_Register/Ticket_Register"));
const TicketDetails = lazy(() => import("file-components/TicketDetails/TicketDetails"));
const TicketDownload = lazy(() => import("file-components/TicketDownload/TicketDownload"));
const OfferCard = lazy(() => import("file-components/OfferCard/OfferCard"));
const EditOffer = lazy(() => import("file-components/EditOffer/EditOffer"))
const AddNewBlog = lazy(() => import("file-components/AddNewBlog/AddNewBlog"))
// const CreateOffer = lazy(() => import("file-components/CreateOffer/CreateOffer"));

const Tickets = {
  ticketgenerator: lazy(() => import('file-components/Tickets/TicketGenerator')),
  ticketlist: lazy(() => import('file-components/Tickets/TicketList')),
};


const TicketOffer = {
  createoffer: lazy(() => import('file-components/TicketOffer/CreateOffer')),
  offerlist: lazy(() => import('file-components/TicketOffer/OfferList')),
};




// Code start second here
const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboard`,
    },


    {
      path: `${appRoot}/dashboard`,
      component: Dashboard,
      label: "menu.dashboard",
      icon: "invoice",
    },

    {
      path: `${appRoot}/add-blog`,
      component: Add_Blog,
      // label: "menu.add_blog",
      icon: "user",
    },
    {
      path: `${appRoot}/addnewblog`,
      component: AddNewBlog,
      label: "menu.addnewblog",
      icon: "user",
    },
    {
      path: `${appRoot}/offercard`,
      component: OfferCard,
      // label: "menu.offercard",
      icon: "user",
    },
    {
      path: `${appRoot}/editoffer`,
      component: EditOffer,
      // label: "menu.editoffer",
      icon: "user",
    },

    {
      path: `${appRoot}/edit-blog`,
      component: Edit_Blog,
      // label: "menu.edit_blog",
      icon: "invoice",
    },

    {
      path: `${appRoot}/blog`,
      component: Blog,
      label: "menu.blog",
      icon: "credit-card",
    },

    {
      path: `${appRoot}/blog-details`,
      component: Blog_Details,
      // label: "menu.blog_details",
      icon: "invoice",
    },
    {
      path: `${appRoot}/ticketoffer`,
      exact: true,
      redirect: true,
      to: `${appRoot}/TicketOffer/CreateOffer`,
      label: 'menu.ticketoffer',
      icon: 'cupcake',
      subs: [
        { path: '/createoffer', label: 'menu.createoffer', component: TicketOffer.createoffer },
        { path: '/offerlist', label: 'menu.offerlist', component: TicketOffer.offerlist },
      ],
    },
    // {
    //   path: `${appRoot}/ticket_register`,
    //   component: Ticket_Register,
    //   label: "menu.ticket_register",
    //   icon: "invoice",
    // },
    {
      path: `${appRoot}/ticketdetails`,
      component: TicketDetails,
      // label: "menu.ticketdetails",
      icon: "invoice",
    },
    {
      path: `${appRoot}/ticketdownload`,
      component: TicketDownload,
      // label: "menu.ticketdownload",
      icon: "invoice",
    },
    // {
    //   path: `${appRoot}/createoffer`,
    //   component: CreateOffer,
    //   label: "menu.createoffer",
    //   icon: "invoice",
    // },
    
    {
      path: `${appRoot}/tickets`,
      exact: true,
      redirect: true,
      to: `${appRoot}/Tickets/TicketGenerator`,
      label: 'menu.tickets',
      icon: 'invoice',
      subs: [
        { path: '/tikcetgenerator', label: 'menu.tikcetgenerator', component: Tickets.ticketgenerator },
        { path: '/ticketlist', label: 'menu.ticketlist', component: Tickets.ticketlist },
      ],
    },

  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
