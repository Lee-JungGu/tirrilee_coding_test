import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  const dispatch = useDispatch();

  const AutenticationCheck = (props) => {
    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth)
          return option && props.history.push("/login");
        if (adminRoute && !response.payload.isAdmin)
          return props.history.push("/");
        option === false && props.history.push("/");
      });
    });
    return <SpecificComponent />;
  };

  return AutenticationCheck;
}
