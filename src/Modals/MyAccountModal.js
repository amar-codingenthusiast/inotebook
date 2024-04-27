import { useNavigate } from "react-router-dom";

export default function MyAccountModal(props) {
	const navigate = useNavigate();
	const user = localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: null;
	return (
		<div
			className="modal fade"
			id="myAccountModal"
			tabIndex={-1}
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">
							My Account Details
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						/>
					</div>
					<div className="modal-body">
						<p>
							<strong>Name: </strong>
							{user.name}
						</p>
						<p>
							<strong>Email: </strong>
							{user.email}
						</p>
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
							type="button"
							data-bs-dismiss="modal"
							className="btn btn-primary"
							onClick={() => {
								localStorage.removeItem("authtoken");
								localStorage.removeItem("user");
								navigate("/login");
							}}
						>
							Log out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
