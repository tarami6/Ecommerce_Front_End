import React, { useState } from "react";
import { authenticate, isAuthenticated, signin } from "../auth";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";

const Signin = () => {
  const [values, setValues] = useState({
    email: "email",
    password: "p@ssw0rd",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button
          onClick={clickSubmit}
          className="btn btn-primary">Submit</button>
    </form>
  );

  const showError = () => (
    <div
      style={{ display: error ? "" : "none" }}
      className="alert alert-danger"
    >
      {error}
    </div>
  );

  const showLoadin = () =>
    loading && (
      <div className="alert info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to={"/admin/dashboard"} />;
      } else {
        return <Redirect to={"/user/dashboard"} />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to={"/"} />;
    }
  };

  return (
    <Layout
      title={"Sign in"}
      description={"Sign in to this ecommerce"}
      className={"container col-md-8 offset-md-2"}
    >
      {showLoadin()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
