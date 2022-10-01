const pool = require("../sql/connection");
const mysql = require("mysql");

const list = (req, res) => {
  pool.query("SELECT * FROM hikes", (err, rows) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  pool.query(`SELECT * FROM hikes WHERE id = ${req.params.id}`, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

const create = (req, res) => {
  const { hike_name, location, hike_length, elevation_gain, user_id } = req.body;

  pool.query(
    `INSERT INTO hikes (hike_name, location, hike_length, elevation_gain, user_id)
      VALUES ("${hike_name}","${location}", "${hike_length}", "${elevation_gain}", "${user_id}")`,
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
  sql = mysql.format(sql, ["hikes", req.body, "id", req.params.id]);
  pool.query(sql, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

const remove = (req, res) => {
  pool.query(`DELETE FROM hikes WHERE id = ${req.params.id}`, (err, row) => {
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