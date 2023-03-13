import React,{Component} from "react";
import Navigation from "./Navigation";
import {NavLink} from "react-router-dom";

import "../styles/Header.css"

import logo512 from "../assets/logo512.png";

class Header extends Component {
    render() {
        return (
            <header>
                <NavLink to={this.props.menus[0].link}><img src={logo512} alt="logo" className="logo"/></NavLink>
                <Navigation menus= {this.props.menus}/>
            </header>
        );
    }
}

export default Header;