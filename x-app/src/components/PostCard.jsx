import {
	Box,
	Card,
	CardContent,
	CardActionArea,
	IconButton,
	Button,
	ButtonGroup,
	Avatar,
	Typography,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText
} from "@mui/material";

import {
	MoreVert as MenuIcon,
	FavoriteBorder as LikeIcon,
	Favorite as LikedIcon,
	Comment as CommentIcon,
	Delete as DeleteIcon
} from "@mui/icons-material";

import { blue, green, grey, pink } from "@mui/material/colors";
import { format } from "date-fns";

import { useAuth } from "../providers/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

export default function PostCard({ post, like, unlike }) {
	const { auth, authUser } = useAuth();
	const [showMenu, setShowMenu] = useState(false);
	const navigate = useNavigate();

	const [menuPosition, setMenuPosition] = useState(null);

	return (
		<Card sx={{ my: 5 }}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between"
					}}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 3
						}}>
						<Avatar
							sx={{
								width: 75,
								height: 75,
								background: blue[500]
							}}>
							{post.owner.name[0]}
						</Avatar>
						<Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 2
								}}>
								<Typography>{post.owner.name}</Typography>
								<Typography
									sx={{
										color: green[500],
										fontSize: 14
									}}>
									- {format(post.created, "MMM d y")}
								</Typography>
							</Box>
							<Typography sx={{ color: grey[500], fontSize: 16 }}>
								@{post.owner.handle}
							</Typography>
						</Box>
					</Box>
					<IconButton
						onClick={e => {
							setShowMenu(true);
							setMenuPosition(e.currentTarget);
						}}>
						<MenuIcon />
					</IconButton>
					<Menu
						anchorEl={menuPosition}
						open={showMenu}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right"
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right"
						}}
						onClose={() => {
							setShowMenu(false);
						}}>
						<MenuItem>
							<ListItemIcon>
								<DeleteIcon color="error" />
							</ListItemIcon>
							<ListItemText primary="Delete" />
						</MenuItem>
					</Menu>
				</Box>
				<CardActionArea>
					<Typography sx={{ py: 2, px: 1 }}>{post.body}</Typography>
				</CardActionArea>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around"
					}}>
					<ButtonGroup>
						<LikeButton post={post} like={like} unlike={unlike} />
						<Button
							variant="text"
							onClick={() => {
								navigate(`/likes/${post._id}`);
							}}>
							{post.likes ? post.likes.length : 0}
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton>
							<CommentIcon sx={{ color: blue[500] }} />
						</IconButton>
						<Button variant="text">
							{post.comments ? post.comments.length : 0}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
