import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	CheckCircleOutline as CheckIcon,
	Check as DoneIcon
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { remove, toggle } from "./app/todoSlice";

export default function CheckList({ list, done }) {
	const dispatch = useDispatch();
	return (
		<>
			<List sx={{ opacity: done ? 0.5 : 1 }}>
				{list.map(item => (
					<ListItem
						key={item._id}
						secondaryAction={
							<>
								<IconButton>
									<Link to="/edit" state={{ item }}>
										<EditIcon color="info" />
									</Link>
								</IconButton>
								<IconButton
									onClick={() => {
										dispatch(remove(item._id));
									}}>
									<DeleteIcon color="error" />
								</IconButton>
							</>
						}>
						<IconButton onClick={() => dispatch(toggle(item._id))}>
							{done ? (
								<DoneIcon color="success" />
							) : (
								<CheckIcon />
							)}
						</IconButton>

						<ListItemText primary={item.subject} />
					</ListItem>
				))}
			</List>
		</>
	);
}
