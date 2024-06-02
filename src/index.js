const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
const mongoose = require("mongoose");

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log("HTTP Method - " + req.method + ", URL - " + req.url)
  next();
})

// Routes
app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello!!!");
});

mongoose
  .connect(
    "mongodb+srv://notesUser:notesPassword@notes.ywxcc3y.mongodb.net/?retryWrites=true&w=majority&appName=notes"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("DB Connected Successfully!");
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Server Running At Port
