import React from 'react';
import {Card, Button} from 'react-bootstrap'

const Study = (props) => {
    return (
        <Card>
        <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
                {this.props.sponser}
            </Card.Text>
            <Button href="google.com" variant="primary">{this.props.documentName}</Button>
        </Card.Body>
        </Card>
    )
}

export default Study;
