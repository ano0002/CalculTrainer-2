import React,{Component} from "react";
import Home from "./Home"
import Cookies from "js-cookie";


import "../styles/Theme.css"



class Theme extends Component {

    constructor (props){
        super(props)
        this.theme = this.props.theme
    }

    sendUpdate = (theme) => {
        if (Cookies.get("accepted_policy")) {
            if (Cookies.get("token")) {
                fetch("https://anatole-sot.xyz/api/calcul-trainer/set-theme.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token: Cookies.get("token"),
                        theme: theme
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "failed") {
                        console.log(data);
                    }}
                )
                .catch(error => {
                    console.log(error);
                });
            }
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.theme = {
            ...this.theme,
            [name] : value
        }
        this.props.updateTheme(this.theme);
        this.sendUpdate(this.theme);
    }



    componentDidUpdate(){
        console.log()
    }

    render() {
        return (
            <main id="theme">
                <Home enabled={false}></Home>
                <section>
                    <h1>Theme</h1>
                    <div>
                        <h2>Primary Color</h2>
                        <input type="color" name="primary_color" value={this.props.theme.primary_color} onInput={this.onChange}></input>
                    </div>
                    <div>
                        <h2>Text over primary color</h2>
                        <input type="color" name="cacti_color" value={this.props.theme.cacti_color} onInput={this.onChange}></input>
                    </div>
                    <div>
                        <h2>Secondary Color</h2>
                        <input type="color" name="secondary_color" value={this.props.theme.secondary_color} onInput={this.onChange}></input>
                    </div>
                    <div>
                        <h2>Text over secondary color</h2>
                        <input type="color" name="ground_black" value={this.props.theme.ground_black} onInput={this.onChange}></input>
                    </div>
                    <div>
                        <h2>Accent Color</h2>
                        <input type="color" name="kangaroo_orange" value={this.props.theme.kangaroo_orange} onInput={this.onChange}></input>
                    </div>
                </section>
            </main>
        );
    }
}

export default Theme;