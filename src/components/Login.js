import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login(props) {

    const navigate = useNavigate();

    const [registerStatus, setRegisterStatus] = React.useState(null);
    const [loginStatus, setLoginStatus] = React.useState(null);
    const [confirmPasswordHelper, setConfirmPasswordHelper] = React.useState(null);


    const handleRegister = (e) => {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let email = document.getElementById("registerEmail").value;
        let password = document.getElementById("registerPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        if (password !== confirmPassword) {
            setConfirmPasswordHelper("Passwords Don't Match");
            return
        }
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, email: email, password: password })
        };
        setRegisterStatus("Loading");
        fetch('https://www.anatole-sot.xyz/api/calcul-trainer/signup.php', requestOptions)
            .then(response => response.json())
            .then(data => {
            if (data.status === "success") {
                setRegisterStatus("Success");
                for (let element of document.querySelectorAll("#registerForm input")) {
                    element.value = "";
                };
            } else {
                setRegisterStatus("Error");
                setTimeout(() => {
                    setRegisterStatus(null);
                }, 3000);
            }})
            .catch(error => console.log(error));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password: password })
        };
        setLoginStatus("Loading");
        fetch('https://www.anatole-sot.xyz/api/calcul-trainer/login.php', requestOptions)
            .then(response => response.json())
            .then(data => {
            if (data.status === "success") {
                setLoginStatus("Success");
                data = data.data;
                Cookies.set("token", data.token, { expires: 365 });
                const requestOptions = {
                    method: 'GET'};
                fetch('https://www.anatole-sot.xyz/api/calcul-trainer/get-user.php?token=' + data.token, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                    if (data.status === "success") {
                        data = data.data;
                        Cookies.set("primary_color", data.theme.primary_color, { expires: 365 });
                        Cookies.set("secondary_color", data.theme.secondary_color, { expires: 365 });
                        Cookies.set("kangarro_orange", data.theme.kangarro_orange, { expires: 365 });
                        Cookies.set("cacti_color", data.theme.cacti_color, { expires: 365 });
                        Cookies.set("ground_black", data.theme.ground_black, { expires: 365 });
                        Cookies.set("sign",data.settings.OperationType,{expires:365});
                        Cookies.set("min1",data.settings.Number1.split(",")[0],{expires:365});
                        Cookies.set("max1",data.settings.Number1.split(",")[1],{expires:365});
                        Cookies.set("min2",data.settings.Number2.split(",")[0],{expires:365});
                        Cookies.set("max2",data.settings.Number2.split(",")[1],{expires:365});
                        Cookies.set("serieLength",data.settings.SerieLength,{expires:365});
                        const [min1,max1] = data.settings.Number1.split(",");
                        const [min2,max2] = data.settings.Number2.split(",");
                        const serieLength = data.settings.SerieLength;
                        props.updateConfig({
                            ...props.config,
                            sign: data.settings.OperationType,
                            min1: min1,
                            max1: max1,
                            min2: min2,
                            max2: max2,
                            serieLength: serieLength
                        });
                        props.updateTheme({
                            primary_color: data.theme.primary_color,
                            secondary_color: data.theme.secondary_color,
                            kangarro_orange: data.theme.kangarro_orange,
                            cacti_color: data.theme.cacti_color,
                            ground_black: data.theme.ground_black
                        });
                        navigate("/projets/calcul-trainer2/");
                    } else {
                        setLoginStatus("Error");
                        setTimeout(() => {
                            setLoginStatus(null);
                        }, 3000);
                    }})
                    .catch(error => console.log(error));

            } else {
                setLoginStatus("Error");
                setTimeout(() => {
                    setLoginStatus(null);
                }, 3000);
            }})
            .catch(error => console.log(error));
    }


    const registerSamePass = (e) => {
        let password = document.getElementById("registerPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        if (password !== confirmPassword) {
            setConfirmPasswordHelper("Passwords Don't Match");
        } else {
            setConfirmPasswordHelper(null);
        }
    }
    
    if (Cookies.get("accepted_policy")){
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={handleLogin} id="loginForm">
                    <div className="form-group">
                        <label htmlFor="email">Identifiant</label>
                        <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email/username"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <button type="submit" className={"loginBtn "+(loginStatus ?? "")} disabled={loginStatus ? "disabled" : ""} >{loginStatus ?? "Submit"}</button>
                </form>
                <h1>Register</h1>
                <form onSubmit={handleRegister} id="registerForm">
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
                        <input type="password" className="form-control" id="registerPassword" onKeyUp={registerSamePass} placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" >Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" onKeyUp={registerSamePass} placeholder="Password"/>
                        <small id="confirmPasswordHelper">{confirmPasswordHelper}</small>
                    </div>
                    <button type="submit" className={"registerBtn "+(registerStatus ?? "")} disabled={registerStatus ? "disabled" : ""} >{registerStatus ?? "Submit"}</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="Login">
                <h1>Login/Register is only available if you accept our cookie policy</h1>
                <button onClick={() => {
                    Cookies.set("accepted_policy",true,{expires:365});
                    window.location.reload();
                }}>Accept</button>
            </div>
        );
    }
}

