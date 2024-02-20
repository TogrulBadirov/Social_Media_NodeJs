import dotenv from 'dotenv';
dotenv.config();

const setCookie = (res, name, value, options = {}) => {
    // Set secure attribute only in production when using HTTPS
    const isSecure = process.env.NODE_ENV === 'production';
  
    // Default options
    const defaultOptions = {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'Strict', // Adjust as needed ('Strict', 'Lax', 'None')
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      path: '/',
    };
  
    // Merge provided options with default options
    const mergedOptions = { ...defaultOptions, ...options };
  
    // Set the cookie
    res.cookie(name, value, mergedOptions);
  };
  
  export default setCookie;
  