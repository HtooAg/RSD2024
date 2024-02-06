import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Template from "./Template";
import App from "./App";
import Edit from "./Edit";
export default function AppRouter() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Template />,
			children: [
				{
					path: "/",
					element: <App />
				},
				{
					path: "/edit",
					element: <Edit />
				}
			]
		}
	]);
	return <RouterProvider router={router} />;
}
