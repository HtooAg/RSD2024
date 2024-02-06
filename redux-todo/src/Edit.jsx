import { Input, IconButton } from "@mui/material";
import { Save as SaveIcon, ArrowBack as BackIcon } from "@mui/icons-material";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { update } from "./app/todoSlice";
import { useDispatch } from "react-redux";
export default function Edit() {
	const inputRef = useRef();
	const { state } = useLocation();
	const navigate = useNavigate();
	const [subject, setSubject] = useState(state.item.subject);
	const dispatch = useDispatch();
	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
					dispatch(update({ _id: state.item._id, subject }));
					navigate("/");
				}}>
				<Input
					inputRef={inputRef}
					endAdornment={
						<IconButton>
							<SaveIcon />
						</IconButton>
					}
					fullWidth
					sx={{ my: 4 }}
					value={subject}
					onChange={e => {
						setSubject(e.target.value);
					}}></Input>
			</form>

			<Link to="/">
				<BackIcon sx={{ color: "#fff" }} />
			</Link>
		</>
	);
}
