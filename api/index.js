const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 3000;
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const listingRouter = require("./routes/listing.route");
const cookieParser = require('cookie-parser') ;

dotenv.config();
app.use(express.json());
app.use(cookieParser());  

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB);
}

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/listing", listingRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
