import React,{Component} from "react";

class Theme extends Component {

    constructor (props){
        super(props)
        this.theme = this.props.theme
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.theme = {
            ...this.theme,
            [name] : value
        }
        this.props.updateTheme(this.theme);
    }

    componentDidUpdate(){
        console.log()
    }

    render() {
        return (
            <main id="theme">
                <h1>Theme</h1>
                <div>
                    <h2>Primary Color</h2>
                    <input type="color" name="primary_color" value={this.props.theme.primary_color} onInput={this.onChange}></input>
                </div>
                <div>
                    <h2>Secondary Color</h2>
                    <input type="color" name="secondary_color" value={this.props.theme.secondary_color} onInput={this.onChange}></input>
                </div>
                <div>
                    <h2>Cacti Color</h2>
                    <input type="color" name="cacti_color" value={this.props.theme.cacti_color} onInput={this.onChange}></input>
                </div>
                <div>
                    <h2>Text Color</h2>
                    <input type="color" name="ground_black" value={this.props.theme.ground_black} onInput={this.onChange}></input>
                </div>
                <div>
                    <h2>Kangaroo Color</h2>
                    <input type="color" name="kangaroo_orange" value={this.props.theme.kangaroo_orange} onInput={this.onChange}></input>
                </div>
            </main>
        );
    }
}

export default Theme;