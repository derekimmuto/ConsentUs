import React, { Component, useEffect } from "react"
import axios from 'axios';
import Immuto from 'immuto-backend'
import { withRouter } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    FormGroup,
    FormControl
} from "react-bootstrap"
import { Formik, Field } from "formik"
import immuto from "immuto-backend"
export const im = immuto.init(true, "https://dev.immuto.io")

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import pdf from '../assets/sample.pdf'

let pdf_source = "http://consentus.herokuapp.com/7cb0efbb93d4Informed%20Consent%20PDF.pdf"
// pdf_source = "http://localhost:8001/ongoing-consent"


const OngoingConsent = withRouter(({ studyName, history }) => {
    useEffect(download, [])
return (
    <div>
        <h1>{studyName}</h1>
        <Formik
            initialValues={{
                consent: false,
                termsCondition: false,
                fullName: ""
            }}
            onSubmit={(values, { setSubmitting }) => {
                handleForm(
                    values.consent,
                    values.termsCondition,
                    values.fullName,
                    history,
                )
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <Container>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Document file={{url: pdf_source}}
                                onLoadError={console.error} />                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>
                                    <Field type="checkbox" name="consent" />{" "}
                                    I consent to this study.
                                </label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br />
                                <label>
                                    <Field
                                        type="checkbox"
                                        name="termsCondition"
                                    />{" "}
                                    I agree to the terms and conditions given
                                    above.
                                </label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                            </Col>
                        </Row>
                    </form>
                </Container>
            )}
        </Formik>
    </div>
)});

export let hash = null;

function handleForm(consent, termsConditions, fullName, history) {
    if (consent && termsConditions) {
        // TODO: full name is the same as database patient name
        // TODO: post to database
        // alert("consent given, todo: post to database")
        const res = im.create_data_management("my pdf hash", "my_pdf" + Math.random(), "basic", "Test12345!", "a test pdf from hackathon")
        res.then(res => {
            console.log("res: ", res)
            hash = res
            history.push( "/consent_succ")
        })
    } else {
        alert("inadiquate consent")
    }
}

function download() {


    // const serverRequest = axios
    //     .get(pdf_source)
    //     .then(function(result) {    
    //         console.log(result)
    //         let im = Immuto.init(true, "https://dev.immuto.io")
    //         let user_pwd = "12345!"
    //         let user_email = "user@user.io"
    //         im.create_digital_agreement(result, "consent form", "single_sign", user_pwd, [user_email])
    //             .then((recordID) => {
    //                 console.log("Record id = " + recordID)
    //             })
    //     //   _this.setState({
    //     //     jobs: result.data.jobs
    //     //   });
    //     })
  }

export default OngoingConsent;





                                