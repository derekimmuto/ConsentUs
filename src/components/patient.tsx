// @ts-ignore

import TableView from "./tableView"
import React from 'react';
import axios from 'axios';
import {Card, Button} from 'react-bootstrap'

let URL = "http://consentus.herokuapp.com"
URL = "http://localhost:8001"

const PatientTrial = ({trials}) => {
    let PatientTrialsInfo = trials
    
    let items = PatientTrialsInfo.map(PatientTrialInfo => 
            <Card key={PatientTrialInfo._id} className="mx-4 mt-3 shadow rounded">
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    <div>Yet to consent to study.</div>
                    {JSON.stringify(PatientTrialInfo, null, 2)}
                </Card.Text>
                <Button href="/ongoing-consent" variant="primary">View Agreement Information</Button> 
            </Card.Body>
            </Card>
        )

    return (
        <>
          {items}
        </>
    )
}

class PatientTrials extends React.Component {
    state = {
        patientTrials: []
    }

    componentDidMount() {
        axios.get(URL + '/trials-for-patient?authToken=' + window.localStorage.authToken) 
        .then(res => {
            console.log(res.data)
            this.setState({
                patientTrials: res.data
            });
       })   
    }
    
    render() {
        return (
            <div>
                <h4 className="ml-4 my-3">Dashboard</h4>
                <PatientTrial trials={this.state.patientTrials}/>  
            </div>
        )
    }
}



export default PatientTrials;