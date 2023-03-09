import React,{Component} from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';


class Navigation extends Component {
    render() {
        let displayItems = [];
        for (const {link,name,appearsInNav,showWhenLogged,showWhenNotLogged} of this.props.menus) {
            if (link === window.location.pathname) {
                document.title = name + " • Calcul Trainer";
            }
            if (appearsInNav) {
                if (Cookies.get("token")){
                    if (showWhenLogged) {
                        displayItems.push(<li key={name}><NavLink to={link}>{name}</NavLink></li>);
                    }
                }
                else {
                    if (showWhenNotLogged) {
                        displayItems.push(<li key={name}><NavLink to={link}>{name}</NavLink></li>);
                    }
                }
            }
        }
        return (
            <ul>
                {displayItems}
            </ul>
        );
    }
}

export default Navigation;