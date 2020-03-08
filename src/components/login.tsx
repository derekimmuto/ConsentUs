import React from "react";
import {withRouter} from 'react-router-dom'
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {Formik} from "formik";
import immuto from 'immuto-backend'

export const im = immuto.init(true, "https://dev.immuto.io")

console.log(im)

const URL = "http://consentus.herokuapp.com"

const LoginForm = withRouter(({setUserType, history}) => (
  <div>
    <h1>Login:</h1>
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
          <label htmlFor="email:">Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            />
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </button>
          <br />
          {errors.email && touched.email && errors.email}
          <br />
          {errors.password && touched.password && errors.password}
        </form>
      )}
    </Formik>
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
