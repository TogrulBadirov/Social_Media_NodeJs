import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import backendURL from "../../config";
import "./index.scss";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function NewPost() {
  const { userToken } = useContext(UserContext);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  return (
    <section id="createPost">
      <div className="container">
        <Formik
          initialValues={{ image: "", caption: "" }}
          validationSchema={Yup.object({
            image: Yup.string(),
            caption: Yup.string() 
              .max(20, "Must be 20 characters or less")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("caption", values.caption);
            formData.append("token", userToken);
            await axios.post(`${backendURL}/user/posts`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/");
            setSubmitting(false);
          }}
        >
          <div className="post-form">
            <Form>
              <label htmlFor="image">Image</label>
              <input  onChange={fileSelected}
            type="file"
            accept="image/*"
            className="input"
            />
              {/* <Field
            onChange={fileSelected}
            type="file"
            accept="image/*"
            name="image"
            className="input"
          /> */}
              <div className="error">
                <ErrorMessage name="image" />
              </div>

              <label htmlFor="caption">Caption</label>
              <Field
                type="text"
                placeholder="Caption"
                name="caption"
                className="input"
              />
              <div className="error">
                <ErrorMessage name="caption" />
              </div>

              <button className="submit-btn" type="submit">
                Submit
              </button>
            </Form>
          </div>
        </Formik>
      </div>
    </section>
  );
}
