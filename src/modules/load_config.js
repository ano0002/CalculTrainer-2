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


const loadConfig = (token = false) => {
    var min1,max1,min2,max2,serieLength,sign;
    if (token) {
        fetch('https://www.anatole-sot.xyz/api/calcul-trainer/get-user.php?token='+token, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "success"){
                data = data.data.settings;
                min1 = parseInt(loadProperty("min1", data.Number1.split(",")[0]));
                max1 = parseInt(loadProperty("max1", data.Number1.split(",")[1]));
                min2 = parseInt(loadProperty("min2", data.Number2.split(",")[0]));
                max2 = parseInt(loadProperty("max2", data.Number2.split(",")[1]));
                serieLength = parseInt(loadProperty("serieLength", data.SerieLength));
                sign = loadProperty("sign", data.sign);
            }
            else{
                console.log(data);
                min1 = parseInt(loadProperty("min1", 0));
                max1 = parseInt(loadProperty("max1", 9));
                min2 = parseInt(loadProperty("min2", 0));
                max2 = parseInt(loadProperty("max2", 9));
                serieLength = parseInt(loadProperty("serieLength", 10));
                sign = loadProperty("sign", "+");
            }
        })
    }
    else {
        min1 = parseInt(loadProperty("min1", 0));
        max1 = parseInt(loadProperty("max1", 9));
        min2 = parseInt(loadProperty("min2", 0));
        max2 = parseInt(loadProperty("max2", 9));
        serieLength = parseInt(loadProperty("serieLength", 10));
        sign = loadProperty("sign", "+");
    }
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