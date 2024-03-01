require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api", router);

app.all("*", (req, res) => {
    res.status(404).json({
        message: `${req.originalUrl} does not exist on this server.`,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is online on the following port: ${process.env.PORT}`);
    console.log(`The server can be accessed at ${process.env.HOST}:${process.env.PORT}`);
});
