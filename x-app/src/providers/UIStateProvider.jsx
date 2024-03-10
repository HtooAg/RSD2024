import { useState, useContext, createContext } from "react";

const UIContext = createContext();
export function useUIState() {
	return useContext(UIContext);
}

export default function UIProvider({ children }) {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [openFeedback, setOpenFeedback] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState("");
	return (
		<UIContext.Provider
			value={{
				openDrawer,
				setOpenDrawer,
				openFeedback,
				setOpenFeedback,
				feedbackMessage,
				setFeedbackMessage,
			}}
		>
			{children}
		</UIContext.Provider>
	);
}
