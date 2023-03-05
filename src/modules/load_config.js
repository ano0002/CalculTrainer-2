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
    const min = parseInt(loadProperty("min", 0));
    const max = parseInt(loadProperty("max", 9));
    const serieLength = parseInt(loadProperty("serieLength", 10));
    const sign = loadProperty("sign", "+");
    return {
        min : min,
        max : max,
        serieLength : serieLength,
        sign : sign
    }
}

export default loadConfig;