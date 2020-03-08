import React from "react";

import {withRouter} from 'react-router-dom'
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {Formik} from "formik";
import immuto from 'immuto-backend'
export const im = immuto.init(true, "https://dev.immuto.io")
import axios from "axios"

let URL = "http://consentus.herokuapp.com"

const AddTrial = withRouter(({setUserType, history}) => (
    <Formik
      initialValues={{ trialName: '', documentName: '', sponsor: '', file: ''}}
      onSubmit={(values, { setSubmitting }) => {
        handleForm(values.trialName, values.documentName, values.file, values.sponsor)
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
            type="file"
            name="file"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.file}
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
                Submit
            </button>
            </div>
        )}
    </Formik>
));

function handleForm (trialName, documentName, file, sponsor) {
  const data = new FormData() 
  console.log(document.querySelector('input[type="file"]').files[0])
  data.append('file', document.querySelector('input[type="file"]').files[0])
  data.append("trialName", trialName)
  data.append("documentName", documentName)
  data.append("sponsor", sponsor)
  data.append("authToken", window.localStorage.authToken)
  axios.post("http://localhost:8001/create-trial", data, { 
      })
      .then(res => { // then print response status
        window.location.href="/add-patient-to-trial"
      }).catch((err) => {
        console.error(err)
      })
}

export default AddTrial;
