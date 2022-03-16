import * as React from "react";
import {Router} from "@reach/router";
import {basepath} from "../helpers/helpers";
import Layout from "../components/Layout/Layout";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Addition from "../components/Addition/Addition";

const AdditionPage = () => {
  return (
    <Layout>
      <Router basepath={basepath}>
          <PrivateRoute path="/addition" component={Addition} />
      </Router>
    </Layout>
  )
}

export default AdditionPage;