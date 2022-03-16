import React, {useState, useEffect} from "react";
import {navigate} from "gatsby";
import {isBrowser} from "../../helpers/helpers";

const PrivateRoute = ({component: Component, location, ...rest }) => {
  const [isContentAvailable, setIsContentAvailable] = useState(false);

  useEffect(() => {
    if (isBrowser) {
      const isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn');
      if (!isUserLoggedIn && location.pathname !== "/login" && location.pathname !== "/") {
        navigate("/login")
        // return null
      } else {
        setIsContentAvailable(true);
      }
    }
  }, []);

  return (
    <>
      {isContentAvailable && <Component {...rest} />}
    </>
  )
}

export default PrivateRoute;