import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";

import "../App.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { checkToken } from "../api/storage";

const Login = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (formData) => login(formData),
    onSuccess: () => navigate("/"),
    onError: (res) => alert(res.response.data),
  });

  const handleSubmit = (values) => {
    mutation.mutate({
      username: values.username,
      password: values.password,
    });
  };

  useEffect(() => {
    if (checkToken()) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="App">
          <div className="login-container d-flex align-items-center  flex-column pt-5 pb-5">
            <h3>Log in to your account</h3>
            <h5 className="mb-4">
              if you don't have an account,{" "}
              <NavLink to={"/register"}>Register here</NavLink>{" "}
            </h5>
            <Formik
              className="container "
              initialValues={{ username: "", password: "" }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form className="row m-2">
                <Field
                  className="py-2 col-12 mb-3 "
                  type="text"
                  name="username"
                  placeholder="example.com"
                />
                <Field
                  className="py-2 col-12  mb-3 "
                  type="password"
                  name="password"
                  placeholder="********"
                />
                <button type="submit" className=" btn login-button">
                  Log in
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
