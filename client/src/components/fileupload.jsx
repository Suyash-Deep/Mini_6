import React, { useState, useEffect } from "react";
import AnnotationComponent from "./AnnotationComponent";
import { saveAs } from "file-saver";
import TaggingProgress from "./taggingprogress";
import LabelContainer from "./tagging";

const FileUpload = ({ uploadedFile }) => {
	const [sentences, setSentences] = useState([]);
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
	const [allAnnotations, setAllAnnotations] = useState([]);
	const [selectedTag, setSelectedTag] = useState("");
	const [tagColor, setTagColor] = useState("");
	const [tagColors, setTagColors] = useState([]);
	const handleTagSelect = (tag, color) => {
		setSelectedTag(tag);
		setTagColor(color);
	};
	useEffect(() => {
		if (uploadedFile) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const text = e.target.result;
				const sentencesArray = text
					.split(/[\.\?!.\n]/)
					.filter((sentence) => sentence.trim() !== "");
				setSentences(sentencesArray);
				setAllAnnotations(new Array(sentencesArray.length).fill([]));
			};
			reader.readAsText(uploadedFile, "UTF-8");
		}
	}, [uploadedFile]);

	const handleSaveAnnotations = (annotations) => {
		setAllAnnotations((prevAnnotations) => {
			const newAnnotations = [...prevAnnotations];
			newAnnotations[currentSentenceIndex] = annotations;
			return newAnnotations;
		});
	};

	const handleAnnotationChange = (annotations) => {
		handleSaveAnnotations(annotations);
	};

	const handleNext = () => {
		if (currentSentenceIndex < sentences.length - 1) {
			setCurrentSentenceIndex(currentSentenceIndex + 1);
		}
	};

	const handlePrevious = () => {
		if (currentSentenceIndex > 0) {
			setCurrentSentenceIndex(currentSentenceIndex - 1);
		}
	};

	// const handleSelectTag = (tag) => {
	//   setSelectedTag(tag);
	// };

	// Handler function to change the selected tag
	const handleTagChange = (tag) => {
		setSelectedTag(tag);
	};

	const handleSaveAllAnnotations = () => {
		const annotatedSentences = sentences.map((sentence, index) => {
			const annotations = allAnnotations[index];
			const words = sentence.split(" "); // Split the sentence into words
			let startWordIndex = -1;
			let endWordIndex = -1;

			// Find the index of the start word
			let wordIndex = 0;
			for (let i = 0; i < words.length; i++) {
				if (words[i] === annotations.start) {
					startWordIndex = wordIndex;
					break;
				}
				wordIndex += words[i].length + 1; // Add 1 for the space
			}

			// Find the index of the end word
			if (startWordIndex !== -1) {
				wordIndex = 0;
				for (let i = 0; i < words.length; i++) {
					if (i >= startWordIndex && words[i] === annotations.end) {
						endWordIndex = wordIndex + words[i].length - 1; // Adjust for the last character of the end word
						break;
					}
					wordIndex += words[i].length + 1; // Add 1 for the space
				}
			}

			return {
				sentence,
				annotations: {
					...annotations,
					start: startWordIndex,
					end: endWordIndex,
				},
			};
		});

		const jsonValue = JSON.stringify(annotatedSentences, null, 2);
		const blob = new Blob([jsonValue], { type: "application/json" });
		saveAs(blob, "all_annotations.json");
	};

	return (
		<div>
			<AnnotationComponent
				currentSentence={sentences[currentSentenceIndex]}
				annotations={allAnnotations[currentSentenceIndex]}
				onSave={handleSaveAnnotations}
				onAnnotationChange={handleAnnotationChange}
				selectedTag={selectedTag}
				onTagChange={handleTagChange}
				tagColors={tagColors}
			/>
			<div className="buttonc">
				<div style={{ display: "flex", alignItems: "center" }}>
					<TaggingProgress
						totalSentences={sentences.length}
						completedSentences={currentSentenceIndex + 1}
					/>
					<div style={{ marginLeft: "50px", fontSize: "1em" }}>
						Selected Tag: {selectedTag}
					</div>
				</div>

				<button onClick={handlePrevious} disabled={currentSentenceIndex === 0}>
					Previous
				</button>
				<button
					onClick={handleNext}
					disabled={currentSentenceIndex === sentences.length - 1}
				>
					Next
				</button>
				<button onClick={handleSaveAllAnnotations}>Save All Annotations</button>
			</div>

			<LabelContainer
				onSelectTag={(tag, color) => {
					setSelectedTag(tag);
					setTagColors((prevColors) => [...prevColors, color]);
				}}
			/>
		</div>
	);
};

export default FileUpload;
