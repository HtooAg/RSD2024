import { AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import {
	Checklist as ChecklistIcon,
	DeleteSweep as ClearallIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon
} from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "./Theme";

export default function Header({ count, clear }) {
	const { mode, setMode } = useContext(ThemeContext);
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton color="inherit">
						<Badge badgeContent={count} color="error">
							<ChecklistIcon />
						</Badge>
					</IconButton>
					<Typography variant="h6" sx={{ flexGrow: 1, ml: 3 }}>
						Checklist
					</Typography>

					<>
						{mode === "dark" ? (
							<IconButton onClick={() => setMode("light")}>
								<LightModeIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => setMode("dark")}>
								<DarkModeIcon />
							</IconButton>
						)}
					</>

					<IconButton color="inherit" onClick={clear}>
						<ClearallIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
}
