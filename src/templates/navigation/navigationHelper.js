const NavigationHelper = {
    store: null,
    atStart: currentRoute => currentRoute == "/",
    atEnd: currentRoute => currentRoute == "/orderCompleted",
    prev(currentRoute) {
        if (currentRoute == "/kioskHome") {
            return "/"
        } else if (currentRoute == "/size") {
            return "/kioskHome"
        } else if (currentRoute == "/model") {
            return "/size";
        } else if (currentRoute == "/options") {
            return "/model";
        } else if (currentRoute == "/checkout") {
            return "/options";
        } else if (currentRoute == "/selectTerminal") {
            return "/options";
        } else if (currentRoute == "/payment") {
            return "/";
        } else if (currentRoute == "/orderCompleted") {
            return "/";
        } else {
            return "/";
        }
    },
    next(currentRoute) {
        if (currentRoute == "/") {
            if (localStorage.getItem("channelOption") == "Self Checkout Kiosk") return "/kioskHome"
            else if (localStorage.getItem("channelOption") == "Ecommerce") return "/checkout"
            else return "/selectTerminal"
        } else if (currentRoute == "/kioskHome") {
            return "/size";
        } else if (currentRoute == "/size") {
            return "/model";
        } else if (currentRoute == "/model") {
            return "/options";
        } else if (currentRoute == "/options") {
            if (localStorage.getItem("paymentOption") == "paylater") return "/checkout"
            else return "/selectTerminal"
        } else if (currentRoute == "/selectTerminal") {
            return "/payment";
        } else if (currentRoute == "/checkout") {
            return "/";
        } else if (currentRoute == "/payment") {
            return "/orderCompleted";
        } else {
            return "/";
        }
    }
};
