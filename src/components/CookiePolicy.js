import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/CookiesPolicy.css";



class CookiePolicy extends Component {
    hide = () => {
        document.getElementsByClassName("cookie-policy-container")[0].style.display = "none";
    }
    render() {
        return ( <div className = "cookie-policy-container" >
                <div id = "blur" > </div> 
                <div className = "cookie-policy" >
                    <p> This website uses cookies to ensure you get the best experience on our website. <br / >
                        <NavLink to = "/cookie-policy" onClick={this.hide}> Learn more </NavLink> 
                    </p >

                    <div className = "actions" >
                        <button onClick = { this.props.accept } > Accept </button> 
                        <button onClick = { this.props.refuse } > Refuse </button> 
                    </div > 
                </div> 
            </div>
        );
    }
}

export default CookiePolicy;