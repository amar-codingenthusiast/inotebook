import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../Context/Alert/AlertContext";

export default function Login() {
	const navigate = useNavigate();
	const alertContext = useContext(AlertContext);
	const [cred, setCred] = useState({ email: "", password: "" });
	const [hidePassword, setHidePassword] = useState(true);
	const onChange = (e) => {
		setCred({ ...cred, [e.target.name]: e.target.value });
	};

	const login = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:5000/api/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
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
					"You are successfully logged in!"
				);
				navigate("/");
			} else {
				alertContext.showAlert(
					"danger",
					"Invalid Credentials. Write email and password correctly!"
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
					height: "340px",
					width: "350px",
					padding: "10px",
					borderRadius: "10px",
					boxShadow: "0 0 10px black",
				}}
			>
				<h4
					style={{ textAlign: "center", textDecoration: "underline" }}
				>
					Login Page
				</h4>
				<form>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address*
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="your email"
							onChange={onChange}
						/>
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
							placeholder="your password"
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
							cred.email.length < 10 || cred.password.length < 8
						}
						onClick={login}
					>
						Login
					</button>
				</form>
				<div className="my-2">
					Don't have an account? <a href="/signup">Signup here</a>
				</div>
			</div>
		</div>
	);
}
