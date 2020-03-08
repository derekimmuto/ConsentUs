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
            console.log(res.data)
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
    let trialsInfo = props.props

    let items = []
    for (let trialInfo of trialsInfo) {
        items.push(
            <Card key={trialInfo._id} className="mx-4">
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    {trialInfo.trialName}
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

export default Trials;
