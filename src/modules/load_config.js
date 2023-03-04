import Cookies from "js-cookie";

function safeSet(name, value) {
    if (Cookies.get("accepted_policy")) {
        Cookies.set(name, value, { expires: 365 });
    }
}

function loadProperty(name, default_value) {
    const value = Cookies.get(name);
    if (value) {
        return value;
    }
    else {
        safeSet(name, default_value);
        return default_value;
    }
}


const loadConfig = () => {
    const min = loadProperty("min", 0);
    const max = loadProperty("max", 9);
    return {
        min : min,
        max : max
    }
}

export default loadConfig;