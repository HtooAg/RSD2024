import { Container, Box, Typography, CircularProgress } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Template({ list, clear, isLoading }) {
	return (
		<Box>
			<Header
				count={list.filter((item) => !item.done).length}
				clear={clear}
			/>
			<Container maxWidth="sm">
				{isLoading ? (
					<Box
						sx={{
							display: "flex",
							height: 200,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<CircularProgress />
					</Box>
				) : (
					<Outlet />
				)}
			</Container>
		</Box>
	);
}
