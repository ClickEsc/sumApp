import * as React from "react";
import {navigate} from "gatsby";

const PrivateRoute = ({component: Component, location, ...rest }) => {
  const isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn');

  if (!isUserLoggedIn && location.pathname !== "/login" && location.pathname !== "/") {
    navigate("/login")
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute;