// ImageDisplayComponent.js
import React, { useState } from "react";

const ImageDisplayComponent = () => {
	const [imageUrl, setImageUrl] = useState("");
	const [displayedImageUrl, setDisplayedImageUrl] = useState("");

	const handleChange = (e) => {
		setImageUrl(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setDisplayedImageUrl(imageUrl);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter image URL"
					value={imageUrl}
					onChange={handleChange}
				/>
				<button type="submit">Display Image</button>
			</form>
			{displayedImageUrl && (
				<div>
					<img src={displayedImageUrl} alt="Displayed Image" />
				</div>
			)}
		</div>
	);
};

export default ImageDisplayComponent;
