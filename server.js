const express = require("express");
const serverRoutes = require("./routes/servers");
const authRoutes = require("./routes/auth");
const morgan = require("morgan");
const fileSystem = require("fs");
const path = require("path");
var cors = require("cors");
const authenticateToken = require("./middlewere/auth");

const app = express();
const port = 3000;

const accessLogStream = fileSystem.createWriteStream(
  path.join(__dirname, "app.log"),
  { flags: "a" }
);

app.use(express.json());
app.use(cors());
app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/servers", authenticateToken, serverRoutes);
app.use("*", function (req, res, next) {
  res.status(404).json({ message: "Route not Found" });
});

app.listen(port, () => {
  console.log(`Application is runnig on: ${port}`);
});
