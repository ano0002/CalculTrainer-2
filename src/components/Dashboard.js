import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

import "../styles/Dashboard.css"

let sum = (...para) => para.reduce((d,b) => d + b,0);

let loginPage = "/projets/calcul-trainer2/login";

function Dashboard(props) {
    
    const navigate = useNavigate();

    const [user, setUser] = useState("-----");
    const [email, setEmail] = useState("-----");
    const [series, setSeries] = useState([]);

    const [sentRequest, setSentRequest] = useState(false);


    function logout() {
        Cookies.remove("token");
        navigate(loginPage);
        window.location.reload();
    }

    useEffect(() => {
        if (sentRequest) return;
        setSentRequest(true);
        fetch("https://anatole-sot.xyz/api/calcul-trainer/get-series.php?token="+Cookies.get("token"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status !== "success") {
                navigate("/projets/calcul-trainer2/login");
            } else {
                const user = data.data.user
                setUser(user.username);
                setEmail(user.email);
                setSeries(data.data.series);
            }
        })
        .catch(error => {
            console.log(error);
        }
        );
    }, [sentRequest, navigate]);

    function showMore(e) {
        fetch("https://anatole-sot.xyz/api/calcul-trainer/get-series.php?token="+Cookies.get("token"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status !== "success") {
                navigate(loginPage);
            } else {
                let button = e.target.nodeName === "I" ? e.target.parentElement : e.target;
                const cell = button.parentElement;
                const line = cell.parentElement;
                const id = line.getAttribute("data-id");
                const serie = data.data.series[id];
                const calculs = JSON.parse(serie.Calculs);
                const percent = Math.round(sum(...calculs.map(calcul => calcul.correct)) / calculs.length * 100);
                const date = new Date(serie.Moment.replace(/-/g, "/"));
                const table = line.parentElement;
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                td.setAttribute("colspan", "4");    
                td.innerHTML = `
                    <div class="serie">
                        <div class="serie__header">
                            <h3>Série réalisée le ${date.toLocaleDateString()} à ${date.toLocaleTimeString()}</h3>
                            <h3>${percent}%</h3>
                        </div>
                        <div class="serie__body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Calcul</th>
                                        <th>Réponse</th>
                                        <th>Résultat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${calculs.map(calcul => {
                                        return `
                                            <tr>
                                                <td>${calcul.calcul}</td>
                                                <td>${calcul.correct? calcul.result:"<span class='incorrect'>"+calcul.userResult+"</span>"+calcul.result}</td>
                                                <td>${calcul.correct ? "Correct" : "Incorrect"}</td>
                                            </tr>
                                        `;
                                    }).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
                tr.appendChild(td);
                table.insertBefore(tr, line.nextSibling);
                cell.removeChild(button);
                button = document.createElement("button");
                button.addEventListener("click", hideMore);
                button.innerHTML = `
                <i class="material-symbols-outlined">
                    -
                </i>
                `;
                cell.appendChild(button);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function hideMore(e) {
        let button = e.target.nodeName === "I" ? e.target.parentElement : e.target;
        const cell = button.parentElement;
        const line = cell.parentElement;
        const table = line.parentElement;
        const tr = line.nextSibling;
        table.removeChild(tr);
        cell.removeChild(button);
        button = document.createElement("button");
        button.addEventListener("click", showMore);
        button.innerHTML = `
        <i class="material-symbols-outlined">
            +
        </i>
        `;
        cell.appendChild(button);
    }

    return (
        <main id="dashboard">
            <h1>Dashboard</h1>
            <h2>Bienvenue {user}
                <span> ({email})</span>
            </h2>
            <button onClick={logout}>Logout</button>
            <h2>Mes séries</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Voir Plus</th>
                        <th>Rejouer</th>
                    </tr>
                </thead>
                <tbody>
                    {series.map((serie, index) => {
                        const calculs = JSON.parse(serie.Calculs);
                        const percent = Math.round(sum(...calculs.map(calcul => calcul.correct)) / calculs.length * 100);
                        const date = new Date(serie.Moment.replace(/-/g, "/"));
                        return (
                            <tr key={index} data-id={index}>
                                <td>Série réalisée le {date.toLocaleDateString()} à {date.toLocaleTimeString()}</td>
                                <td>{percent}%</td>
                                <td>
                                    <button onClick={showMore}>
                                    <i className="material-symbols-outlined">
                                    +
                                    </i>
                                    </button>
                                </td>
                                <td>
                                    <button>
                                    <i className="material-symbols-outlined">
                                    replay
                                    </i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </main>
    );
    
}

export default Dashboard;