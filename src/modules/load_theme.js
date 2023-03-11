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
        return value
    }
    else {
        safeSet(name, default_value);
        document.documentElement.style.setProperty(`--${name}`,default_value);
        return default_value
    }
}


const loadTheme = (token = false) => {
    var theme = {
        primary_color : "#e7f9a9",
        secondary_color : "#7d4e57",
        cacti_color : "#1a1f16",
        ground_black : "#e6e6e6",
        kangaroo_orange : "#ff3600"
    };
    if(token){
        fetch('https://www.anatole-sot.xyz/api/calcul-trainer/get-user.php?token='+token, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "success"){
                theme = data.data.theme;
            }
        })
    }
    for (var [key,default_value] of Object.entries(theme)) {
        const value = loadProperty(key,default_value);
        theme[key] = value;
    }
    return theme
}

export default loadTheme;