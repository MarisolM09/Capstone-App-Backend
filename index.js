const express = require("express");
const app = express();
const cors = require("cors");

const hikersRoutes = require("./routes/hikersRoutes");
const hikesRoutes = require("./routes/hikesRoutes");
const AuthRoutes = require("./routes/AuthRoutes");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/hikers", hikersRoutes);
app.use("/hikes", hikesRoutes);
app.use("/auth", AuthRoutes);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from node!");
});

app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
