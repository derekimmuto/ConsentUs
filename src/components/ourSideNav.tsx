import React from 'react'
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

const OurSideNav = (userType) => {
  if (userType === "patient") {
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
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Dashboard</NavText>
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
              <i className="fa fa-fw fa-tachometer-alt" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
  
};

export default OurSideNav;