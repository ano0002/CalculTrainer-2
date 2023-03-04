import Cookies from "js-cookie";

function safe_set(name, value) {
    if (Cookies.get("accepted_policy")) {
        Cookies.set(name, value, { expires: 365 });
    }
}

const loadTheme = () => {
    const theme = Cookies.get("theme");
    if (theme) {
        document.documentElement.style.setProperty("--primary-color", theme);
    }
    else {
        document.documentElement.style.setProperty("--primary-color", "#000000");
        safe_set("theme", "#000000");
    }
}

export default loadTheme;