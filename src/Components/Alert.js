import React, {useContext} from "react";
import AlertContext from "../Context/Alert/AlertContext";

export default function Alert(props) {
	const alertContext = useContext(AlertContext);
	return (
		<div style={{ height: "40px", width: "100%", position: "sticky", top: "0px" }}>
			{alertContext.alert && (
				<div
					className={`alert alert-${alertContext.alert.type}`}
					style={{ padding: "4px" }}
					role="alert"
				>
					{alertContext.alert.msg}
				</div>
			)}
		</div>
	);
}
