import React,{Component} from "react";
import "../styles/Home.css"

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Home extends Component {
    state = {
        number1: 0,
        number2: 0,
        sign: "+",
        displaySign: "+"
    };

    validateInput = (e) => {
        if (e.keyCode === 13) {
            this.submit();
        }
    }

    submit = () => {
        this.setState({
            number1: random(this.props.min, this.props.max),
            number2: random(this.props.min, this.props.max)
        });
    }

    render() {
        return (
            <main>
                <div className="calcul">
                    <span className="number1">{this.state.number1}</span>
                    <span className="sign">{this.state.displaySign}</span>
                    <span className="number2">{this.state.number2}</span>
                </div>
                <input type="number" onKeyDown={this.validateInput} />
                <input type="submit" value="Submit" onClick={this.submit} />
            </main>
        );
    }
}

export default Home;