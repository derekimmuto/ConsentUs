import React, { useState } from "react"
import { Link, useRouteMatch, Switch, Route } from "react-router-dom"
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap"
import AddTrial from "./addTrial"

import TableView from "./tableView"

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
                    title={
                        // <div style={{ display: "inline-flex" }}>
                        <Container style={{padding: 0}}>
                            <Row>
                                <Col className="pull-left">Trials</Col>
                                <Col className="pull-right">
                                    <CellLink to="/add-trial">
                                        Add Trial
                                    </CellLink>
                                </Col>
                            </Row>
                        </Container>
                        // </div>
                    }
                    headings={["Sponsor", "Subjects"]}
                    rows={trials.map(trial => [
                        trial.sponsor,
                        trial.subjects.length
                    ])}
                ></TableView>
                <TableView
                    title="Patients:"
                    headings={["Sponsor", "Subjects"]}
                    rows={trials.map(trial => [
                        trial.sponsor,
                        trial.subjects.length
                    ])}
                ></TableView>

                <TableView
                    title="Documents:"
                    headings={["Sponsor", "Subjects"]}
                    rows={trials.map(trial => [
                        trial.sponsor,
                        trial.subjects.length
                    ])}
                ></TableView>
            </Row>
            {/* <Row>
                <Switch>
                    {[
                        {
                            end: "/add-trial",
                            Comp: () => <AddTrial></AddTrial>
                        },
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
            </Row> */}
        </Container>
    )
}

const CellLink = ({ to, children }) => (
    <Col>
        <Link to={to}>
            <Button>{children}</Button>
        </Link>
    </Col>
)

export default Admin
