// const express = require("express");

// const router = express.Router();

// const db = require("../db");

// // http://localhost:4000/users/allusers
// router.get("/allusers", async (req, res) => {
//   try {
//     console.log("connected");
//     const response = await db.promise().query("SELECT * FROM users");
//     console.log(response[0]);
//     res.send(response[0]);
//   } catch {}
// });

// router.get("/search/:user_id", async (req, res) => {
//   try {
//     const userid = req.params.user_id;
//     const response = await db
//       .promise()
//       .query(`SELECT * FROM users WHERE userid = '${userid}'`);
//     res.status(200).json(response[0]);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// module.exports = router;
