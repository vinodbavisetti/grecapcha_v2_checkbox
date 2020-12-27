const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.post("", (req, res, next) => {
  let secret = process.env.SECRET_KEY;

  fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body.token}`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        res.status(200).json({ msg: "success" });
      } else {
        res.status(200).json({ msg: "failed" });
      }
    });
});

app.listen(3000, () => console.log("listening at port 3000"));
