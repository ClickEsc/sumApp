import * as React from "react";
import {navigate} from "gatsby";
import {isBrowser} from "../../helpers/helpers";

const PrivateRoute = ({component: Component, location, ...rest }) => {
  const isUserLoggedIn = isBrowser ? sessionStorage.getItem('isUserLoggedIn') : true;

  if (!isUserLoggedIn && location.pathname !== "/login" && location.pathname !== "/") {
    navigate("/login")
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute;