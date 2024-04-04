import React, { useState } from "react";
import "./tag.css"; // Import the CSS file

const LabelContainer = ({ onSelectTag }) => {
	const [labels, setLabels] = useState([]);
	const [newLabel, setNewLabel] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [editIndex, setEditIndex] = useState(null);
	const [tagColors, setTagColors] = useState([]);
	const [deleteMode, setDeleteMode] = useState(false); // State to track delete mode

	// Define an array of colors
	const colorPalette = [
		"#ffcccc",
		"#ccffcc",
		"#ccccff",
		"#ffffcc",
		"#ffccff",
		"#ccffff",
		"#ffd8a8",
		"#d8a8ff",
		"#a8ffd8",
		"#d8d8ff",
		// Add more colors as needed
	];

	const handleAddLabel = () => {
		if (newLabel.trim() !== "") {
			const capitalizedLabel = newLabel.trim().toUpperCase(); // Capitalize the label
			setLabels([...labels, capitalizedLabel]);
			setNewLabel("");

			// Assign a color from the color palette to the new label
			const colorIndex = labels.length % colorPalette.length;
			const newTagColors = [...tagColors];
			newTagColors.push(colorPalette[colorIndex]);
			setTagColors(newTagColors);
		}
	};

	const handleSelectTag = (tag, color) => {
		if (deleteMode) {
			// Delete the selected tag
			const indexToDelete = labels.indexOf(tag);
			if (indexToDelete !== -1) {
				const updatedLabels = [...labels];
				updatedLabels.splice(indexToDelete, 1);
				setLabels(updatedLabels);

				const updatedTagColors = [...tagColors];
				updatedTagColors.splice(indexToDelete, 1);
				setTagColors(updatedTagColors);
			}
			setDeleteMode(false); // Exit delete mode after deleting the tag
		} else {
			// Handle tag selection as normal
			onSelectTag(tag, color);
		}
	};

	const handleDeleteMode = () => {
		if (!editMode) {
			// Toggle delete mode
			setDeleteMode(!deleteMode);
		} else {
			// Exit edit mode
			setEditMode(false);
			setNewLabel("");
		}
	};

	const handleCancel = () => {
		setEditMode(false);
		setNewLabel("");
		setDeleteMode(false); // Exit delete mode when cancelling edit
	};

	const handleLabelChange = (e, index) => {
		const updatedLabels = [...labels];
		updatedLabels[index] = e.target.value;
		setLabels(updatedLabels);
	};

	console.log(tagColors);

	return (
		<div className="container">
			<div className="label-input">
				<input
					type="text"
					value={newLabel}
					onChange={(e) => setNewLabel(e.target.value)}
				/>
				{editMode ? null : (
					<button className="add-btn" onClick={handleAddLabel}>
						Add Label
					</button>
				)}
				<button
					className={
						editMode
							? "cancel-btn"
							: deleteMode
							? "cancel-btn red"
							: "delete-btn"
					} // Change class based on edit mode and delete mode
					onClick={editMode ? handleCancel : handleDeleteMode} // Change action based on edit mode
				>
					{editMode ? "Cancel" : deleteMode ? "Cancel" : "Delete"}
				</button>
			</div>
			<div>
				{labels.map((label, index) => (
					<div
						key={index}
						onClick={() => handleSelectTag(label, tagColors[index])}
						className="label"
					>
						<input
							type="text"
							value={label}
							onChange={(e) => handleLabelChange(e, index)}
							readOnly={!editMode}
						/>
						{editMode && (
							<span
								className="delete-icon"
								onClick={() => handleSelectTag(label, tagColors[index])} // Trigger tag deletion when clicked in edit mode
							>
								&#10060;
							</span>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default LabelContainer;
