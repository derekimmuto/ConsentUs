import React from 'react';
import {Card, Button, List} from 'react-bootstrap'

const Study = (props) => {
    if (props && props.props.length) {
        console.log("Second pass")
    return (
            <Card>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    {props.props[0].trialName}
                </Card.Text>
                <Button href="google.com" variant="primary">{props.props[0].sponsor}</Button> 
            </Card.Body>
            </Card>
    )}
    else {
        return <Card>
        <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
                {"Coming soon"}
            </Card.Text>
            <Button href="google.com" variant="primary">{"To a clinical trial near you"}</Button> 
        </Card.Body>
        </Card>
    }
}

export default Study;
