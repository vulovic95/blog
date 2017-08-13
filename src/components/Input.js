import React from "react";
import PropTypes from "prop-types";

export const Input = (props) => (
		<div className="wide">
			 {props.label !== 0 && <label htmlFor={props.htmlFor} className="short">{props.htmlFor} </label>}
       {props.type !== "textarea" && <input type={props.type} className={props.additional} name={props.htmlFor} defaultValue={props.defaultValue} placeholder={"Enter "+props.htmlFor} accept={props.accept} onChange={props.onChange} onFocus={props.onFocus} onBlur={props.onBlur} autoComplete="off" min={props.min} max={props.max} maxLength={props.maxLength} required={props.required} />}
       {props.type == "textarea" && <textarea name={props.htmlFor} placeholder={"Enter "+props.htmlFor} onChange={props.onChange} onFocus={props.onFocus} onBlur={props.onBlur} autoComplete="off" required={props.required}/> }
		</div>
	);
Input.defaultProps = {
	label: 1,
	type: "text",
	additional: "",
}
Input.propTypes = {
	htmlFor: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onFocus: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
	onChange:PropTypes.func.isRequired,
	min: PropTypes.number,
	max: PropTypes.number,
	maxLength:PropTypes.number,
	required:PropTypes.string,
	accept:PropTypes.string,
	defaultValue:PropTypes.string,
	additional:PropTypes.string,
	label: PropTypes.oneOf([1, 0])
}
