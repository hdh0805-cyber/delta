const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const pageRoutes = require("./routes/pageRoutes");

const path = require("path");

const app = express();

app.use(cors());

app.use(express.json({
    limit: "50mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "50mb"
}));

app.use("/api", authRoutes);
app.use("/api", documentRoutes);
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "../uploads")
    )
);

app.use("/api", pageRoutes);

module.exports = app;