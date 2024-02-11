import { View, Text, StyleSheet } from "react-native";
import { Slot, Link, usePathname } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	header: {
		padding: 20,
		backgroundColor: "slateblue",
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 60,
	},
	title: {
		fontSize: 20,
		color: "white",
		fontWeight: "bold",
	},
	logo: {
		fontSize: 20,
		color: "#fff",
		marginRight: 20,
	},
	icon: {
		fontSize: 20,
		color: "#fff",
		marginRight: 20,
	},
});

export default function App() {
	const pathname = usePathname();
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				{pathname === "/" ? (
					<FontAwesome style={styles.logo} name="list" />
				) : (
					<Link href="/">
						<FontAwesome style={styles.icon} name="arrow-left" />
					</Link>
				)}
				<Text style={styles.title}>Todo</Text>
			</View>
			<Slot />
		</View>
	);
}
