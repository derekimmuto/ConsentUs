import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import TopBar from "./top-bar";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import LoginForm from "./components/login";
import Patient from "./components/patient";
import Admin from "./components/admin";
import immuto from 'immuto-backend'

import homepageBackground from "./assets/homepage.png"
import homepageLogo from "./assets/homepage_logo.png"
import './css/main.css'; 

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const OurSideNav = () => {
  return (
    <SideNav style={{backgroundColor: "#1092c5"}}
      onSelect={selected => {
        // Add your code here
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
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
  );
};

const App = () => {
  const [userType, setUserType] = useState(null);

  let redirect = "/" + (userType ? userType : "");

  return (
    <Router>
      <div >
        <Switch>
          <Route exact path="/">
            <div
            style={{backgroundImage: "url(" + homepageBackground + ")", backgroundSize: "cover", height: "100vh", backgroundPosition: "center"}}>
              <img className="text-center" id="homepageLogo" src={homepageLogo} alt="Homepage Logo" onClick={() => window.location.href = "/login"}  ></img>
              <h1 id="homepageTitle" className="text-white text-center fixed-bottom">Simplifying and Securing Patient Consent</h1>
            </div>
          </Route>
          <Route path="/login">
              {() => <LoginForm setUserType={setUserType}/>}
          </Route>
          <Route path="/register">
            {() => <LoginForm setUserType={setUserType} />}
          </Route>
          <Route path="/admin">
            {() => 
              <div style={{ marginLeft: 64 }}> 
              <TopBar redirect={redirect} />
              <OurSideNav></OurSideNav>
              <Admin /></div>}
          </Route>
          <Route path="/patient">{() => <div style={{ marginLeft: 64 }}> 
            <TopBar redirect={redirect} />
            <OurSideNav></OurSideNav><Patient />
            </div>}</Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App></App>, document.getElementById("app"));
