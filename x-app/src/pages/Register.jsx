import {
	Box,
	TextField,
	Button,
	IconButton,
	Typography,
	Alert
} from "@mui/material";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import {
	Visibility as ShowPassIcon,
	VisibilityOff as HidePassIcon
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useUIState } from "../providers/UIStateProvider";

export default function Register() {
	const nameRef = useRef();
	const handleRef = useRef();
	const passwordRef = useRef();
	const profileRef = useRef();
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const { setOpenFeedback, setFeedbackMessage } = useUIState();

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const navigate = useNavigate();

	return (
		<Box>
			<Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
				Register Page
			</Typography>
			<Box>
				<form
					onSubmit={e => {
						e.preventDefault();
						const name = nameRef.current.value;
						const handle = handleRef.current.value;
						const password = passwordRef.current.value;
						const profile = profileRef.current.value;
						if (!name && !handle && !password && !profile) {
							setHasError(true);
							setErrorMessage(
								"Incorrect name, handle and password!"
							);
						}

						(async () => {
							const api = import.meta.env.VITE_API_URL;
							const res = await fetch(`${api}/register`, {
								method: "POST",
								body: JSON.stringify({
									name,
									handle,
									password,
									profile
								}),
								headers: {
									"Content-Type": "application/json"
								}
							});
							if (!res.ok) {
								setHasError(true);
								setErrorMessage((await res.json()).msg);
								return false;
							}
							setFeedbackMessage("Account created");
							setOpenFeedback(true);
							navigate("/login");
						})();
					}}>
					{hasError && (
						<Alert severity="warning" sx={{ mb: 4 }}>
							{errorMessage}
						</Alert>
					)}
					<TextField label="Name" fullWidth inputRef={nameRef} />
					<TextField
						label="Handle"
						fullWidth
						inputRef={handleRef}
						sx={{ my: 4 }}
					/>

					<TextField
						fullWidth
						type={showPassword ? "text" : "password"}
						label="Password"
						inputRef={passwordRef}
						InputProps={{
							endAdornment: (
								<IconButton
									onClick={handleClickShowPassword}
									edge="end">
									{showPassword ? (
										<HidePassIcon />
									) : (
										<ShowPassIcon />
									)}
								</IconButton>
							)
						}}
					/>
					<TextField
						label="Profile / Bio"
						fullWidth
						inputRef={profileRef}
						sx={{ my: 4 }}
					/>

					<Button type="submit" variant="contained" fullWidth>
						Register
					</Button>
					<Box sx={{ textAlign: "center", my: 4 }}>
						<Link to="/login">Login</Link>
					</Box>
				</form>
			</Box>
		</Box>
	);
}
