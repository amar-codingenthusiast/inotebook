import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Notes from "./Components/Notes";
import About from "./Components/About";
import Contacts from "./Components/Contacts";
import Alert from "./Components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/Notes/NoteState";
import AlertState from "./Context/Alert/AlertState";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
	useEffect(() => {
		const shownWarning = sessionStorage.getItem("shownWarning");
		if (!shownWarning) {
			alert(
				"Please note: The server is hosted on Glitch.com and may take up to 1 minute to wake up on the first request. After waking up, it will function smoothly. Thank you for your patience."
			);
			sessionStorage.setItem("shownWarning", "true");
		}
	}, []);
	return (
		<NoteState>
			<AlertState>
				<Router basename="inotebook">
					<Navbar />
					<Alert />
					<Routes>
						<Route path="/" element={<Notes />} />
						<Route path="/about" element={<About />} />
						<Route path="/contacts" element={<Contacts />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
					</Routes>
					<Footer />
				</Router>
			</AlertState>
		</NoteState>
	);
}

export default App;
