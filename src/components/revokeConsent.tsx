import React from "react"
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

const RevokeConsent = (({ studyName }) => (
    <div className="container-flex gradient-background full-page ">
    <div className="row center-row">
    <div className="col-2 col-lg-3">
    <div className="col-8 col-lg-6 text-center rounded-border m-2">
        <h1>{studyName}</h1>
        <Formik
            initialValues={{
                fullName: ""
            }}
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
                isSubmitting
            }) => (
                <Container>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <label>
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </button>
                                    <br />
                                    <br />
                                    Are you sure that you want to leave this study?
                                </label>
                            </Col>
                        </Row>
                    </form>
                </Container>
            )}
        </Formik>
    </div>
    </div>
    </div>
    </div>
))

function handleForm() {
    if (true) {
        // TODO: full name is the same as database patient name
        // TODO: revoke patient from database
        alert("consent revoked, todo: post to database")
    } else {
        alert("inadiquate name")
    }
}

export default RevokeConsent;
