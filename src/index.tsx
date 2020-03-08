import React from "react"
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import SideBar from './sidebar'

const App = () => {
    return (
        // <p>hi</p>
        <SideBar></SideBar>
    )
}

    
ReactDOM.render(<App></App>, document.getElementById("app"))
