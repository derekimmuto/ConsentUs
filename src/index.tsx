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
import AddTrial from "./components/addTrial"
import OngoingConsent from "./components/ongoingConsent"
import OurSideNav from "./components/ourSideNav"
import RevokeConsent from "./components/revokeConsent"
import ConfirmConsentGivent from "./components/confirmConsentGiven"
import immuto from "immuto-backend"

import homepageBackground from "./assets/homepage.png"
import homepageLogo from "./assets/homepage_logo.png"
<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
</style>
import "./css/main.css"

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css"

const App = () => {
    const [userType, setUserType] = useState(null)

    let redirect = "/" + (userType ? userType : "")

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <div
                            style={{
                                backgroundImage:
                                    "url(" + homepageBackground + ")",
                                backgroundSize: "cover",
                                height: "100vh",
                                backgroundPosition: "center"
                            }}
                        >
                            <img
                                className="text-center"
                                id="homepageLogo"
                                src={homepageLogo}
                                alt="Homepage Logo"
                                onClick={() =>
                                    (window.location.href = "/login")
                                }
                            ></img>
                            <h1
                                id="homepageTitle"
                                className="text-white logo-font text-center fixed-bottom"
                            >
                                Simplifying and Securing Patient Consent
                            </h1>
                        </div>
                    </Route>
                    <Route exact path="/login">
                        {() => <LoginForm setUserType={setUserType} />}
                    </Route>
                    <Route exact path="/register">
                        {() => <LoginForm setUserType={setUserType} />}
                    </Route>
                    <Route exact path="/admin">
                        {() => (
                            <div style={{ marginLeft: 64 }}>
                                <TopBar redirect={redirect} />
                                <OurSideNav userType={userType}></OurSideNav>
                                <Admin />
                            </div>
                        )}
                    </Route>
                    <Route exact path="/patient">
                        {() => (
                            <div style={{ marginLeft: 64 }}>
                                <TopBar redirect={redirect} />
                                <OurSideNav userType={userType}></OurSideNav>
                                <Patient />
                            </div>
                        )}
                    </Route>

                    <Route exact path="/revoke-consent">
                        {() => <RevokeConsent studyName={"MyStudy"} />}
                    </Route>
                    <Route exact path="/confirm-consent">
                        {() => <ConfirmConsentGivent studyName={"MyStudy"} />}
                    </Route>
                    <Route exact path="/ongoing-consent">
                        {() => <OngoingConsent studyName={"MyStudy"} />}
                    </Route>
                    <Route exact path="/admin/add-new-trial">
                        {() => <div style={{ marginLeft: 64 }}>
                            <TopBar redirect={redirect} />
                            <OurSideNav> userType={userType}></OurSideNav>
                            <AddTrial />
                        </div>} 
                    </Route>
                    <Route exact path="/admin/add-patients">
                        {() => <div style={{marginLeft: 64}}>
                            <TopBar redirect={redirect} />
                            <OurSideNav> userType={userType}></OurSideNav>
                            {/* <AddPatients /> */}
                        </div> 
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
-ReactDOM.render(<App></App>, document.getElementById("app"))