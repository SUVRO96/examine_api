const express = require("express");

const router = express.Router();

const db = require("../db");

// http://localhost:4000/questions/allquestions
router.get("/allquestions", async (req, res) => {
  try {
    // console.log("connected");
    const response = await db.promise().query("SELECT * FROM questions");
    // console.log(response[0]);
    res.send(response[0]);
  } catch {}
});

// http://localhost:4000/questions/getquestionbysubject/subject_id
router.get("/getquestionbysubject/:subject_id", async (req, res) => {
  try {
    const subject_id = req.params.subject_id;
    const response = await db
      .promise()
      .query(`SELECT * FROM questions WHERE subject_id = '${subject_id}'`);
    res.status(200).json(response[0]);
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:4000/questions/searchquestion/qs_id
router.get("/searchquestion/:qs_id", async (req, res) => {
  try {
    const qs_id = req.params.qs_id;
    const response = await db
      .promise()
      .query(`SELECT * FROM questions WHERE qs_id = '${qs_id}'`);
    res.status(200).json(response[0]);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/getquestionbysubject/", async (req, res) => {
  try {
    const subject_id = req.query.subject;
    const count = req.query.count;
    const response = await db
      .promise()
      .query(
        `SELECT * FROM questions WHERE subject_id = '${subject_id}' ORDER BY RAND() LIMIT ${count} `
      );
    res.status(200).json(response[0]);
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:4000/questions/addquestion
router.post("/addquestion", async (req, res) => {
  try {
    const response = await db
      .promise()
      .query(
        `INSERT INTO questions(subject_id, question, ans1, ans2, ans3, ans4, correctanswer)  VALUES('${req.body.subject_id}', '${req.body.question}', ' ${req.body.ans1}', '${req.body.ans2}', '${req.body.ans3}', '${req.body.ans4}', ${req.body.correctanswer} );`
      );
    res.status(201).json({ massage: "success" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:4000/questions/editquestion
router.put("/editquestion/:qs_id", async (req, res) => {
  try {
    // console.log(req.body);
    const response = await db
      .promise()
      .query(
        `UPDATE questions SET question = '${req.body.question}',ans1 = '${req.body.ans1}', ans2 = '${req.body.ans2}',ans3 = '${req.body.ans3}', ans4 = '${req.body.ans4}',correctanswer = '${req.body.correctanswer}'WHERE qs_id = '${req.params.qs_id}'`
      );
    // console.log(response);
    res.status(200).json(response[0]);
  } catch (err) {
    // console.log(err);
    res.status(400).json({ massage: err.massage });
  }
});

// http://localhost:4000/questions/removequestion/qs_id
router.delete("/removequestion/:qs_id", async (req, res) => {
  try {
    const qs_id = req.params.qs_id;
    const response = await db
      .promise()
      .query(`DELETE FROM questions WHERE qs_id = '${qs_id}'`);
    res.status(200).json(response[0]);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
