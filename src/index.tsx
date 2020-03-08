import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import TopBar from "./top-bar"
import "bootstrap/dist/css/bootstrap.min.css"
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText
} from "@trendmicro/react-sidenav"
import Login from './components/login'
import Patient from './components/patient'
import Admin from './components/admin'

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css"

const OurSideNav = () => {
    return ( <SideNav
                onSelect={selected => {
                    // Add your code here
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i
                                className="fa fa-fw fa-home"
                                style={{ fontSize: "1.75em" }}
                            />
                        </NavIcon>
                        <NavText>Home</NavText>
                    </NavItem>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i
                                className="fa fa-fw fa-line-chart"
                                style={{ fontSize: "1.75em" }}
                            />
                        </NavIcon>
                        <NavText>Charts</NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>Line Chart</NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>Bar Chart</NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
)}

const App = () => {
    return (
        <Router>
            <OurSideNav></OurSideNav>
            <TopBar/>
            <Switch>
                <Route path="/"></Route>
                <Route path="/login">{() => <Login/>}</Route>
                <Route path="/admin">
                    {() => <Admin/>}
                </Route>
                <Route path="/patient">
                    {() => <Patient/> }
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App></App>, document.getElementById("app"))
