import Cookies from "js-cookie";

function safeSet(name, value) {
    if (Cookies.get("accepted_policy")) {
        Cookies.set(name, value, { expires: 365 });
    }
}

function loadProperty(name, default_value) {
    const value = Cookies.get(name);
    if (value) {
        document.documentElement.style.setProperty(`--${name}`, value);
    }
    else {
        safeSet(name, default_value);
        document.documentElement.style.setProperty(`--${name}`,default_value);
    }
}


const loadTheme = (token = false) => {
    if(token){
        fetch('https://www.anatole-sot.xyz/api/calcul-trainer/get-user.php?token='+token, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "success"){
                data = data.data;
                console.log(data);
                loadProperty("primary_color", data.theme.primary_color);
                loadProperty("secondary_color", data.theme.secondary_color);
                loadProperty("cacti_color", data.theme.cacti_color);
                loadProperty("ground_black", data.theme.ground_black);
                loadProperty("kangaroo_orange", data.theme.kangaroo_orange);
            }
            else{
                loadProperty("primary_color", "#7D4E57");
                loadProperty("secondary_color", "#E7F9A9");
                loadProperty("cacti_color", "#09814A");
                loadProperty("ground_black", "#1A1F16");
                loadProperty("kangaroo_orange", "#FF8600");
            }
        })
    }   
    else{
        loadProperty("primary_color", "#7D4E57");
        loadProperty("secondary_color", "#E7F9A9");
        loadProperty("cacti_color", "#09814A");
        loadProperty("ground_black", "#1A1F16");
        loadProperty("kangaroo_orange", "#FF8600");
    }
}

export default loadTheme;