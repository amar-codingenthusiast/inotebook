import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MyAccountModal from "../Modals/MyAccountModal";

export default function Navbar() {
	const location = useLocation();
	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					iNoteBook
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/"
							>
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/about">
								About
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/contacts">
								Contacts
							</NavLink>
						</li>
					</ul>
					{localStorage.getItem("authtoken") ? (
						<>
							<button
								className="btn btn-primary"
								data-bs-toggle="modal"
								data-bs-target="#myAccountModal"
							>
								My Account
							</button>
							<MyAccountModal />
						</>
					) : (
						<>
							{location.pathname === "/login" ? (
								<NavLink
									className="btn btn-primary"
									role="button"
									to="/signup"
								>
									Signup
								</NavLink>
							) : (
								<NavLink
									className="btn btn-primary"
									role="button"
									to="/login"
								>
									Login
								</NavLink>
							)}
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
