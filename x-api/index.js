require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use("/static", express.static("./photos"));

const { usersRouter } = require("./routers/users");
const { postsRouter } = require("./routers/posts");

app.use(usersRouter);
app.use(postsRouter);

app.listen(process.env.PORT, () => {
	console.log(`X API running at ${process.env.PORT}`);
});
