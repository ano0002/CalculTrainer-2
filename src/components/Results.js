import React,{Component} from "react";


class Results extends Component {
    render() {
        this.props.results.reverse();
        if (this.props.results.length === 0) {
            return (
                <div id="results">
                </div>
            )
        }
        return (
            <div id="results">
                <h1>Results</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Calcul</th>
                            <th>Your Result</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.results.map((result, index) => {
                            return (
                                <tr key={index} className={result.correct ? "correct" : "incorrect"}>
                                    <td>{result.number1+this.props.sign+result.number2+"="+result.result}</td>
                                    <td>{result.userResult}</td>
                                    <td>{result.time}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Results;