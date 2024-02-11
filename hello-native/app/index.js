import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	TouchableOpacity,
} from "react-native";

import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	list: {
		borderWidth: 1,
		borderColor: "#ddd",
		margin: 15,
	},
	listItem: {
		flexDirection: "row",
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	itemText: {
		fontSize: 15,
		flexGrow: 1,
	},
	form: {
		margin: 15,
		flexDirection: "row",
	},
	input: {
		flexGrow: 1,
		paddingLeft: 10,
		backgroundColor: "#ddd",
		fontSize: 18,
	},
});

export default function App() {
	const [subject, setSubject] = useState("");
	const [tasks, setTasks] = useState([
		{ _id: 1, subject: "Apple", done: false },
		{ _id: 2, subject: "Orange", done: false },
		{ _id: 3, subject: "Mango", done: false },
		{ _id: 4, subject: "Banana", done: false },
	]);

	const add = () => {
		const _id = tasks[tasks.length - 1]._id + 1;
		setTasks([...tasks, { _id, subject, done: false }]);
		setSubject("");
	};
	return (
		<View style={styles.list}>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					value={subject}
					onChangeText={setSubject}
				/>
				<Button title="ADD" onPress={add} />
			</View>
			{tasks.map((item) => (
				<View style={styles.listItem} key={item._id}>
					<Text style={styles.itemText}> {item.subject}</Text>
					<Link href="/edit" style={{ marginRight: 10 }}>
						<FontAwesome
							name="edit"
							style={{ fontSize: 20, color: "teal" }}
						/>
					</Link>
					<TouchableOpacity
						onPress={() => {
							setTasks(
								tasks.filter((task) => task._id !== item._id)
							);
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
