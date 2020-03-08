import React, {useState} from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, Button } from "react-bootstrap"

const Admin = () => {
    const [trials, setTrials] = useState([{}])

    return (
        <Container className="m-5">
            <Row className="mb-5">
                <Col>
                    <Card style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Card Subtitle
                            </Card.Subtitle>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <Link to="/trials">
                            <Button>Trials</Button>
                        </Link>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Link to="/patients">
                            <Button>Patients</Button>
                        </Link>
                    </Row>
                </Col>
                <Col>
                    <Link to="/view-documents">
                        <Button>View Documents</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin
