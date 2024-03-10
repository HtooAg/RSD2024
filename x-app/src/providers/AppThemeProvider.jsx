import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState, useMemo, createContext, useContext } from "react";
const AppThemeContext = createContext();
export function useAppTheme() {
	return useContext(AppThemeContext);
}

export default function AppThemeProvider({ children }) {
	const [mode, setMode] = useState("dark");
	const theme = useMemo(() => {
		return createTheme({
			palette: {
				mode,
				...(mode === "light"
					? {
							header: { background: "primary" },
							banner: { background: grey[400] },
					  }
					: {
							header: { background: "dark" },
							banner: { background: grey[700] },
					  }),
			},
		});
	}, [mode]);
	return (
		<AppThemeContext.Provider value={{ mode, setMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppThemeContext.Provider>
	);
}
