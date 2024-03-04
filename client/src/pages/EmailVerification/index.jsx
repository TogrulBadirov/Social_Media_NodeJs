import React, { useEffect, useState } from "react";
import "./index.scss";
import "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import backendURL from "../../config";
const EmailVerification = () => {
  const { token } = useParams();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const verifyEmail = async () => {
    try {
      setStatus(null); // Reset status
      setLoading(true); // Set loading state
      setError(null); // Reset error

      // Send request to backend to verify email
      const resp = await axios(`${backendURL}/user/verify/${token}`);

      // If request succeeds, set status message
      setStatus(resp.data.message);
    } catch (error) {
      // If there's an error, set error message
      setError(error.response.data.error);
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <section id="EmailVerification">
      <div className="container">
      {loading && "Loading..."} {/* Show loading message if loading */}
        {!loading && status && <p className="success">{status}</p>} {/* Show status message if not loading and status exists */}
        {!loading && error && <p className="error">{error}</p>} {/* Show error message if not loading and error exists */}
      </div>
    </section>
  );
};

export default EmailVerification;
