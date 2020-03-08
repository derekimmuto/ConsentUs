import React from "react";
// import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {Formik} from "formik";
// var im = Immuto.init(true, "https://dev.immuto.io") // https://dev.immuto.io for dev env
import im from "immuto-backend";
//onclick="login()" for login-button



const LoginForm = () => (
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
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
        <form onSubmit={() => {
            handleForm(values.email, values.password)
        }}>
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
          <button type="submit" onClick={() => {
                handleForm(values.email, values.password)
          }} disabled={isSubmitting}>
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
);

function handleForm(email, password) {
    console.log(email)
    console.log(password)
    // if (im.authToken) {
    //     im.deauthenticate()
    // }

    // im.authenticate(email, password).then((authToken) => {
    //     create_user_session(authToken).then(() => {
    //         window.location.href = "/dashboard"
    //     }).catch((err) => {
    //         alert(err)
    //     })
    // }).catch((err) => {

    //     alert("Unable to login: \n" + err)
    // })
}

function create_user_session(authToken) {
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest()
        let sendstring = "authToken=" + authToken
        http.open("POST", "/login-user", true)
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        http.onreadystatechange = () => {
            if (http.readyState == 4 && http.status == 204) {
                resolve()
            } else if (http.readyState == 4) {
                reject(http.responseText)
            }
        }
        http.send(sendstring)
    })
}

export default LoginForm;
