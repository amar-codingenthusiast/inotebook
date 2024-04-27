import { useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import AlertContext from "../Context/Alert/AlertContext";

export default function DeleteModal(props) {
	const noteContext = useContext(NoteContext);
	const alertContext = useContext(AlertContext);
	return (
		<div
			className="modal fade"
			id="deleteModal"
			tabIndex={-1}
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">
							Do you want to Delete it?
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						/>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							No
						</button>
						<button
							type="button"
							data-bs-dismiss="modal"
							className="btn btn-primary"
							onClick={() => {
								noteContext.deleteNote(props.note._id);
								alertContext.showAlert("success", "Your note deleted successfully!");
							}}
						>
							Yes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
