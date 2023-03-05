import React, { Component } from "react";
import Results from "./Results";
import "../styles/Home.css"


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getlength(number) {
    return number.toString().length;
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number1: random(this.props.config.min, this.props.config.max),
            number2: random(this.props.config.min, this.props.config.max),
            sign: "×"
        };

        this.calculCount = 0;
        this.finalResults = [];
    }

    start = () => {

        document.querySelector("#home button.start").style.display = "none";

        this.newCalcul();

        this.calculCount = 0;
        this.interval = setInterval(() => {
            let timer = new Date() - this.timer;
            let time = Math.floor(timer / 1000) + "s : " + timer % 1000 + "ms";
            this.setState({ time: time }); 
            }, 1);
    }

    newCalcul = () => {
        this.setState({
            number1: random(this.props.config.min, this.props.config.max),
            number2: random(this.props.config.min, this.props.config.max)
        });
        document.querySelector("input[type=number]").value = "";
        document.querySelector("input[type=number]").focus();
        this.timer = new Date();
    }



    validateInput = (e) => {
        if (e.keyCode === 13) {
            this.submit();
        }
    }

    results = []


    submit = () => {
        if (document.querySelector("input[type=number]").value === "") {
            return;
        }
        var result = 0;
        switch (this.state.sign) {
            case "+":
                result = this.state.number1 + this.state.number2;
                break;
            case "-":
                result = this.state.number1 - this.state.number2;
                break;
            case "×":
                result = this.state.number1 * this.state.number2;
                break;
            case "/":
                result = Math.floor(this.state.number1 / this.state.number2);
                break;
            default:
                break;
        }
        const userValue = parseInt(document.querySelector("input[type=number]").value);

        let timer = new Date() - this.timer;

        let time = Math.floor(timer / 1000) + "s : " + timer % 1000 + "ms";

        this.results.push({
            number1: this.state.number1,
            number2: this.state.number2,
            result: result,
            userResult: userValue,
            correct: result === userValue,
            time: time
        });

        this.newCalcul();

        this.calculCount++;

        if (this.calculCount === parseInt(this.props.config.serieLength)) {
            console.log(this.results);
            this.finalResults = this.results;
            this.results = [];
            this.end();
        }
    }

    end = () => {
        clearInterval(this.interval);
        this.setState({ time: "0s : 0ms" });
        document.querySelector("#home button.start").style.display = "block";
    }

    render() {
        return (
            <main id="home">
                <div className="input">
                    <button className="start">
                        <div className="blur"></div>
                        <p onClick={this.start}>Start</p>
                    </button>
                    <div className="calcul" style={
                        {
                            width: (getlength(this.props.config.max) + 3) + "ch"
                        }
                    }>
                        <span className="number1">{this.state.number1}</span>
                        <span className="sign">{this.state.sign}</span>
                        <span className="number2">{this.state.number2}</span>
                    </div>
                    <input type="number" onKeyDown={this.validateInput} />
                    <span className="time">Time: {this.state.time}</span>
                    <input type="submit" value="Submit" onClick={this.submit} />
                </div>
                <Results results={this.finalResults} sign={this.state.sign} />
            </main>
        );
    }
}

export default Home;