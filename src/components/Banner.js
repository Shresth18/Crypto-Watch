import React from "react";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Carousel from "./Carousel";

const useStyles = makeStyles()((theme) => ({
	banner: {
		backgroundImage: "url(./banner.jpg)",
	},
	bannerContent: {
		height: 400,
		display: "flex",
		flexDirection: "column",
		paddingTop: 25,
		justifyContent: "space-around",
	},
	tagline: {
		display: "flex",
		height: "40%",
		flexDirection: "column",
		justifyContent: "center",
		textAlign: "center",
	},
	carousel: {
		height: "50%",
		display: "flex",
		alignItems: "center",
	},
}));

export default function Banner() {
	const { classes } = useStyles();

	return (
		<div className={classes.banner}>
			<Container className={classes.bannerContent}>
				<div className={classes.tagline}>
					<Typography
						variant="h3"
						style={{
							fontWeight: "bold",
							marginBottom: 15,
							fontFamily: "Montserrat",
						}}
					>
						Crypto Watch
					</Typography>
					<Typography
						variant="subtitle1"
						style={{
							color: "darkgrey",
							textTransform: "capitalize",
							fontFamily: "Montserrat",
						}}
					>
						Get all the info regarding your favorite Crypto Currency
					</Typography>
				</div>
				<Carousel />
			</Container>
		</div>
	);
}
