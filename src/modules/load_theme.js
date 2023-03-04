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


const loadTheme = () => {
    loadProperty("primary_color", "#7D4E57");
    loadProperty("secondary_color", "#E7F9A9");
    loadProperty("cacti_color", "#09814A");
    loadProperty("ground_black", "#1A1F16");
    loadProperty("kangaroo_orange", "#FF8600");
}

export default loadTheme;