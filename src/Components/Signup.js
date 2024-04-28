import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../Context/Alert/AlertContext";

export default function Signup() {
	const navigate = useNavigate();
	const alertContext = useContext(AlertContext);
	const [hidePassword, setHidePassword] = useState(true);
	const [cred, setCred] = useState({
		name: "",
		email: "",
		password: "",
	});

	const onChange = (e) => {
		setCred({ ...cred, [e.target.name]: e.target.value });
	};

	const isPasswordStrong = (password) =>
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password);

	const signup = async (e) => {
		e.preventDefault();
		if (!isPasswordStrong(cred.password)) {
			alertContext.showAlert(
				"danger",
				"Your password is weak. Please ensure it contains at least 8 characters, including uppercase, lowercase, numbers, and special characters."
			);
			return;
		}
		try {
			const response = await fetch(
				`https://inotebook-backend-server.glitch.me/api/auth/create-user`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: cred.name,
						email: cred.email,
						password: cred.password,
					}),
				}
			);
			const json = await response.json();
			if (json.success) {
				localStorage.setItem("authtoken", json.authtoken);
				localStorage.setItem("user", JSON.stringify(json.user));
				alertContext.showAlert(
					"success",
					"You are successfully signed up!"
				);
				navigate("/");
			} else {
				alertContext.showAlert(
					"danger",
					"This email is already exists, try to login or use another email."
				);
			}
		} catch (error) {
			alertContext.showAlert(
				"danger",
				"Failed to connect to the server."
			);
		}
	};

	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: "75.6vh" }}
		>
			<div
				style={{
					height: "450px",
					width: "350px",
					padding: "10px",
					borderRadius: "10px",
					boxShadow: "0 0 10px black",
				}}
			>
				<h4
					style={{ textAlign: "center", textDecoration: "underline" }}
				>
					Signup Page
				</h4>
				<form>
					<div className="mb-3">
						<label htmlFor="fullName" className="form-label">
							Name*
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							placeholder="at least 3 characters"
							onChange={onChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address*
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							aria-describedby="emailHelp"
							placeholder="abc@gmail.com"
							onChange={onChange}
						/>
						<div id="emailHelp" className="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password*
						</label>
						<input
							type={hidePassword ? "password" : "text"}
							className="form-control"
							id="password"
							name="password"
							placeholder="at least 8 characters"
							onChange={onChange}
						/>
					</div>
					<div className="mb-3 form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="passwordCheck"
							style={{ cursor: "pointer" }}
							checked={hidePassword}
							onChange={() => setHidePassword(!hidePassword)}
						/>
						<label
							className="form-check-label"
							htmlFor="passwordCheck"
							style={{ cursor: "pointer" }}
						>
							Hide password
						</label>
					</div>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={
							cred.name.length < 3 ||
							cred.email.length < 10 ||
							cred.password.length < 8
						}
						onClick={signup}
					>
						Signup
					</button>
				</form>
				<div className="my-2">
					Already have an account? <a href="/inotebook/login">Login here</a>
				</div>
			</div>
		</div>
	);
}
