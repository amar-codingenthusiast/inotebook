import AlertContext from "./AlertContext";
import { useState } from "react";

export default function AlertState(props) {
	const [alert, setAlert] = useState(null);
	const showAlert = (type, msg) => {
		setAlert({type, msg});
		setTimeout(() => setAlert(null), 3000);
	};
	return (
		<AlertContext.Provider value={{ alert, showAlert }}>
			{props.children}
		</AlertContext.Provider>
	);
}
