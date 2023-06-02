import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "No Token" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication Error" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Message: "Sever Side Error" });
    return res.json({ Status: "Success" });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";

  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ Message: "Sever Side Error" });
    if (result.length > 0) {
      const name = result[0].name;
      const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1h",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Message: "No Records existed" });
    }
  });
});

app.get("logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Message: "Logout Success" });
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
