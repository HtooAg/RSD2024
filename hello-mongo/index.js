const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost");

const db = client.db("todo");
const tasks = db.collection("task");

const x = client.db("x");
async function getData() {
	const data = await x
		.collection("posts")
		.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "owner",
					foreignField: "_id",
					as: "owner_user",
				},
			},
			{
				$limit: 1,
			},
		])
		.toArray();

	console.log(data[0].owner_user);
	process.exit(0);
}
getData();
// async function getData() {
// 	const data = await tasks.find().sort({ subject: 1 }).toArray();
// 	console.log(data);
// 	process.exit(0);
// }
// getData();

// async function insertData(data) {
// 	const result = await tasks.insertOne(data);
// 	console.log(result);
// 	process.exit(0);
// }
// insertData({ subject: "PineApple", done: false });

// async function deleteData(id) {
// 	const objectIdToDelete = new ObjectId(id);
// 	const data = await tasks.deleteOne({ _id: objectIdToDelete });
// 	console.log(data);
// 	process.exit(0);
// }
// deleteData("65be5cb153a93953d9c3bef9");

// async function updateData(id, data) {
// 	const objectIdToUpdate = new ObjectId(id);
// 	const output = await tasks.updateOne(
// 		{ _id: objectIdToUpdate },
// 		{ $set: data }
// 	);
// 	console.log(output);
// 	process.exit(0);
// }
// updateData("65be58d053a93953d9c3bef4", { subject: "Orange", done: false });
