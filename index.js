const express = require("express");
const app = express();
const { hikers, hikes } = require("./data/data.js");
const { v4 } = require("uuid");

const PORT = process.env.Port || 5000;

app.use(express.json());

// Route handler
// Get all users
app.get("/hikers", (req, res) => {
  res.json(hikers);
});

// Get users by ID
app.get("/hikers/:id", (req, res) => {
  const user = hikers.find((x) => x.id === req.params.id);
  res.json(user);
});

// Creates a user
app.post("/hikers", (req, res) => {
  const { body } = req;
  let newUser = {
    ...body,
    id: v4(),
  };

  hikers.push(newUser);
  res.send(newUser);
});

// Updates one user
app.put("/hikers/:id", (req, res) => {
  const user = hikers.find((x) => x.id === req.params.id);
  const userIndex = hikers.findIndex((x) => x.id === req.params.id);

  const { body } = req;

  let newUser = {
    ...user,
    ...body,
  };

  hikers.splice(userIndex, 1, newUser);

  res.send(hikers);
});

app.delete("/hikers/:id", (req, res) => {
  const user = hikers.find((x) => x.id === req.params.id);
  const userIndex = hikers.findIndex((x) => x.id === req.params.id);

  hikers.splice(userIndex, 1);
  
  res.send(hikers);
});

app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
