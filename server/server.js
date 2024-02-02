import app from "./app.js";

const port = process.env.PORT;


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  server.on("error", (err) => {
    console.error("Server failed to start:", err);
  });
  
  server.on("listening", () => {
    console.log("Server is now listening");
  });