import React, { useState } from "react";
import { TokenAnnotator } from "react-text-annotate";
import "./tag.css";

const AnnotationComponent = ({
	currentSentence,
	annotations,
	onSave,
	onAnnotationChange,
	selectedTag,
	tagColors,
}) => {
	const handleChange = (value) => {
		onAnnotationChange(value);
	};

	const tokens = currentSentence ? currentSentence.split(" ") : [];

	return (
		<div style={{ padding: 24, fontFamily: "IBM Plex Sans", fontSize: 20 }}>
			<div className="sentence-container">
				<div className="annotator-container">
					<TokenAnnotator
						tokens={tokens}
						value={annotations}
						onChange={handleChange}
						getSpan={(span) => ({
							...span,
							selectedTag,
						})}
						renderMark={(props) => (
							<mark
								key={props.key}
								onClick={() => {
									const index = annotations.findIndex(
										(a) =>
											a.start === props.start &&
											a.end === props.end &&
											a.tag === props.tag
									);
									if (index === -1) {
										handleChange([
											...annotations,
											{
												start: props.start,
												end: props.end,
												tag: props.tag,
											},
										]);
									} else {
										handleChange([
											...annotations.slice(0, index),
											...annotations.slice(index + 1),
										]);
									}
								}}
								style={{
									padding: ".2em .3em",
									margin: "0 .25em",
									lineHeight: "1",
									backgroundColor:
										tagColors.find((item) => item.tag === props.tag)?.color || "#636368", // Modified to get color based on tag
									display: "inline-block",
									borderRadius: ".45em",
								}}
							>
								<span className="tag-content">{props.content}</span>{" "}
								<span className="tag-label">{props.selectedTag}</span>
							</mark>
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnnotationComponent;
