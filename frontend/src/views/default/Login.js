// import React from 'react';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink , useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { setCurrentUser, checkCurrentUser } from '../../auth/authSlice';
import { LoginService } from "../../@mock-api/data/datatable"



const loginToast = () => toast('Login Sucessfully');

const Login = () => {
 
  const history = useHistory();
  const dispatch = useDispatch();
  const title = 'Login';
  const description = 'Login Page';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
  });
  const initialValues = { email: '', password: '' };
  // const onSubmit = (values) =>
  //  console.log('submit form', values);
  const onSubmit = (values) => {
    let payload = {
      isLogin: false,
      currentUser: null,
      message: ""
    }
    
    LoginService(values, result => {
      console.log(result)
      if (result.status == true) {
        payload = {
          isLogin: true,
          currentUser: result,
          message: result.message
        }
        loginToast();
        localStorage.setItem("token",result.accessToken)
        dispatch(setCurrentUser(payload));
      } else {
      //  alert("res",result)
        payload = {
          isLogin: false,
          currentUser: null,
          message: result.message
        }
        dispatch(setCurrentUser(payload));
      }
    });
  }

  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {

    if (isLogin == true) {
      // 
      history.push("/dashboard");
    }

  }, [isLogin]);


  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">

      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="d-flex justify-content-center align-items-center mb-5">
          {/* <NavLink to="/"> */}
          <img src="/img/logo/logoIcon.png" className="card-img h-100 scale" alt="card image" style={{ width: '100px' }} />
          {/* </NavLink> */}
        </div>
        <div className="">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get started!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use your credentials to login.</p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />

              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button size="lg" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Login;
