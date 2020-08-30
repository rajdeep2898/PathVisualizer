const express = require("express");

const app = express();
const path = require("path");

//If production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("backend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "backend", "build", "index.html"));
  });
}

//PORTS
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`running at ${port}`);
});
