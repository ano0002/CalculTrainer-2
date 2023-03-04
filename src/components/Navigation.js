import React,{Component} from "react";
import { NavLink } from "react-router-dom";



class Navigation extends Component {
    render() {
        return (
            <ul>
                {this.props.menus.map(({link,name,appearsInNav}) => appearsInNav ? <li key={name}><NavLink to={link}>{name}</NavLink></li> : '')}
            </ul>
        );
    }
}

export default Navigation;