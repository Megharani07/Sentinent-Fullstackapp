const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => res.send("API Running"));

app.use("/auth", require("./routes/auth"));
app.use("/payment", require("./routes/payment"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
);

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
