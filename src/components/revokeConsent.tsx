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
    <div>
        <h1>{studyName}</h1>
        <Formik
            initialValues={{
                fullName: ""
            }}
            onSubmit={(values, { setSubmitting }) => {
                handleForm(
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
                                <label>
                                    <button
                                        type="Confirm"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </button>
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
))

function handleForm(fullName) {
    if (true) {
        // TODO: full name is the same as database patient name
        // TODO: revoke patient from database
        alert("consent revoked, todo: post to database")
    } else {
        alert("inadiquate name")
    }
}

export default RevokeConsent;
