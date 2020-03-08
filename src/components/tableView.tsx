import React from 'react'
import {Col, Card, Table} from 'react-bootstrap'

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

export default TableView