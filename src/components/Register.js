import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css"; // Bootstrap CSS for styling
import "../App.css";
import { register } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { checkToken } from "../api/storage";

const Register = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (formData) => register(formData),
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
      <div className="App">
        <div className="login-container  d-flex align-items-center  flex-column pt-5 pb-5">
          <h3>Register your account</h3>
          <h5 className="mb-4">
            if you have an account, <NavLink to={"/Login"}>Login Here</NavLink>{" "}
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
                className="px-2 py-2 col-12  mb-3 "
                type="text"
                name="username"
                placeholder="example.com"
              />
              <Field
                className="px-2 py-2 col-12  mb-3 "
                type="password"
                name="password"
                placeholder="********"
              />
              <button type="submit" className=" btn  login-button">
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
