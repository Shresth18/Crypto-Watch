import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/CoinPage";
// import ErrorBoundary from "./Pages/ErrorBoundary";
import {
	// createBrowserRouter,
	// RouterProvider,
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

export default function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				{/* <RouterProvider router={router} /> */}
				<Routes>
					<Route
						path="/"
						element={<Homepage />}
						// errorElement={<ErrorBoundary />}
						exact
					/>
					<Route path="/coins/:id" element={<Coinpage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}
