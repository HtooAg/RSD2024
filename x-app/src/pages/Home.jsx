import { Box, Card, Typography, CircularProgress } from "@mui/material";

import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../providers/AuthProvider";
export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const { auth, authUser } = useAuth();

	const like = (_id) => {
		const result = posts.map((post) => {
			if (post._id === _id) {
				post.likes.push(authUser._id);
			}
			return post;
		});
		setPosts(result);
	};

	const unlike = (_id) => {
		const result = posts.map((post) => {
			if (post._id === _id) {
				post.likes = post.likes.filter((like) => like !== authUser._id);
			}
			return post;
		});
		setPosts(result);
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const api = import.meta.env.VITE_API_URL;
			const res = await fetch(`${api}/posts`);
			const data = await res.json();
			setPosts(data);
			setIsLoading(false);
		})();
	}, []);

	return (
		<Box>
			{isLoading ? (
				<>
					<Box
						sx={{
							display: "flex",
							height: 200,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<CircularProgress />
					</Box>
					<Box>
						<Typography variant="h6" sx={{ textAlign: "center" }}>
							Loading ...
						</Typography>
					</Box>
				</>
			) : (
				<>
					{posts.map((post) => (
						<PostCard
							post={post}
							like={like}
							unlike={unlike}
							key={post._id}
						/>
					))}
				</>
			)}
		</Box>
	);
}
