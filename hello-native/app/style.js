import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
