import {
	Box,
	Card,
	Typography,
	CircularProgress,
	Avatar,
	Button
} from "@mui/material";

import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../providers/AuthProvider";

import { useParams } from "react-router-dom";
import { blue, pink } from "@mui/material/colors";
export default function Profile() {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const { auth, authUser } = useAuth();
	const [user, setUser] = useState({});
	const [photo, setPhoto] = useState("");
	const [cover, setCover] = useState("");
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const api = import.meta.env.VITE_API_URL;
			const res = await fetch(`${api}/posts/profile/${id}`);
			const data = await res.json();
			setPosts(data);
			setIsLoading(false);
		})();
	}, []);

	const like = _id => {
		const result = posts.map(post => {
			if (post._id === _id) {
				post.likes.push(authUser._id);
			}

			return post;
		});

		setPosts(result);
	};

	const unlike = _id => {
		const result = posts.map(post => {
			if (post._id === _id) {
				post.likes = post.likes.filter(like => like !== authUser._id);
			}

			return post;
		});

		setPosts(result);
	};

	const getFile = async () => {
		const [fileHandle] = await window.showOpenFilePicker({
			types: [
				{
					description: "Images",
					accept: {
						"image/*": [".png", ".jpeg", ".jpg"]
					}
				}
			],
			excludeAcceptAllOption: true,
			multiple: false
		});

		return await fileHandle.getFile();
	};

	const changePhoto = async e => {
		const uid = "auto_id";
		const api = "api_url";
		const file = await getFile();

		setPhoto(URL.createObjectURL(file));

		const fileName =
			file.type === "image/png" ? `${uid}-cover.png` : `${uid}-cover.jpg`;

		const formData = new FormData();
		formData.append("photo", file, fileName);
	};
	const changeCover = async e => {
		const uid = "auto_id";
		const api = "api_url";
		const file = await getFile();

		setCover(URL.createObjectURL(file));

		const fileName =
			file.type === "image/png" ? `${uid}-cover.png` : `${uid}-cover.jpg`;

		const formData = new FormData();
		formData.append("photo", file, fileName);
	};

	return (
		<Box>
			<Box
				sx={{
					background: blue[500],
					height: 200,
					borderRadius: 5,
					cursor: "pointer",
					overflow: "hidden"
				}}
				onClick={async () => {
					changeCover();
				}}>
				<img src={cover} width="100%" alt="" />
			</Box>
			<Box
				sx={{
					marginTop: "-64px",
					marginBottom: "40px",
					textAlign: "center"
				}}>
				<Button
					onClick={async () => {
						changePhoto(authUser._id);
					}}>
					<Avatar
						src={photo}
						sx={{
							background: pink[500],
							width: 128,
							height: 128
						}}>
						{/* {authUser.name[0]} */}
					</Avatar>
				</Button>
			</Box>
			{isLoading ? (
				<>
					<Box
						sx={{
							display: "flex",
							height: 200,
							alignItems: "center",
							justifyContent: "center"
						}}>
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
					{posts.map(post => (
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
