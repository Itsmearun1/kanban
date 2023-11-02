const express = require("express");
const mongoose = require("mongoose");
const boardRoutes = require("./routes/boardRoutes");
const cors = require("cors");
const app = express();
const port = 3000;

mongoose
  .connect(
    "mongodb+srv://Arun:123@cluster0.ynhdskj.mongodb.net/kanban?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(express.json());

app.use("/boards", boardRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
