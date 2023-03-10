import React, { Component } from "react";
import Results from "./Results";
import "../styles/Home.css"
import LineChart from "./Line";


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getlength(number) {
    return number.toString().length;
}

class Home extends Component {
    constructor(props) {
        super(props);

        if (props.enabled){
            this.state = {
                number1: random(this.props.config.min1, this.props.config.max1),
                number2: random(this.props.config.min2, this.props.config.max2),
                sign: this.props.config.sign,
            };
        }
        else{
            this.state = {
                number1 : 12,
                number2 : 34,
                sign : "+"
            }
        }
        this.calculCount = 0;
        this.finalResults = [];
    }

    start = () => {
        if (this.props.enabled === false){
            return;
        }

        document.querySelector("#home button.start").style.display = "none";
        document.querySelector("input[type=number]").disabled = false;

        this.newCalcul();

        this.calculCount = 0;
        this.interval = setInterval(() => {
            let timer = new Date() - this.timer;
            let time = Math.floor(timer / 1000) + ":" + (timer % 1000).toString().padStart(3,"0");
            this.setState({ time: time }); 
            }, 1);
    }

    newCalcul = () => {
        this.setState({
            number1: random(this.props.config.min1, this.props.config.max1),
            number2: random(this.props.config.min2, this.props.config.max2)
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

        let time = Math.floor(timer / 1000) + ":" + timer % 1000;

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

        if (this.calculCount === this.props.config.serieLength) {
            this.finalResults = this.results;
            this.results = [];
            this.end();
        }
    }

    end = () => {
        clearInterval(this.interval);
        this.setState({ time: "0:000" });
        document.querySelector("#home button.start").style.display = "block";
        document.querySelector("#home button.start").focus();
        document.querySelector("input[type=number]").disabled = true;
    }

    render() {
        return (
            <main id="home">
                <div className="input" style={
                        {
                            width: (Math.max(getlength(this.state.number1),getlength(this.state.number2))**1.5 + 3) + "ch"
                        }
                    }>
                    <button className="start">
                        <div className="blur"></div>
                        <p onClick={this.start}>Start</p>
                    </button>
                    <div className="calcul">
                        <span className="number1">{this.state.number1}</span>
                        <span className="sign">{this.state.sign}</span>
                        <span className="number2">{this.state.number2}</span>
                    </div>
                    <input type="number" onKeyDown={this.validateInput} disabled/>
                    <span className="time">{this.state.time}</span>
                    <button onClick={this.submit} >Submit</button>
                </div>
                <div className="data">
                    <Results results={this.finalResults} sign={this.state.sign} />
                    <div className="chart">
                        <LineChart results={this.finalResults} sign={this.state.sign}/>
                    </div>
                </div>
            </main>
        );
    }
}

export default Home;