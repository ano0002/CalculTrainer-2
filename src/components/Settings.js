import React,{Component} from "react";
import Cookies from "js-cookie";
import MultiRangeSlider from "multi-range-slider-react";

import "../styles/Settings.css";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.config;
    }

    handleInput = (event) => {
        if (Cookies.get("accepted_policy")) {
            Cookies.set(event.target.name, event.target.value, { expires: 365 });
        }
        let value = event.target.value.trim();
        if (!isNaN(event.target.value.trim()) && event.target.value.trim() !== ""){
            value = parseInt(event.target.value.trim());
        }
        else if (event.target.value.trim() === "") {
            value = 1;
        }
        else {
            value = event.target.value.trim();
        }
        this.setState({ [event.target.name]: value });
        const new_state = {
            ...this.state,
            [event.target.name]: value
        }
        console.log(new_state);
        this.props.updateConfig(new_state);
        this.sendUpdate(new_state);
    }

    handleSlider1Input = (event) => {
        if (this.state.min1 !== event.minValue ||
            this.state.max1 !== event.maxValue ) {
            if (Cookies.get("accepted_policy")) {
                Cookies.set("min1", event.minValue, { expires: 365 });
                Cookies.set("max1", event.maxValue, { expires: 365 });
            }
            this.setState({ min1: event.minValue, max1: event.maxValue });

            const new_state = {
                ...this.state,
                min1: event.minValue,
                max1: event.maxValue
            }
            this.props.updateConfig(new_state);
            this.sendUpdate(new_state);

        }
    }
    handleSlider2Input = (event) => {
        if (this.state.min2 !== event.minValue ||
            this.state.max2 !== event.maxValue ) {
            if (Cookies.get("accepted_policy")) {
                Cookies.set("min2", event.minValue, { expires: 365 });
                Cookies.set("max2", event.maxValue, { expires: 365 });
            }
            this.setState({ min2: event.minValue, max2: event.maxValue });
            
            const new_state = {
                ...this.state,
                min2: event.minValue,
                max2: event.maxValue
            }
            this.props.updateConfig(new_state);
            this.sendUpdate(new_state);
        }
    }

    sendUpdate = (config) => {
        if (Cookies.get("accepted_policy")) {
            if (Cookies.get("token")) {
                fetch("https://anatole-sot.xyz/api/calcul-trainer/set-settings.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token: Cookies.get("token"),
                        settings:{
                            OperationType: config.sign,
                            Number1: config.min1 + "," + config.max1,
                            Number2: config.min2 + "," + config.max2,
                            SerieLength: config.serieLength
                        }
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

    componentDidMount() {
        setInterval(() => {
            this.sendUpdate(this.state);
        }, 5000);
    }

    render() {
        return (
            <main id="config">
                <h1>Settings</h1>
                <form>
                    <div className="sign">
                        <label htmlFor="sign">Operation Type</label>
                        <select name="sign" value={this.state.sign} id="operationType" onInput={this.handleInput}>
                            <option value="+">Addition</option>
                            <option value="-">Subtraction</option>
                            <option value="×">Multiplication</option>
                            <option value="/">Euclidian Division</option>
                        </select>
                    </div>
                    <div className="number1">
                        <label htmlFor="number1">Number 1</label>
                        <MultiRangeSlider
                            min={0}
                            max={100}
                            step={1}
                            minValue={this.state.min1}
                            maxValue={this.state.max1}
                            onInput={(e) => {
                                this.handleSlider1Input(e);
                            }}
                            ruler={false}
                            style={{
                                border:"none",
                                boxShadow:"none"
                            }}
                        />
                    </div>
                    <div className="number2">
                        <label htmlFor="number2">Number 2</label>
                        <MultiRangeSlider
                            min={0}
                            max={100}
                            step={1}
                            minValue={this.state.min2}
                            maxValue={this.state.max2}
                            onInput={(e) => {
                                this.handleSlider2Input(e);
                            }}
                            ruler={false}
                            style={{
                                border:"none",
                                boxShadow:"none"
                            }}
                        />
                    </div>
                    <div className="serieLength">
                        <label htmlFor="serieLength">Serie Length</label>
                        <input type="number" name="serieLength" value={this.state.serieLength} id="serieLength" onInput={this.handleInput} min={1}/>
                    </div>
                </form>
            </main>
        );
    }
}

export default Settings;