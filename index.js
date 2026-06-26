const express = require("express");

const app = express();
const PORT = 5100;

console.log("Hello World");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});