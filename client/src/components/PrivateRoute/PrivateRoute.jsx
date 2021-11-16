import React from "react";
import { Route, Redirect} from "react-router-dom";

function PrivateRoute({ path, Component }) {
    
  return (
   <Route exact path={path} render={()=>{
       return sessionStorage.getItem("user") ? <Component/> : <Redirect to="/login"/>
   }} />
   )
}

export default PrivateRoute;
