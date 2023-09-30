import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { CryptoState } from "../CryptoContext";
import SelectButton from "./SelectButton";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const useStyles = makeStyles()((theme) => ({
	container: {
		width: "75%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
		padding: 40,
		[theme.breakpoints.down("md")]: {
			width: "100%",
			marginTop: 0,
			padding: 20,
			paddingTop: 0,
		},
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

const chartDays = [
	{
		label: "24 Hours",
		value: 1,
	},
	{
		label: "30 Days",
		value: 30,
	},
	{
		label: "3 Months",
		value: 90,
	},
	{
		label: "1 Year",
		value: 365,
	},
];

export default function CoinInfo({ coin }) {
	const [historicData, setHistoricData] = useState([]);
	const [days, setDays] = useState(1);
	const [flag, setflag] = useState(false);
	const { currency } = CryptoState();
	const { classes } = useStyles();

	useEffect(() => {
		let cancelRequest = false;
		const fetchHistoricData = async () => {
			try {
				const { data } = await axios.get(
					HistoricalChart(coin.id, days, currency)
				);
				if (!cancelRequest) {
					setflag(true);
					setHistoricData(data.prices);
					console.log(data.prices);
				}
			} catch (error) {
				console.log(error);
			}
		};

		console.log(coin);
		fetchHistoricData();
		return () => {
			cancelRequest = true;
		};
	}, [days, currency, coin.id]);

	const chartData = {
		labels: historicData.map((coin) => {
			let date = new Date(coin[0]);
			let time =
				date.getHours() > 12
					? `${date.getHours() - 12}:${date.getMinutes()} PM`
					: `${date.getHours()}:${date.getMinutes()} AM`;
			return days === 1 ? time : date.toLocaleDateString();
		}),

		datasets: [
			{
				data: historicData.map((coin) => coin[1]),
				label:
					days === 1
						? `Price ( Past 24 Hours ) in ${currency}`
						: `Price ( Past ${days} Days ) in ${currency}`,
				backgroundColor: "rgba(238, 188, 29, 0.5)",
				borderColor: "rgb(238, 188, 29)",
				borderWidth: 1.5,
				pointRadius: 1.5,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom",
			},
		},
		// elements: {
		// 	point: {
		// 		radius: 1,
		// 	},
		// },
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<div className={classes.container}>
				{!historicData | (flag === false) ? (
					<CircularProgress
						style={{ color: "gold" }}
						size={250}
						thickness={1}
					/>
				) : (
					<>
						<Line data={chartData} options={options} />
						<div
							style={{
								display: "flex",
								marginTop: 20,
								justifyContent: "space-around",
								width: "100%",
							}}
						>
							{chartDays.map((day) => (
								<SelectButton
									key={day.value}
									onClick={() => {
										setDays(day.value);
										setflag(false);
									}}
									selected={day.value === days}
								>
									{day.label}
								</SelectButton>
							))}
						</div>
					</>
				)}
			</div>
		</ThemeProvider>
	);
}
