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
const URL = "http://consentus.herokuapp.com"

const ConfirmConsentGivent = (({ studyName }) => (
    <div>      
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
                                        onClick={handleSubmit}
                                    >
                                        Return to Dashboard
                                    </button>
                                    <br />
                                    You have successfully given consent for {studyName}
                                </label>
                            </Col>
                        </Row>
                    </form>
                </Container>
            )}
    </div>
))

function handleForm(fullName) {
    window.location.href = URL;
}

export default ConfirmConsentGivent;
