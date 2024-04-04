import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Navbar from "./components/navbar.jsx";


function App() {
	const user = localStorage.getItem("token");


	return (
		<Routes>
			{<Route path="/navbar" exact element={<Navbar />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/" exact element={<Login />} />
			{/* <Route path="/" element={<Navigate replace to="/navbar" />} /> */}
			{/* <Route path="/navbar" exact element={<Navbar />} /> */}
		</Routes>
	);

};

export default App;
