import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Template from "./Template";
import App from "./App";
import Edit from "./Edit";

const api = "http://localhost:8888/task";
export default function AppRouter() {
	const [list, setList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			fetch(api);
			const res = await fetch(api);
			const data = await res.json();
			setList(data);
			setIsLoading(false);
		})();
	}, []);

	// useEffect(() => {
	// 	fetch(api)
	// 		.then((res) => res.json())
	// 		.then((json) => setList(json));
	// }, []);

	const add = async (subject) => {
		const res = await fetch(api, {
			method: "post",
			body: JSON.stringify({ subject }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		setList([...list, data]);
	};

	const remove = (_id) => {
		fetch(`${api}/${_id}`, {
			method: "delete",
		});
		setList(list.filter((item) => item._id !== _id));
	};

	const toggle = (_id) => {
		setList(
			list.map((item) => {
				if (item._id === _id) item.done = !item.done;
				return item;
			})
		);
	};

	const clear = () => {
		setList(list.filter((item) => !item.done));
	};

	const update = (_id, subject) => {
		if (!subject) return false;
		fetch(`${api}/${_id}`, {
			method: "put",
			body: JSON.stringify({ subject }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		setList(
			list.map((item) => {
				if (item._id === _id) item.subject = subject;
				return item;
			})
		);
	};
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<Template list={list} clear={clear} isLoading={isLoading} />
			),
			children: [
				{
					path: "/",
					element: (
						<App
							list={list}
							add={add}
							remove={remove}
							toggle={toggle}
						/>
					),
				},
				{
					path: "/edit",
					element: <Edit update={update} />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}
