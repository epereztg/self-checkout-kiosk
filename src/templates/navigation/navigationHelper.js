const NavigationHelper = {
    store: null,
    atStart: currentRoute => currentRoute == "/kioskHome",
    atEnd: currentRoute => currentRoute == "/orderCompleted",
    milk: currentRoute => this.store.milkBalance,
    prev(currentRoute) {
        if (currentRoute == "/kioskHome") {
            return "/size"
        }
        if (currentRoute == "/size") {
            return "/"
        } else if (currentRoute == "/capsule") {
            return "/size";
        } else if (currentRoute == "/milkBalance") {
            return "/capsule";
        } else if (currentRoute == "/milkType") {
            return "/milkBalance";
        } else if (currentRoute == "/milkBalance") {
            return "/capsule";
        } else if (currentRoute == "/options") {
            return "/milkBalance";
        }
        else if (currentRoute == "/checkout") {
            return "/milkBalance";
        } else if (currentRoute == "/payment") {
            return "/";
        } else if (currentRoute == "/orderCompleted") {
            return "/payment";
        } else {
            return "/";
        }
    },
    next(currentRoute) {
      if (currentRoute == "/") {
          //if (store.state.option == "Pay Later") return "/payLater"
          if (localStorage.getItem("channelOption")=="Self Checkout Kiosk") return "/kioskHome"
          else if (localStorage.getItem("channelOption")=="Ecommerce") return "/checkout"
          else return "/payment"
      }
        // if (currentRoute == "/") {
        //     return "/kioskHome";
        // }
        else if (currentRoute == "/kioskHome") {
            return "/size";
        } else if (currentRoute == "/size") {
            return "/capsule";
        } else if (currentRoute == "/capsule") {
            return "/milkBalance";
        } else if (currentRoute == "/milkBalance") {
            return "/options";
        }
        else if (currentRoute == "/options") {
            //if (store.state.option == "Pay Later") return "/payLater"
            if (localStorage.getItem("paymentOption")=="Pay Later") return "/payLater"
            else return "/payment"
        }




        else if (currentRoute == "/milkBalance") {
            return "/milkType";
        } else if (currentRoute == "/milkType") {
            return "/checkout";
        } else if (currentRoute == "/checkout") {
            return "/payment";
        } else if (currentRoute == "/payment") {
            return "/orderCompleted";
        } else {
            return "/";
        }
    }
};
