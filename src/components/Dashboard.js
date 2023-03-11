import React from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function Dashboard(props) {
    
    const navigate = useNavigate();

    [user, setUser] = useState(null);


    function logout() {
        Cookies.remove("token");
        navigate("/projets/calcul-trainer2/login");
        window.location.reload();
    }

    return (
        <main>
            <h1>Dashboard</h1>
            <h2>Bienvenue {user}</h2>

            <button onClick={logout}>Logout</button>
        </main>
    );
    
}

export default Dashboard;