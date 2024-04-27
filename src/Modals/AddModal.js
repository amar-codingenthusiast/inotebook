import { useContext, useState, useEffect } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import AlertContext from "../Context/Alert/AlertContext";

export default function AddModal() {
	const noteContext = useContext(NoteContext);
	const alertContext = useContext(AlertContext);

	const [note, setNote] = useState({
		title: "",
		description: "",
		tag: "",
	});

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	const handleClick = (e) => {
		e.preventDefault();
		const tagValue = note.tag.trim() === "" ? "General" : note.tag;
		noteContext.addNote(note.title, note.description, tagValue);
		alertContext.showAlert("success", "Your note added successfully!");
		setNote({ title: "", description: "", tag: "" });
	};

	useEffect(() => {
		const addModal = document.getElementById("addModal");
		const handleModalHide = () => {
			setNote({
				title: "",
				description: "",
				tag: "",
			});
		};
		addModal.addEventListener("hide.bs.modal", handleModalHide);
		return () => {
			addModal.removeEventListener("hide.bs.modal", handleModalHide);
		};
	}, []);

	return (
		<div
			className="modal fade"
			id="addModal"
			tabIndex={-1}
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">
							Add A Note
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						/>
					</div>
					<div className="modal-body">
						<form id="addForm">
							<div className="mb-3">
								<label htmlFor="title" className="form-label">
									Title*
								</label>
								<input
									type="text"
									className="form-control"
									id="title"
									name="title"
									placeholder="Write minimum 3 characters"
									value={note.title}
									onChange={onChange}
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="description"
									className="form-label"
								>
									Description*
								</label>
								<textarea
									type="text"
									className="form-control"
									rows="5"
									id="description"
									name="description"
									placeholder="Write minimum 5 characters"
									value={note.description}
									onChange={onChange}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="tag" className="form-label">
									Tag
								</label>
								<input
									type="text"
									className="form-control"
									id="tag"
									name="tag"
									placeholder="General"
									value={note.tag}
									onChange={onChange}
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="btn btn-primary"
							data-bs-dismiss="modal"
							disabled={
								note.title.length < 3 ||
								note.description.length < 5
							}
							onClick={handleClick}
						>
							Add Note
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
