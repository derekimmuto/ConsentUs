import React from "react";
import {withRouter} from 'react-router-dom'
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {Formik} from "formik";
import immuto from 'immuto-backend'
export const im = immuto.init(true, "https://dev.immuto.io")


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
  var http = new XMLHttpRequest()
  var formData = new FormData();

  console.log(trialName)
  console.log(documentName)
  console.log(file)
  console.log(sponsor)

  // ACKSHUALLY (Delete after debugging)
  //URL = "http://localhost:8001"

  http.open("POST", URL + "/create-trial", true)
  http.setRequestHeader("Content-Type", "multipart/form-data");  
  http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
          let response = JSON.parse(http.responseText)
          window.location.href = "/admin"
      } else if (http.readyState == 4) {
        alert("Error: " + http.responseText)
      }
  }

  formData.append("file", file);
  formData.append("trialName", trialName)
  formData.append("documentName", documentName)
  formData.append("sponsor", sponsor)
  formData.append("authToken", window.localStorage.authToken)
  http.send(formData);
}

export default AddTrial;