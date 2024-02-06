const express = require("express");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost");

const db = client.db("todo");
const task = db.collection("task");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.get("/task", async (req, res) => {
	const data = await task.find().toArray();
	setTimeout(() => {
		return res.json(data);
	}, 3000);
});

app.get("/task/:id", async (req, res) => {
	const { id } = req.params;
	const _id = new ObjectId(id);

	const data = await task.findOne({ _id });
	return res.json(data);
});

app.post("/task", async (req, res) => {
	const { subject } = req.body;
	if (!subject) {
		return res.status(400).json({ msg: "subject required" });
	}

	const result = await task.insertOne({ subject, done: false });
	const data = await task.findOne({ _id: new ObjectId(result.insertedId) });
	return res.json(data);
});

app.put("/task/:id", async (req, res) => {
	const { id } = req.params;
	const { subject } = req.body;
	if (!subject) {
		return res.status(400).json({ msg: "subject required" });
	}

	try {
		const _id = new ObjectId(id);
		const result = await task.updateOne({ _id }, { $set: { subject } });
		const data = await task.findOne({ _id });
		return res.json(data);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

app.delete("/task/:id", async (req, res) => {
	const { id } = req.params;
	const _id = new ObjectId(id);

	await task.deleteOne({ _id });
	return res.sendStatus(204);
});

app.listen(8888, () => {
	console.log("Todo API running at 8888");
});
