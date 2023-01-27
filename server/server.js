const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const {  dbConnect } = require("./src/config/dbConfig");
mongoose.set("strictQuery", true);
dotenv.config();

const app = express();

// Middleware

app.use(cors());
app.use(cors({origin:["http://127.0.0.1:5137"],}))
app.use(fileUpload());
app.use(express.json());

const PORT = process.env.PORT || 7000
//routes
console.log(readdirSync("./src/routes"));
readdirSync("./src/routes").map((r) => app.use("/", require("./src/routes/" + r)));;(async function server() {
    try {
      dbConnect();
      app.listen( PORT, () => {
        console.log(`Server is running on Port #${PORT}`);
      });
    } catch (error) {
      console.log(`server Error ${error}`);
    }
  })();