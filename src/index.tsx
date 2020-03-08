import React, { useState } from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom"
import TopBar from "./top-bar"
import "bootstrap/dist/css/bootstrap.min.css"
import LoginForm from "./components/login"
import Patient from "./components/patient"
import Admin from "./components/admin"
import OngoingConsent from "./components/ongoingConsent"
import OurSideNav from "./components/ourSideNav"
import RevokeConsent from "./components/revokeConsent"
import ConfirmConsentGivent from "./components/confirmConsentGiven"
import immuto from "immuto-backend"

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css"

const App = () => {
    const [userType, setUserType] = useState(null)

    let redirect = "/" + (userType ? userType : "")

    return (
        <Router>
            <OurSideNav></OurSideNav>
            <div style={{ marginLeft: 64 }}>
                <TopBar redirect={redirect} />
                <Switch>
                    <Route exact path="/">
                        <p>default</p>
                        <Link to="/login">
                            <button>hi</button>{" "}
                        </Link>
                    </Route>
                    <Route path="/login">
                        {() => <LoginForm setUserType={setUserType} />}
                    </Route>
                    <Route path="/register">
                        {() => <LoginForm setUserType={setUserType} />}
                    </Route>
                    <Route path="/admin">{() => <Admin />}</Route>
                    <Route path="/patient">{() => <Patient />}</Route>
                    <Route path="/revoke-consent">{() => <RevokeConsent studyName={"MyStudy"}/>}</Route>
                    <Route path="/confirm-consent">{() => <ConfirmConsentGivent studyName={"MyStudy"}/>}</Route>
                    <Route path="/ongoing-consent">
                        {() => <OngoingConsent studyName={"MyStudy"} />}
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

ReactDOM.render(<App></App>, document.getElementById("app"))
