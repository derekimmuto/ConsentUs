import React from 'react';
import {Card, Button} from 'react-bootstrap'

const Study = (props) => {
    let studiesInfo = props.props

    let items = []
    for (let studyInfo of studiesInfo) {
        items.push(
            <Card key={studyInfo._id} className="mx-4">
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    {studyInfo.trialName}
                </Card.Text>
                <Button href="google.com" variant="primary"></Button> 
            </Card.Body>
            </Card>
        )
    }
    return (
        items
    )
}

export default Study;
