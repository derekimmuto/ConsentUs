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
  if (userType === "patient" || window.location.href.includes("patient")) {
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
              <i className="fas fa-fw fa-diagnoses" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Profile</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  } else {
    return (
      <SideNav style={{backgroundColor: "#1085b8"}}
        onSelect={selected => {
          // Add your code here
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="dashboard">
          <NavItem eventKey="dashboard">
            <NavIcon>
              <a href="/admin"><i className="fa fa-fw fa-tachometer-alt" style={{ fontSize: "1.75em" }} /></a>
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="patientData">
            <NavIcon>
            <a href="/trials"><i className="fas fa-fw fa-vials" style={{ fontSize: "1.75em" }} /></a>
            </NavIcon>
            <NavText>Trials</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
  
};

export default OurSideNav;