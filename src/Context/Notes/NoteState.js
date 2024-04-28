import NoteContext from "./NoteContext";
import { useState } from "react";

export default function NoteState(props) {
	const host = "https://inotebook-backend-server.glitch.me";
	const [notes, setNotes] = useState([]);

	const fetchAllNotes = async () => {
		const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authtoken: localStorage.getItem("authtoken"),
			},
		});
		const allNote = await response.json();
		setNotes(allNote);
	};

	const addNote = async (title, description, tag) => {
		await fetch(`${host}/api/notes/add-note`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authtoken: localStorage.getItem("authtoken"),
			},
			body: JSON.stringify({ title, description, tag }),
		});
		fetchAllNotes();
	};

	const deleteNote = async (_id) => {
		await fetch(`${host}/api/notes/delete-note/${_id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				authtoken: localStorage.getItem("authtoken"),
			},
		});
		fetchAllNotes();
	};

	const updateNote = async (_id, title, description, tag) => {
		await fetch(`${host}/api/notes/update-note/${_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				authtoken: localStorage.getItem("authtoken"),
			},
			body: JSON.stringify({ title, description, tag }),
		});
		fetchAllNotes();
	};
	return (
		<NoteContext.Provider
			value={{
				notes,
				addNote,
				deleteNote,
				updateNote,
				fetchAllNotes,
			}}
		>
			{props.children}
		</NoteContext.Provider>
	);
}
