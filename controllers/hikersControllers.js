const pool = require("../sql/connection");
const mysql = require("mysql");

const list = (req, res) => {
  pool.query("SELECT * FROM hikers", (err, rows) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  pool.query(`SELECT * FROM hikers WHERE id = ${req.params.id}`, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

const create = (req, res) => {
  const { first_name, last_name, email } = req.body;

  pool.query(
    `INSERT INTO hikers (first_name, last_name, email) 
      VALUES ("${first_name}","${last_name}", "${email}")`,
    (err, row) => {
      if (err) {
        console.log({ message: "Error occurred: " + err });
        return res.status(500).send("An unexpected error occurred");
      }
      res.json(row);
    }
  );
};

const update = (req, res) => {
  let sql = "UPDATE ?? SET ? WHERE ?? = ?";
  sql = mysql.format(sql, ["hikers", req.body, "id", req.params.id]);
  pool.query(sql, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

const remove = (req, res) => {
  pool.query(`DELETE FROM hikers WHERE id = ${req.params.id}`, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

module.exports = {
  list,
  show,
  create,
  update,
  remove,
};
