const express = require("express");
const app = express();
const cors = require("cors");
const hikersRoutes = require("./routes/hikersRoutes");
const hikesRoutes = require("./routes/hikesRoutes");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/hikers", hikersRoutes);
app.use("/hikes", hikesRoutes);

app.get("/", (req, res) => {
  res.send("Hello from node!");
});

app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
