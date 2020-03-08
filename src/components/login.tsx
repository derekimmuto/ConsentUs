import React from "react";
import {withRouter} from 'react-router-dom'
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {Formik} from "formik";
import immuto from 'immuto-backend'

export const im = immuto.init(true, "https://dev.immuto.io")

import bwlogo from "../assets/logo_bw.png"

const URL = "http://consentus.herokuapp.com"

const LoginForm = withRouter(({setUserType, history}) => (
  <div className="container-flex gradient-background full-page ">
    <div className="row center-row">
    <div className="col-2 col-lg-3"></div>
    <div className="col-8 col-lg-6 text-center rounded-border m-2">
    <img id="loginLogo" className="text-white mb-4" src={bwlogo}></img>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email Required';
        } else if (!values.password){
            errors.password = 'Password Required'; //Todo: PASSWORD VALIDATION
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
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
            /></div></div>

              <button className="btn btn-outline-light mt-2 mx-0 w-25" type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                      Login
                    </button>
          
          {errors.email && touched.email && errors.email}
          <br />
          {errors.password && touched.password && errors.password}
        </form>
      )}
    </Formik>
    </div>
    </div>
  </div>
));

function handleForm(email, password, history) {
    if (im.authToken) {
        im.deauthenticate()
    }

    im.authenticate(email, password).then((authToken) => {
        console.log("authToken: ", authToken)
        create_user_session(authToken).then((r: {userType: string}) => {
          let userType = ((r.userType && r.userType !== undefined)? r.userType : 'admin')
            history.push("/" + userType)
        }).catch((err) => {
            alert("[Error]: " + err)
        })
    }).catch((err) => {

        alert("Unable to login: \n" + err)
    })
}

function create_user_session(authToken) {
  console.log(URL)
  console.log(JSON.stringify(authToken))
  // return fetch(URL + 'login-user', {
  //   method: 'POST',
  //   mode: 'cors', // no-cors, *cors, same-origin
  //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   // credentials: 'omit', // include, *same-origin, omit
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   referrerPolicy: 'no-referrer', // no-referrer, *client
  //   body: "authToken=" + authToken // body data type must match "Content-Type" header
  // })
  // .then(r => JSON.parse(r))
  // .catch(e => console.error("[Login Error]: ", e))
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest()
        let sendstring = "authToken=" + authToken
        http.open("POST", URL + "/login-user", true)
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        http.onreadystatechange = () => {
            if (http.readyState == 4 && (http.status == 204 || http.status == 200)) {
                resolve(http.responseText)
            } else if (http.readyState == 4) {
                reject(http.responseText)
            }
        }
        http.send(sendstring)
    })
}

export default LoginForm;
