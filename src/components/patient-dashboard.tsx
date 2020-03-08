import React from 'react';
import axios from 'axios';
import Study from 'study';


class PatientDashboard extends React.Component {
    state = {
        studies: []
    }
    
    componentDidMount() {
        axios.get('http://google.com') //API CALL TO DATABASE
        .then(res => {
            this.setState({
                studies: res.data
            });
       })   
    }
    
    render() {
        return (
            <div>
                <h2>Clients</h2>
                <Study data={this.state.studies}/>
                
            </div>
        )
    }
}
export default PatientDashboard;
