import React from "react";
import {withRouter} from 'react-router-dom'
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {Formik} from "formik";
import immuto from 'immuto-backend'
export const im = immuto.init(true, "https://dev.immuto.io")


const URL = "http://consentus.herokuapp.com"

const AddTrial = withRouter(({setUserType, history}) => (
    <Formik
      initialValues={{ trialName: '', documentName: '', sponsor: ''}}
      onSubmit={(values, { setSubmitting }) => {
        handleForm()
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
          <div>
          <input
            className="form-control"
            type="text"
            name="trialName"
            placeholder="Trial Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.trialName}
          />
          <input
            className="form-control"
            type="text"
            name="documentName"
            placeholder="Document Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.documentName}
          />
          <input
            className="form-control"
            type="text"
            name="sponsor"
            placeholder="Sponsor"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.sponsor}
          />
            <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                Login
            </button>
            </div>
        )}
    </Formik>
));

function handleForm () {

    console.log("test")
    
}

export default AddTrial;