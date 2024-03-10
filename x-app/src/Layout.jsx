import { Box, Container, Alert, Snackbar, Fab } from "@mui/material";
import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useUIState } from "./providers/UIStateProvider";

import { Add as AddIcon } from "@mui/icons-material";

export default function Layout() {
	const { openFeedback, setOpenFeedback, feedbackMessage } = useUIState();
	return (
		<Box>
			<AppDrawer />
			<Header />
			<Container maxWidth="sm">
				<Outlet />
				<Fab
					color="success"
					sx={{ position: "fixed", bottom: 40, right: 40 }}
				>
					<AddIcon />
				</Fab>
			</Container>
		</Box>
	);
}
