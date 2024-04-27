export default function NoteItem(props) {
	const { title, description, tag, createdAt, updatedAt } = props.note;

	const formatDate = (date) => {
		return new Date(date).toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
			timeZone: "Asia/Kolkata",
		});
	};

	const showUpdateTime =
		new Date(updatedAt).getTime() !== new Date(createdAt).getTime();

	return (
		<div>
			<div className="d-flex justify-content-between">
				<div>
					<h5 className="d-inline me-2">{title}</h5>
					<span
						style={{
							color: "white",
							backgroundColor: "#4987eb",
							padding: "1px 4px",
							borderRadius: "8px",
							fontSize: "13px",
						}}
					>
						{tag}
					</span>
				</div>
				<div>
					<i
						className="fas fa-trash me-4"
						style={{ cursor: "pointer" }}
						title="Delete"
						data-bs-toggle="modal"
						data-bs-target="#deleteModal"
						onClick={() => props.setNote(props.note)}
					></i>
					<i
						className="fas fa-pen"
						style={{ cursor: "pointer" }}
						title="Edit"
						data-bs-toggle="modal"
						data-bs-target="#updateModal"
						onClick={() => props.setNote(props.note)}
					></i>
				</div>
			</div>
			<div className="my-2" style={{ whiteSpace: "pre-wrap" }}>
				{description.split("\n").map((line, index) => (
					<p key={index} style={{ margin: "0" }}>
						{line}
					</p>
				))}
			</div>
			<small>Created: {formatDate(createdAt)}</small>
			<br />
			{showUpdateTime && (
				<small>Last Updated: {formatDate(updatedAt)}</small>
			)}
			<hr />
		</div>
	);
}
