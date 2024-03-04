import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import backendURL from "../../config";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../context/UserContext";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "fullName", headerName: "Full Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 120 },
];

const Admin = () => {
  const [users, setUsers] = useState([]);
  const { userToken, setUserToken, user } = useContext(UserContext);
  const [logo, setLogo] = useState(null);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendURL}/user`); // Adjust the endpoint based on your backend route
      const usersWithId = response.data.map((user, index) => ({
        ...user,
        id: user._id,
      })); // Assign MongoDB _id as id property
      setUsers(usersWithId);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchLogo = async () => {
    try {
      const response = await axios.get(`${backendURL}/admin/logo`);
      setLogo(response.data);
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  useEffect(() => {

    fetchUsers();
    fetchLogo();
  }, []);

  const initialValues = {
    imageUrl: "",
  };

  const validationSchema = Yup.object({
    imageUrl: Yup.string().required("Text is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `${backendURL}/admin/logo`,
        { imageUrl: values.imageUrl },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const updatedLogo = response.data;
      console.log("Logo updated successfully:", updatedLogo);
      // You can perform any necessary actions after logo update here
    } catch (error) {
      console.error("Error updating logo:", error);
      // Handle error here
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="Admin">
      <div className="container">
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
              <label htmlFor="imageUrl">Update Logo</label>
              </div>
              <Field
                type="text"
                placeholder={logo && logo.imageUrl}
                name="imageUrl"
                className="input"
              />
              <div className="error">
                <ErrorMessage name="imageUrl" />
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Logo"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Admin;
