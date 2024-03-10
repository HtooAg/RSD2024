import { IconButton } from "@mui/material";

import {
	FavoriteBorder as LikeIcon,
	Favorite as LikedIcon,
} from "@mui/icons-material";
import { pink } from "@mui/material/colors";

import { useAuth } from "../providers/AuthProvider";

export default function LikeButton({ post, like, unlike }) {
	const { auth, authUser } = useAuth();
	return (
		<>
			{auth && post.likes ? (
				post.likes.find((like) => like === authUser._id) ? (
					<IconButton
						onClick={() => {
							unlike(post._id);
						}}
					>
						<LikeIcon sx={{ color: pink[500] }} />
					</IconButton>
				) : (
					<IconButton
						onClick={() => {
							like(post._id);
						}}
					>
						<LikedIcon sx={{ color: pink[500] }} />
					</IconButton>
				)
			) : (
				<IconButton>
					<LikeIcon sx={{ color: pink[500] }} />
				</IconButton>
			)}
		</>
	);
}
