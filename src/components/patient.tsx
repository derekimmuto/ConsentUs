import React, {useState, useEffect} from "react"
import TableView from "./tableView"
import React from 'react';
import axios from 'axios';
import {Card, Button, List} from 'react-bootstrap'

let URL = "http://consentus.herokuapp.com"
URL = "http://localhost:8001"

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
                <PatientTrial props={this.state.patientTrials}/>  
            </div>
        )
    }
}

const PatientTrial = (props) => {
    let PatientTrialsInfo = props.props

    let items = []
    for (let PatientTrialInfo of PatientTrialsInfo) {
        items.push(
            <Card key={PatientTrialInfo._id} className="mx-4">
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    <p>Filler</p>
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

export default PatientTrials;