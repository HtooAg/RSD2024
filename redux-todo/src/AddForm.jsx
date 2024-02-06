import { Input, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useRef } from "react";
import { add } from "./app/todoSlice";
import { useDispatch } from "react-redux";
export default function AddForm() {
	const inputRef = useRef();
	const dispatch = useDispatch();
	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
					const subject = inputRef.current.value;
					dispatch(add(subject));
					inputRef.current.value = "";
					inputRef.current.focus();
				}}>
				<Input
					sx={{ mt: 4 }}
					inputRef={inputRef}
					fullWidth
					endAdornment={
						<IconButton type="submit">
							<AddIcon />
						</IconButton>
					}></Input>
			</form>
		</>
	);
}
