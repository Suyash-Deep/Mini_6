import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import FileUpload from "./fileupload";
import "./navbar.css";


export const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const fileInputRef = useRef(null);
	const [uploadedFile, setUploadedFile] = useState(null);

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (!file) return;

		setUploadedFile(file);
	};

	const handleClickImport = () => {
		fileInputRef.current.click();
	};

	return (
		<div>
			<nav>
				<NavLink to="/" className="title">
					Annotify
				</NavLink>
				<div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<ul className={menuOpen ? "open" : ""}>
					<li>
						{/* Hidden file input field */}
						<input
							type="file"
							onChange={handleFileUpload}
							accept=".txt"
							ref={fileInputRef}
							style={{ display: "none" }}
						/>
						{/* NavLink to trigger file input field */}
						<NavLink
							to="#"
							onClick={handleClickImport}
							style={{
								textDecoration: "none",
								display: "inline-block",
								border: "1px solid transparent",
								borderRadius: "0.7rem",
								borderColor: "Background"
							}}
						>
							Import a File
						</NavLink>
					</li>

					<li>
						<NavLink to="/annotations">Annotations</NavLink>
					</li>
					<li>
						<NavLink to="/tags">Tags</NavLink>
					</li>
					{/* Add links to the login and signup pages */}
					<li>
						<NavLink to="/">Logout</NavLink>
					</li>
				</ul>
			</nav>

			<div>
				{" "}
				<FileUpload uploadedFile={uploadedFile} />
			</div>
		</div>
	);
};

export default Navbar;
