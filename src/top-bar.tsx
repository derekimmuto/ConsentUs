import React from "react";
import {
  Form,
  FormControl,
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Button,
  NavLink,
  NavItem
} from "react-bootstrap";
import im from "./components/login"

import logo from "./assets/left-logo.png"; // this is fine

const TopBar = ({ redirect }) => {
  return (
    <Navbar id='navbarTop' bg="light">
      <Navbar.Brand href={redirect}>
        <img id="navbarLogo" src={logo} alt="ConsentUs logo" height="39" className='m-0 p-0'></img>
      </Navbar.Brand>
      <NavItem id="logoutButton" className="ml-auto semi-bold"><NavLink onClick={logoutUser} className="color-primary hover-secondary">Logout</NavLink></NavItem>
    </Navbar>
  );
};

const logoutUser = () => {
    var http = new XMLHttpRequest()
    let sendstring = "authToken=" + window.localStorage.authToken
    let URL = "https://consentus.herokuapp.com"
   
    http.open("POST", URL + "/logout", true)
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 204) {
            window.localStorage.authToken = ""
            window.location.href = "/login"
        } else if (http.readyState == 4) {
            console.error("Unable to completely logout: " + http.responseText)
            window.localStorage.authToken = ""
            window.location.href = "/login"
        }
    }
    http.send(sendstring)
}

export default TopBar;
