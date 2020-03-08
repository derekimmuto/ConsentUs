import React from "react";
import {withRouter} from 'react-router-dom'
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {Formik} from "formik";
import immuto from 'immuto-backend'
export const im = immuto.init(true, "https://dev.immuto.io")
import bwlogo from "../assets/logo_bw.png"

console.log(im)

const URL = "http://consentus.herokuapp.com/"

const RegisterForm = withRouter(({setUserType, history}) => (
  <div className="container-flex gradient-background full-page ">

  <div className="row center-row">
    <div className="col-2 col-lg-3"></div>
    <div className="col-8 col-lg-6 text-center rounded-border m-2">
  <div>
  <img id="loginLogo" className="text-white mb-4 px-0" src={bwlogo}></img>
    <h1 className="text-white mb-4">Registration</h1>
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email Required';
        } else if (!values.password){
            errors.password = 'Password Required'; //Todo: PASSWORD VALIDATION
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ){
          errors.email = 'Invalid email address';
        } else if (password !== confirmPassword) {
          errors.password = 'Passwords do not match';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setUserType("admin")
        handleForm(values.email, values.password, history)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
        {/* <label htmlFor="email:">Email:</label> */}
        <div className="form-group">
        <div className="input-group">
        <div className="input-group-prepend help">
                <span className="input-group-text">
                  <span className="fas fa-at"></span>
                </span>
                </div>
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        /></div></div>
        {/* <label htmlFor="password">Password:</label> */}
        <div className="form-group">
        <div className="input-group">
        <div className="input-group-prepend help">
              <span className="input-group-text" id="">
                <span className="fas fa-lock"></span>
              </span>
              </div>
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="********"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          />
          
          <input
          className="form-control"
          type="password"
          name="confirmPassword"
          placeholder="********"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
          /></div></div>

            <button className="btn btn-outline-light mt-2 mx-0 w-25" type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                    Register
                  </button>
        
        
        <br />
        {errors.email && touched.email && errors.email}
        {errors.password && touched.password && errors.password}
      </form>
      )}
    </Formik>
  </div>
  </div>
  </div>
  </div>
));

function handleForm(email, password, history) {
    if (im.authToken) {
        im.deauthenticate()
    }

    register_user(email, password).then((result) => {
      window.location.href = "/login"
  }).catch((err) => {
      console.log("error: ", err)
  })
}

function register_user(email, password) {
  return new Promise((resolve, reject) => {
      generate_registration_token(email).then((orgToken) => {
          im.register_user(email, password, orgToken).then(() => {
              resolve()
          }).catch((err) => {
              reject(err)
          })
      }).catch((err) =>{
          reject(err)
      })
  })
}

function generate_registration_token(email) {
  return new Promise((resolve, reject) => {
      var http = new XMLHttpRequest()
      let sendstring = "email=" + email.toLowerCase()
      http.open("POST", "/register-org-user", true)
      http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      http.onreadystatechange = () => {
          if (http.readyState == 4 && http.status == 200) {
              let regToken = http.responseText
              resolve(regToken)
          } else if (http.readyState == 4) {
              reject(http.responseText)
          }
      }
      http.send(sendstring)
  })
}

export default RegisterForm;