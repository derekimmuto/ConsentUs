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
        },
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
                <TableView
                    headings={["Sponsor", "Subjects"]}
                    rows={trials.map(trial => [
                        trial.sponsor,
                        trial.subjects.length
                    ])}
                ></TableView>
                <TableView
                    headings={["Sponsor", "Subjects"]}
                    rows={trials.map(trial => [
                        trial.sponsor,
                        trial.subjects.length
                    ])}
                ></TableView>

                <TableView
                    headings={["Sponsor", "Subjects"]}
                    rows={trials.map(trial => [
                        trial.sponsor,
                        trial.subjects.length
                    ])}
                ></TableView>
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

const TableView = ({ headings, rows }) => (
    <Col>
        <Card>
            <Card.Body>
                <Card.Title >Active Trials: {rows.length}</Card.Title>
                {/* <div className="mb-:"/> */}
                <Table striped={true} bordered={false}>
                    <thead>
                        <tr>
                            {headings.map(h => (
                                <th key={h}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => (
                            <tr>
                                {r.map(c => (
                                    <td>{c}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
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
