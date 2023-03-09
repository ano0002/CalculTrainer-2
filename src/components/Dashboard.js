import React from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function Dashboard(props) {
    
    const navigate = useNavigate();

    function logout() {
        Cookies.remove("token");
        navigate("/login");
        window.location.reload();
    }

    return (
        <main>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </main>
    );
    
}

export default Dashboard;