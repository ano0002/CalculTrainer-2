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
    const min1 = parseInt(loadProperty("min1", 0));
    const max1 = parseInt(loadProperty("max1", 9));
    const min2 = parseInt(loadProperty("min2", 0));
    const max2 = parseInt(loadProperty("max2", 9));
    const serieLength = parseInt(loadProperty("serieLength", 10));
    const sign = loadProperty("sign", "+");
    return {
        min1 : min1,
        max1 : max1,
        min2 : min2,
        max2 : max2,
        serieLength : serieLength,
        sign : sign
    }
}

export default loadConfig;