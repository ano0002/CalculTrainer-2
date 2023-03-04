import React,{Component} from "react";
import Navigation from "./Navigation";


class Header extends Component {
    render() {
        return (
            <header>
                <h1>Calcul Trainer</h1>
                <Navigation menus= {this.props.menus}/>
            </header>
        );
    }
}

export default Header;