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
            value = 0;
        }
        else {
            value = event.target.value.trim();
        }
        this.setState({ [event.target.name]: value });
        this.props.updateConfig({
            ...this.state,
            [event.target.name]: value
        });
    }

    handleSlider1Input = (event) => {
        if (Cookies.get("accepted_policy")) {
            Cookies.set("min1", event.minValue, { expires: 365 });
            Cookies.set("max1", event.maxValue, { expires: 365 });
        }
        this.setState({ min1: event.minValue, max1: event.maxValue });
        this.props.updateConfig({
            ...this.state,
            min1: event.minValue,
            max1: event.maxValue
        });
    }
    handleSlider2Input = (event) => {
        if (Cookies.get("accepted_policy")) {
            Cookies.set("min2", event.minValue, { expires: 365 });
            Cookies.set("max2", event.maxValue, { expires: 365 });
        }
        this.setState({ min2: event.minValue, max2: event.maxValue });
        this.props.updateConfig({
            ...this.state,
            min2: event.minValue,
            max2: event.maxValue
        });
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
                        <input type="number" name="serieLength" value={this.state.serieLength} id="serieLength" onInput={this.handleInput} />
                    </div>
                </form>
            </main>
        );
    }
}

export default Settings;