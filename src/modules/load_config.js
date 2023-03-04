import Cookies from "js-cookie";

function safeSet(name, value) {
    if (Cookies.get("accepted_policy")) {
        Cookies.set(name, value, { expires: 365 });
    }
}

function loadProperty(name, default_value) {
    const value = Cookies.get(name);
    if (value) {
        window.name = value;
    }
    else {
        safeSet(name, default_value);
        window.name = default_value;
    }
}


const loadConfig = () => {
    loadProperty("min", 0);
    loadProperty("max", 10);
}

export default loadTheme;