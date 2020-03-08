import React from 'react';
import axios from 'axios';
import Study from './trial';
import {Card, Button, List} from 'react-bootstrap'

let URL = "http://consentus.herokuapp.com"
URL = "http://localhost:8001"

class Trials extends React.Component {
    state = {
        trials: []
    }

    componentDidMount() {
        axios.get(URL + '/trials-for-admin?authToken=' + window.localStorage.authToken) 
        .then(res => {
            
            this.setState({
                trials: res.data
            });
       })   
    }
    
    render() {
        return (
            <div>
                <h4>Trials</h4>
                <Trial props={this.state.trials}/>  
            </div>
        )
    }
}


const Trial = (props) => {
    return (
            <Card>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    {props.props[0].trialName}
                </Card.Text>
                <Button href="google.com" variant="primary"></Button> 
            </Card.Body>
            </Card>
    )}
    else {
        return <Card>
        <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
                {"No data yet"}
            </Card.Text>
            <Button href="google.com" variant="primary">{"Nonnnne"}</Button> 
        </Card.Body>
        </Card>
    }
}

export default Trials;
