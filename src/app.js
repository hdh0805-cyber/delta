const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const pageRoutes = require("./routes/pageRoutes");
const cmpntRoutes = require("./routes/cmpntRoutes");
const jobRoutes = require("./routes/jobRoutes");
const actionRoutes = require("./routes/actionRoutes");

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
app.use("/api", cmpntRoutes);
app.use("/api", jobRoutes);
app.use("/api", actionRoutes);

module.exports = app;