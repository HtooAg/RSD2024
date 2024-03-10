import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";

import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { styles } from "./style";
const api = "http://192.168.43.99:8888/task";

export default function App() {
	const [subject, setSubject] = useState("");
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch(api);
			const data = await res.json();
			setTasks(data);
		})();
	}, []);

	const add = async () => {
		const res = await fetch(api, {
			method: "post",
			body: JSON.stringify({
				subject,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!subject) return false;
		const data = await res.json();
		setTasks([...tasks, data]);
		setSubject("");
	};

	const remove = (_id) => {
		const res = fetch(`${api}/${_id}`, {
			method: "delete",
		});
		setTasks(tasks.filter((task) => task._id !== _id));
	};

	const toggle = (_id) => {
		fetch(`${api}/toggle/${_id}`, {
			method: "put",
		});
		setList(
			list.map((item) => {
				if (item._id === _id) item.done = !item.done;
				return item;
			})
		);
	};
	return (
		<View style={styles.list}>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					value={subject}
					onChangeText={setSubject}
					onSubmitEditing={() => add()}
				/>
				<Button title="ADD" onPress={add} />
			</View>
			{tasks.map((item) => (
				<View style={styles.listItem} key={item._id}>
					<Text style={[styles.itemText, { color: "#aaa" }]}>
						{" "}
						{item.subject}
					</Text>
					<Link
						href={`/edit/${item._id}`}
						style={{ marginRight: 10 }}
					>
						<FontAwesome
							name="edit"
							style={{ fontSize: 20, color: "teal" }}
						/>
					</Link>
					<TouchableOpacity
						onPress={() => {
							remove(item._id);
						}}
					>
						<FontAwesome
							name="trash"
							style={{ fontSize: 18, color: "firebrick" }}
						/>
					</TouchableOpacity>
				</View>
			))}
		</View>
	);
}
