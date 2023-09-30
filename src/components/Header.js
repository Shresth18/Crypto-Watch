import React from "react";
import {
	AppBar,
	Container,
	MenuItem,
	Select,
	Toolbar,
	Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles()((theme) => ({
	title: {
		flex: 1,
		color: "gold",
		fontFamily: "Montserrat",
		fontWeight: "bold",
		cursor: "pointer",
	},
}));

const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
		mode: "dark",
	},
});

export default function Header() {
	const { classes } = useStyles();
	const { currency, setCurrency } = CryptoState();
	const navigate = useNavigate();

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar color="transparent" position="static">
				<Container>
					<Toolbar>
						<Typography
							variant="h6"
							className={classes.title}
							onClick={() => navigate("/")}
						>
							Crypto Watch
						</Typography>
						<Select
							variant="outlined"
							value={currency}
							style={{
								width: 100,
								height: 40,
								marginLeft: 15,
								borderWidth: 2,
							}}
							onChange={(e) => setCurrency(e.target.value)}
						>
							<MenuItem value={"USD"}>
								<i style={{ color: "gold" }}>$ </i> USD
							</MenuItem>
							<MenuItem value={"INR"}>
								<i style={{ color: "gold" }}>₹ </i> INR
							</MenuItem>
						</Select>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
}
