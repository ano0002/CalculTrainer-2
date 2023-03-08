import React, {Component} from "react";


export default class Login extends Component {

    state = {
        status: null,
        passwordHelper: null,
        confirmPasswordHelper: null
    }

    handleRegister = (e) => {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let email = document.getElementById("registerEmail").value;
        let password = document.getElementById("registerPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        if (password !== confirmPassword) {
            this.setState({confirmPasswordHelper : "Passwords Don't Match"});
            return
        }
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, email: email, password: password })
        };
        fetch('https://www.anatole-sot.xyz/api/calcul-trainer/signup.php', requestOptions)
            .then(response => response.json())
            .then(data => {
            if (data.status === "success") {
                this.setState({status: "Success"});
            } else {
                this.setState({status: "Error"});
            }})
            .catch(error => console.log(error));
    }

    registerSamePass = (e) => {
        console.log(e);
        let password = document.getElementById("registerPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        if (password !== confirmPassword) {
            this.setState({confirmPasswordHelper : "Passwords Don't Match"});
        } else {
            this.setState({confirmPasswordHelper : null});
        }
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Identifiant</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email/username"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <h1>Register</h1>
                <form onSubmit={this.handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerEmail">Email address</label>
                        <input type="email" className="form-control" id="registerEmail" aria-describedby="RegisterEmailHelp" placeholder="Enter email"/>
                        <small id="RegisterEmailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerPassword">Password</label>
                        <input type="password" className="form-control" id="registerPassword" onKeyUp={this.registerSamePass} placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" >Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" onKeyUp={this.registerSamePass} placeholder="Password"/>
                        <small id="confirmPasswordHelper">{this.state.confirmPasswordHelper}</small>
                    </div>
                    <button type="submit" className="btn btn-primary">{this.state.status ?? "Submit"}</button>
                </form>
            </div>
        );
    }

}

