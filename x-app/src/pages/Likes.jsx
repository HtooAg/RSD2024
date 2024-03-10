import {
	Avatar,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	ListItemButton,
	Button,
	ListItemSecondaryAction
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Likes() {
	const [users, setUsers] = useState([]);
	const { id } = useParams();
	const api = import.meta.env.VITE_API_URL;
	useEffect(() => {
		(async () => {
			const res = await fetch(`${api}/users/likes/${id}`);
			setUsers(await res.json());
		})();
	}, []);
	return (
		<>
			<List>
				{users.map(user => (
					<ListItem>
						<ListItemAvatar>
							<Avatar
								sx={{
									background: blue[500],
									width: 75,
									height: 75
								}}>
								{user.name[0]}
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							sx={{ ml: 3 }}
							primary={user.name}
							secondary={
								(user.followers ? user.followers.length : 0) +
								" Followers"
							}
						/>
						<ListItemSecondaryAction>
							<Button
								size="small"
								variant="outlined"
								sx={{ borderRadius: 10 }}>
								Follow
							</Button>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</>
	);
}
