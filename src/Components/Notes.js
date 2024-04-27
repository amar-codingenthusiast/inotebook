import { useContext, useEffect, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import NoteItem from "./NoteItem";
import AddModal from "../Modals/AddModal";
import UpdateModal from "../Modals/UpdateModal";
import DeleteModal from "../Modals/DeleteModal";
import { useNavigate } from "react-router-dom";

export default function Notes() {
	const navigate = useNavigate();
	const noteContext = useContext(NoteContext);
	useEffect(() => {
		if (localStorage.getItem("authtoken")) {
			noteContext.fetchAllNotes();
		} else {
			navigate("/login");
		}
		// eslint-disable-next-line
	}, []);

	const [note, setNote] = useState([]);

	return (
		<div className="container my-3">
			<div className="row">
				<div className="d-flex justify-content-between">
					<h3>Your Notes</h3>
					<button
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#addModal"
					>
						Add A New Note
					</button>
					<AddModal />
				</div>
				<div style={{ minHeight: "68.2vh" }}>
					<hr />
					{noteContext.notes.length === 0 ? (
						<div
							className="d-flex justify-content-center align-items-center"
							style={{ height: "100%" }}
						>
							<h2>iNoteBook is empty, add your 1st note.</h2>
						</div>
					) : (
						<div>
							{
							// Array.isArray(noteContext.notes) &&
								noteContext.notes.map((note) => (
									<NoteItem
										note={note}
										key={note._id}
										setNote={setNote}
									/>
								))}
							<DeleteModal note={note} />
							<UpdateModal note={note} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
