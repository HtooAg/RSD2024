const express = require("express");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost");

const db = client.db("todo");
const task = db.collection("task");

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/task", async (req, res) => {
	const data = await task.find().toArray();
	setTimeout(() => {
		return res.json(data);
	}, 1000);
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
		return res.status(400).json({ msg: "Subject Required" });
	}

	const data = await task.insertOne({ subject, done: false });
	const result = await task.findOne({ _id: new ObjectId(data.insertedId) });
	return res.json(result);
});

app.delete("/task/:id", async (req, res) => {
	const { id } = req.params;
	const _id = new ObjectId(id);

	await task.deleteOne({ _id });
	return res.sendStatus(204);
});

app.put("/task/:id", async (req, res) => {
	const { id } = req.params;
	const { subject } = req.body;

	try {
		const _id = new ObjectId(id);
		if (!subject) {
			return res.status(400).json({ msg: "Subject Required!" });
		}

		const data = await task.updateOne(
			{ _id },
			{
				$set: {
					subject,
				},
			}
		);

		const result = await task.findOne({ _id });
		return res.json(result);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

app.put("/task/toggle/:id", async (req, res) => {
	const { id } = req.params;
	const _id = new ObjectId(id);

	const current = await task.findOne({ _id });
	const done = !current.done;

	const data = await task.updateOne(
		{ _id },
		{
			$set: {
				done,
			},
		}
	);

	const result = await task.findOne({ _id });
	return res.json(result);
});

app.delete("/task", async (req, res) => {
	const result = await task.deleteMany({ done: true });
	return res.json(result);
});

app.listen(8888, () => {
	console.log("Backend API running at 8888!");
});
