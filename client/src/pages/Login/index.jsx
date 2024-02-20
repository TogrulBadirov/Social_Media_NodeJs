import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.scss";
import { useContext, useEffect, useState } from "react";
import backendURL from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const { userToken, setUserToken, user } = useContext(UserContext);

  const loginUser = async (values) => {
    try {
      const resp = await axios.post(`${backendURL}/user/login`, values);
      setStatus(resp.data.message);
      setUserToken(resp.data.token)
      console.log(userToken);
      setTimeout(() => {
        navigate("/")
      }, 1000);
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
        console.error("Error login user:", error);
        setError(
          error.response.data.error
        );
      }
    }
  };


  const navigate = useNavigate();
    useEffect(() => {
        // userToken ? "" : navigate("/profile")
    }, [])
  

  return (
    <section id="Login">
      <div className="container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
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
              loginUser(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <div className="register-form">
            <Form>
              <h1>Login Form</h1>
         

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
                LOGIN
              </button>
            </Form>
          </div>
        </Formik>
      </div>
    </section>
  )
}

export default Login