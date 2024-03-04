import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import backendURL from "../../config";
import "./index.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MessageInput } from "@chatscope/chat-ui-kit-react";
import { Button } from "@mui/material";
import { FiPlusCircle } from "react-icons/fi";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NewPost() {
  const { userToken } = useContext(UserContext);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [promt, setPromt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAiGenerated, setIsAiGenerated] = useState(false)

  const urlToFile = (url, filename) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const file = new File([blob], filename || '', { type: blob.type });
          resolve(file);
        } else {
          reject(new Error('Failed to fetch file'));
        }
      };
  
      xhr.onerror = () => {
        reject(new Error('Network error occurred'));
      };
  
      xhr.send();
    });
  };
  // const asd = urlToFile("https://prlabsapi.com:8005/matagimage?id=K03BYlnf8LtgG9gronsg1709508812.3075924","image.png")


  const getImage = async () => {
    try {
      setLoading(true);
      const resp = await axios.post(`${backendURL}/posts/generateImage`, {
        textPromt: promt,
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      setImage(resp.data.generated_image);
      // const file = await urlToFile(resp.data.generated_image,image.png);
      urlToFile(resp.data.generated_image, 'image.jpg')
      .then((file) => {
        setFile(file)
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
      
      setIsAiGenerated(true)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
    console.log(file);
    setIsAiGenerated(false)
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <section id="createPost">
      <div className="container">
        <Formik
          initialValues={{ image: "", caption: "" }}
          validationSchema={Yup.object({
            image: Yup.string(),
            caption: Yup.string()
              .max(100, "Must be 100 characters or less")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("caption", values.caption);
            formData.append("token", userToken);
            formData.append('isAiGenerated', isAiGenerated);
            await axios.post(`${backendURL}/user/posts`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/");
            setSubmitting(false);
          }}
        >
          <div className="post-form">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Create Post" {...a11yProps(0)} />
                  <Tab label="Generate AI Image" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Form>
                  <label htmlFor="image">Image</label>
                  <input
                    onChange={fileSelected}
                    type="file"
                    accept="image/*"
                    className="input"
                  />
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Form>

                  <textarea rows={2} type="text" placeholder='Enter Promt to Generate Image' onChange={(e)=>setPromt(e.target.value)} />
                  <div>
                    <Button  onClick={()=>getImage()} >Generate Image <FiPlusCircle /></Button>
                  </div>

                  <div className="image">
                    {loading ? <div className="loader"></div> : ""}
                    {image ? <img src={image} alt="" /> : ""}
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
              </CustomTabPanel>
            </Box>
          </div>
        </Formik>
      </div>
    </section>
  );
}
