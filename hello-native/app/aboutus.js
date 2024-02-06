import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	header: {
		padding: 20,
		backgroundColor: "slateblue",
	},
	title: {
		fontSize: 20,
		color: "white",
	},
});

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>About Us</Text>
			</View>
			<Link href="/">Home</Link>
		</View>
	);
}
