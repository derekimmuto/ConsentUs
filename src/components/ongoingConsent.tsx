import React, { Component } from "react"
import axios from "axios"
import { withRouter } from "react-router-dom"
import Immuto from "immuto-backend"
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

const OngoingConsent = withRouter(({ studyName }) => (
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
                    values.fullName
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
                            <Document file={{url: "http://consentus.herokuapp.com/7cb0efbb93d4Informed%20Consent%20PDF.pdf"}}
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
))

function handleForm(consent, termsConditions, fullName) {
    if (consent && termsConditions) {
        // TODO: full name is the same as database patient name
        // TODO: post to database
        alert("consent given, todo: post to database")
    } else {
        alert("inadiquate consent")
    }
}

function download() {
   
}

export default OngoingConsent;





                                