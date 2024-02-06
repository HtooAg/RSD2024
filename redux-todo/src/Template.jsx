import { Container, Box } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Template() {
	return (
		<Box>
			<Header />
			<Container maxWidth="sm">
				<Outlet />
			</Container>
		</Box>
	);
}
