import React from 'react'
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

let URL = "http://consentus.herokuapp.com"


const OurSideNav = (userType) => {
  if (window.localStorage.userType === "patient") {
    return (
      <SideNav style={{backgroundColor: "#006195"}}
        onSelect={selected => {
          // Add your code here
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="dashboard">
          <NavItem eventKey="dashboard">
            <NavIcon>
              <i className="fa fa-fw fa-tachometer-alt" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="profile">
            <NavIcon>
            <a href="/patient"><i className="fas fa-fw fa-diagnoses" style={{ fontSize: "1.75em" }} /></a>
            </NavIcon>
            <NavText>Trials</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  } else {
    let page = window.location.href.split('/').pop()
    let selectedLookup = {
      "admin": "dashboard",
      "patient": "dashboard",
      "trials": "trials"
    }
    let selected = selectedLookup[page]
    return (
      <SideNav style={{backgroundColor: "#1085b8"}}
        onSelect={selected => {
          // Add your code here
        }}
      > 
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected={selected}>
          <NavItem eventKey="dashboard">
            <NavIcon>
              <a href="/admin"><i className="fa fa-fw fa-tachometer-alt" style={{ fontSize: "1.75em" }} /></a>
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="trials">
            <NavIcon>
            <a href="/trials"><i className="fas fa-fw fa-vials" style={{ fontSize: "1.75em" }} /></a>
            </NavIcon>
            <NavText>Trials</NavText>
          </NavItem>
          <NavItem eventKey="patient-viewer">
            <NavIcon>
            <a href="/patient-viewer"><i className="fas fa-fw fa-users" style={{ fontSize: "1.75em" }} /></a>
            </NavIcon>
            <NavText>Patients</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
  
};

export default OurSideNav;