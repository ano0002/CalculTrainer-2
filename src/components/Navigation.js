import React,{Component} from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';


class Navigation extends Component {

    toggleMenu = () => {
        let menu = document.querySelector("nav ul");
        menu.classList.toggle("show");
    }

    hideMenu = () => {
        let menu = document.querySelector("nav ul");
        menu.classList.remove("show");
    }

    render() {
        let displayItems = [];
        for (const {link,name,appearsInNav,showWhenLogged,showWhenNotLogged} of this.props.menus) {
            if (link === window.location.pathname) {
                document.title = name + " • Calcul Trainer";
            }
            if (appearsInNav) {
                if (Cookies.get("token")){
                    if (showWhenLogged) {
                        displayItems.push(<li key={name}><NavLink onClick={this.hideMenu} to={link}>{name}</NavLink></li>);
                    }
                }
                else {
                    if (showWhenNotLogged) {
                        displayItems.push(<li key={name}><NavLink onClick={this.hideMenu} to={link}>{name}</NavLink></li>);
                    }
                }
            }
        }
        return (
            <nav>
                <i className="material-symbols-outlined" onClick={this.toggleMenu}>
                    menu
                </i>
                <ul>
                    {displayItems}
                </ul>
            </nav>
        );
    }
}

export default Navigation;