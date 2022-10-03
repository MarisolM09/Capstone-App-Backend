const pool = require("../sql/connection");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// signup user
const signup = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // for bcrypt ????
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  let sql = `INSERT INTO hikers (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
  let replacements = [first_name, last_name, email, password];

  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, row) => {
    if (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY")
        return res.status(409).send("Email is taken");
      return res.status(500).send("Oh no! Something went wrong.");
    }
    return res.send("Sign-up Successful");
  });
};

// login user and create token
const login = (req, res) => {
  const { email, password } = req.body;

  let sql = "SELECT * FROM hikers WHERE email = ?";
  sql = mysql.format(sql, [email]);

  pool.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Oh no! Something went wrong.");
    }
    if (!rows.length) return res.status(404).send("No matching users");

    // const hash = rows[0].password;
    // console.log("hash", hash);
    console.log("password", password);
    bcrypt.hash(password, 10, (err, hash) => {
      bcrypt.compare(password, hash, (err, result) => {
        console.log("result", result);
        if (!result) return res.status(400).send("Invalid password");

        const data = { ...rows[0] };
        data.password = "REDACTED";

        const token = jwt.sign(data, "secret");
        res.json({
          msg: "Login successful",
          token,
        });
      });
    });
  });
};

module.exports = { signup, login };
