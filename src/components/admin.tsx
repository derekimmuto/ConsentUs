import React, { useState } from "react"
import { Link, useRouteMatch, Switch, Route } from "react-router-dom"
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap"

const Admin = () => {
    const { url, path } = useRouteMatch()

    const [trials, setTrials] = useState([
        {
            notes: "some stuff",
            sponsor: "Pfzier",
            startDate: new Date(),
            endDate: new Date(),
            description: "this is a trial desc",
            subjects: [1, 2, 3],
            contacts: { PI: "John Jeremy", Sponsor: "Buffet" }
        }
    ])
    const [patients, setPatients] = useState([])

    return (
        <Container className="m-5">
            <Row>
                <TableView></TableView>
                <TableView></TableView>
                <TableView></TableView>
            </Row>
            <Row className="mb-5">
                <Col>
                    <Card style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>Active Trials</Card.Title>
                            <Card.Text>{trials.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <CellLink to="/admin/trials">Trials</CellLink>
                <CellLink to="/admin/patients">Patients</CellLink>
                <CellLink to="/admin/view-documents">View Documents</CellLink>
            </Row>
            <Row>
                <Switch>
                    {[
                        { end: "/trials", Comp: () => <p>trials</p> },
                        { end: "/patients", Comp: () => <p>patients</p> },
                        {
                            end: "/view-document",
                            Comp: () => <p>View Documents</p>
                        }
                    ].map(({ end, Comp }) => (
                        <Route path={path + end} key={path}>
                            {Comp()}
                        </Route>
                    ))}
                </Switch>
            </Row>
        </Container>
    )
}

const TableView = () => (
    <Col>
        <Table>
            <thead>
                <tr>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
            </tbody>
        </Table>
    </Col>
)
const CellLink = ({ to, children }) => (
    <Col>
        <Link to={to}>
            <Button>{children}</Button>
        </Link>
    </Col>
)

export default Admin
