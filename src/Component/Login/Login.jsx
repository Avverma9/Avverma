import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("admin@gmail.com");
	const [password, setPassword] = useState("Mahi@3332");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://13.48.45.18:4008/admin/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});
			const data = await response.json();
			console.log(data);
			localStorage.setItem("token", data.token);
			// navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input
						style={{ border: "2px solid black" }}
						type='email'
						placeholder='admin@gmail.com'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type='password'
						placeholder='Mahi@3332'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};


export default Login;
