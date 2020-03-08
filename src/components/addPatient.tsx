import React from "react"
import { Formik, Form, Field, FieldArray } from "formik"
import { Card, Container, Row, Col } from "react-bootstrap"

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
const AddPatient = () => (
    <Container>
        <Row className="mt-5">
            <Col className="lg-5" />
            <Col className="lg-2">
                <Card>
                    <Card.Body>
                        <Card.Title>Add Patients to Trial</Card.Title>
                        <Formik
                            initialValues={{
                                emails: [
                                    "jared@gmail.com",
                                    "ian@tufts.edu",
                                    "brent@spacex.space"
                                ]
                            }}
                            onSubmit={values =>
                                setTimeout(() => {
                                    // alert(JSON.stringify(values, null, 2))
                                    window.location.href = "/trial-success"
                                }, 500)
                            }
                            render={({ values }) => (
                                <Form>
                                    <FieldArray
                                        name="emails"
                                        render={arrayHelpers => (
                                            <div>
                                                {values.emails &&
                                                values.emails.length > 0 ? (
                                                    values.emails.map(
                                                        (email, index) => (
                                                            <div key={index}>
                                                                <Field
                                                                    name={`emails.${index}`}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(
                                                                            index
                                                                        )
                                                                    } // remove a friend from the list
                                                                >
                                                                    -
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        arrayHelpers.insert(
                                                                            index +
                                                                                1,
                                                                            ""
                                                                        )
                                                                    } // insert an empty string at a position
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            arrayHelpers.push(
                                                                ""
                                                            )
                                                        }
                                                    >
                                                        {/* show this when user has removed all friends from the list */}
                                                        Add a Patient by Email
                                                    </button>
                                                )}
                                                <div>
                                                    <button type="submit">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </Form>
                            )}
                        />
                    </Card.Body>
                </Card>
            </Col>
            <Col className="lg-5" />
        </Row>
    </Container>
)

export default AddPatient
