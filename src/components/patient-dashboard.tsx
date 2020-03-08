import React from 'react';
import axios from 'axios';
import Study from './study';

let URL = "http://consentus.herokuapp.com"
URL = "http://localhost:8001"

class PatientDashboard extends React.Component {
    state = {
        studies: []
    }

    componentDidMount() {
        axios.get(URL + '/trials-for-patient?authToken=' + window.localStorage.authToken) 
        .then(res => {
                this.setState({
                studies: res.data
            });
       })   
    }
    
    render() {
        return (
            <div>
                <h4>Studies</h4>
                <Study props={this.state.studies}/>  
            </div>
        )
    }
}
export default PatientDashboard;
