import React,{Component} from "react";
import Cookies from "js-cookie";

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
        else {
            value = event.target.value.trim();
        }
        this.setState({ [event.target.name]: value });
        const name = "this.state."+event.target.name+" = value";
        eval(name);
        this.props.updateConfig(this.state);
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
                    <div className="min">
                        <label htmlFor="min">Minimum Number</label>
                        <input type="number" name="min" value={this.state.min} id="min" onInput={this.handleInput} />
                    </div>
                    <div className="max">
                        <label htmlFor="max">Maximum Number</label>
                        <input type="number" name="max" value={this.state.max} id="max" onInput={this.handleInput} />
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