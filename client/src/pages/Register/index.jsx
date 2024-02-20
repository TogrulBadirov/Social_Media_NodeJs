import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.scss";
import { useState } from "react";
import backendURL from "../../config";
import axios from "axios";
const Register = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const createUser = async (values) => {
    try {
      const resp = await axios.post(`${backendURL}/user`, values);
      setStatus(resp.data);
      console.log(resp.data);
    } catch (error) {
      if (
        error.response && // Check if error.response exists
        error.response.status === 400 && // Check if status code is 400
        error.response.data && // Check if error.response.data exists
        error.response.data.error.code === 11000 // Check if code is 11000
      ) {
        // MongoDB error indicating a duplicate key violation
        console.error("Username already exists:", error);
        setError(
          "Username already exists. Please choose a different username."
        );
      } else {
        // Other errors
        console.error("Error creating user:", error);
        setError(
          "An error occurred while creating the user. Please try again later."
        );
      }
    }
  };

  return (
    <section id="Register">
      <div className="container">
        <Formik
          initialValues={{
            fullName: "",
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            fullName: Yup.string()
              .matches(
                /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                "Invalid full name"
              )
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            username: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Must be 8 characters or more")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setError(null);
              setStatus(null);
              createUser(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <div className="register-form">
            <Form>
              <h1>Sign Up Form</h1>
              {/* <label htmlFor="fullName">Full Name</label>  */}
              <Field
                placeholder="Full Name"
                className="input"
                name="fullName"
                type="text"
              />
              <div className="error">
                <ErrorMessage name="fullName" />
              </div>

              {/* <label htmlFor="username">Username</label> */}
              <Field
                placeholder="UserName"
                className="input"
                name="username"
                type="text"
              />
              <div className="error">
                <ErrorMessage name="username" />
              </div>

              {/* <label htmlFor="email">Email Address</label> */}
              <Field
                placeholder="Email"
                className="input"
                name="email"
                type="email"
              />
              <div className="error">
                <ErrorMessage name="email" />
              </div>

              {/* <label htmlFor="password">password  </label> */}
              <Field
                placeholder="Password"
                className="input"
                name="password"
                type="password"
              />
              <div className="error">
                <ErrorMessage name="password" />
              </div>
              <p className="error">{error && error}</p>
              <p className="status">{status && status}</p>
              <button className="register-btn" type="submit">
                SIGN UP
              </button>
            </Form>
          </div>
        </Formik>
      </div>
    </section>
  );
};

export default Register;
