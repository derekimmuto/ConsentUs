import React, {useState, useEffect} from "react"
import TableView from "./tableView"

const joe = [
    "Consent form 1",
    "Heartbeat Study",
    "Pending",
    "google.com"
]

const ally = [
    "Consent form 2",
    "Blood Pressure Study",
    "Complete",
    "google.com"
]

const mark = [
    "Consent form 3",
    "Movement Study",
    "Complete",
    "google.com"
] 


function make_link(state, link) {
    return state == 'Complete'
        ? <a href={link} style={{color:'#1a237e'}}>{state}</a>
        : <a href={link} style={{color:'#2196f3'}}>{state}</a>
}

const rows = [joe, ally, mark].map(
    ([a, b, c, d]) => [a, b, make_link(c, d)])

const Patient = () => {
    const [patients, setPatients] = useState([joe, ally, mark]);
    const cols = ["Name", "Study", "Status"]

    return (
        
        <div className="mt-3">
            <TableView title={"Studies:"} rows={rows} headings={cols}/>
        </div>
    );
}

export default Patient;

