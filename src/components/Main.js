import React,{Component} from "react";
import { Routes,Route } from "react-router-dom";


class Main extends Component {
    render() {
        return (
            <Routes>
                {this.props.routes.map(({link,element}) => <Route key={link} path={link} element={element} />)}
            </Routes>
        );
    }
}

export default Main;