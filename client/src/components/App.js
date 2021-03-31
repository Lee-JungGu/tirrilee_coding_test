import React from "react";
import { HashRouter, Route } from "react-router-dom";
import LoginPage from "./Views/LoginPage/LoginPage";
import ProductListPage from "./Views/ProductListPage/ProductListPage";
import RegisterPage from "./Views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Auth(ProductListPage, null)} />
      <Route exact path="/login" component={Auth(LoginPage, false)} />
      <Route exact path="/register" component={Auth(RegisterPage, false)} />
    </HashRouter>
  );
}

export default App;
