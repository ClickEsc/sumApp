import * as React from "react";
import {Router} from "@reach/router";
import {basepath} from "../helpers/helpers";
import Layout from "../components/Layout/Layout";
import Main from "../components/Main/Main";
import LoginForm from "../components/LoginForm/LoginForm";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Addition from "../components/Addition/Addition";
import '../assets/fonts/Caveat/stylesheet.css';
import '../index.css';

const IndexPage = () => {
  return (
    <Layout>
      <Router>
        <Main path={basepath} />
        <LoginForm path="/login" />
        <PrivateRoute path="/addition" component={Addition} />
      </Router>
    </Layout>
  )
}

export default IndexPage;
