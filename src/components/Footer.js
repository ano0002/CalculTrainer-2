import React,{Component} from "react";

class Footer extends Component {
    render() {
        return (
            <footer>
                <div id="copyright" align="center">&copy; 2023 - {new Date().getFullYear()} www.anatole-sot.xyz</div>
            </footer>
        );
    }
}

export default Footer;