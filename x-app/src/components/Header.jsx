import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import {
	Menu as MenuIcon,
	X as XIcon,
	Notifications as NotiIcon,
	DarkMode as DarkModeIcon,
	LightMode as LightModeIcon,
	ArrowBack as BackIcon
} from "@mui/icons-material";
import { useUIState } from "../providers/UIStateProvider";
import { useAppTheme } from "../providers/AppThemeProvider";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
	const { setOpenDrawer } = useUIState();
	const { mode, setMode } = useAppTheme();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	return (
		<AppBar position="static" sx={{ bgcolor: "header.background" }}>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				{pathname === "/" ? (
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => setOpenDrawer(true)}>
						<MenuIcon />
					</IconButton>
				) : (
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => navigate(-1)}>
						<BackIcon />
					</IconButton>
				)}

				<IconButton
					disableRipple
					onClick={() => {
						navigate("/");
					}}>
					<XIcon />
				</IconButton>
				<Box>
					{mode === "dark" ? (
						<IconButton
							color="inherit"
							onClick={() => setMode("light")}>
							<LightModeIcon />
						</IconButton>
					) : (
						<IconButton
							color="inherit"
							onClick={() => setMode("dark")}>
							<DarkModeIcon />
						</IconButton>
					)}
					<IconButton color="inherit" edge="end">
						<NotiIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
