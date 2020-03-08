import React from "react"
import { Alert, Container, Row, Col } from "react-bootstrap"
import {hash } from './ongoingConsent'

const ConsentSuccess = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col className="lg-5" />
                <Col className="lg-2">
                    <Alert variant="success">
                        <Alert.Heading>Congrats</Alert.Heading>
                        <p>
                            Successfully gave consent!
                        </p>
                        <hr />
                        <p className="mb-0">
                            Here is your hash: {hash}
                        </p>
                    </Alert>
                </Col>

                <Col className="lg-5" />
            </Row>
        </Container>
    )
}

export default ConsentSuccess
