const express = require("express");

const app = express();
const PORT = 5100;

app.listen(PORT, () => {
  console.log("Hello World");
  console.log(`Server running on port ${PORT}`);
});