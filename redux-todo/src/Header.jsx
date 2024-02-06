import { AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import {
	Checklist as ChecklistIcon,
	DeleteSweep as ClearallIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon
} from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "./Theme";
import { useSelector, useDispatch } from "react-redux";
import { clear } from "./app/todoSlice";

export default function Header() {
	const { mode, setMode } = useContext(ThemeContext);
	const list = useSelector(state => state.todo.items);
	const dispatch = useDispatch();
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton color="inherit">
						<Badge
							badgeContent={
								list.filter(item => !item.done).length
							}
							color="error">
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

					<IconButton
						color="inherit"
						onClick={() => {
							dispatch(clear());
						}}>
						<ClearallIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
}
