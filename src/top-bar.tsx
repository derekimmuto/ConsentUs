import React from "react";
import {
  Form,
  FormControl,
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Button
} from "react-bootstrap";

import logo from "./assets/left-logo.png"; // this is fine

const TopBar = ({ redirect }) => {
  console.log(redirect);
  return (
    <Navbar className="" bg="light">
      <Navbar.Brand href={redirect}>
        <img src={logo} alt="ConsentUs logo" height="39" className='m-0 p-0'></img>
      </Navbar.Brand>
    </Navbar>
  );
};

export default TopBar;
