const express = require("express");

const router = express.Router();

const db = require("../db");

// http://localhost:4000/users/allusers
router.get("/allusers", async (req, res) => {
  try {
    console.log("connected");
    const response = await db.promise().query("SELECT * FROM users");
    console.log(response[0]);
    res.send(response[0]);
  } catch {}
});

router.get("/search/:user_id", async (req, res) => {
  try {
    const userid = req.params.user_id;
    const response = await db
      .promise()
      .query(`SELECT * FROM users WHERE userid = '${userid}'`);
    res.status(200).json(response[0]);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/adduser", async (req, res) => {
  try {
    const response = await db
      .promise()
      .query(
        `INSERT INTO users (name,email,mobile,userid) VALUES ('${req.body.name}','${req.body.email}','${req.body.mobile}','${req.body.userid}')`
      );
    const response2 = await db
      .promise()
      .query(`SELECT * FROM users WHERE userid = '${req.body.userid}'`);
    res.status(201).json(response2[0]);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await db
      .promise()
      .query(`SELECT * FROM users WHERE userid = '${req.body.userid}'`);
    if (response[0].length > 0) {
      if (response[0][0].password == req.body.password) {
        res.status(202).json(response[0]);
      } else {
        res.status(401).json({ message: "password incorrect" });
      }
    } else {
      res.status(422).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post("/update", async (req, res) => {
//   try {
//     const response = await db
//       .promise()
//       .query(`SELECT * FROM users WHERE userid = '${req.body.userid}'`);
//     if (response[0].length > 0) {
//       if (response[0][0].password == req.body.password) {
//         res.status(202).json(response[0]);
//       } else {
//         res.status(401).json({ message: "password incorrect" });
//       }
//     } else {
//       res.status(422).json({ message: "user not found" });
//     }
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
