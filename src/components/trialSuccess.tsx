import React from "react"
import { Alert, Container, Row, Col } from "react-bootstrap"

const TrialSuccess = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col className="lg-5" />
                <Col className="lg-2">
                    <Alert variant="success">
                        <Alert.Heading>Congrats</Alert.Heading>
                        <p>
                            Successfully began a trial.
                        </p>
                        <hr />
                        <p className="mb-0">
                            Patient emails have been sent
                        </p>
                    </Alert>
                </Col>

                <Col className="lg-5" />
            </Row>
        </Container>
    )
}

export default TrialSuccess
