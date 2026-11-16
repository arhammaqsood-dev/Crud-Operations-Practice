const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Arham", email: "arham@gmail.com" },
  { id: 2, name: "Ali", email: "ali@gmail.com" },
];

// GET ALL USERS
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// GET SINGLE USER
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// ADD USER
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

// UPDATE USER
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  user.name = name;
  user.email = email;

  res.status(200).json(user);
});

// DELETE USER
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser[0],
  });
});

app.listen(5500, () => {
  console.log("Server running on port ", 5500);
});
