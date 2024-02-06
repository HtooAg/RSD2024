import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	CheckCircleOutline as CheckIcon,
	Check as DoneIcon
} from "@mui/icons-material";

import { Link } from "react-router-dom";
export default function CheckList({ list, remove, done, toggle }) {
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
								<IconButton onClick={() => remove(item._id)}>
									<DeleteIcon color="error" />
								</IconButton>
							</>
						}>
						<IconButton onClick={() => toggle(item._id)}>
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
