import React from "react";
import PropTypes from "prop-types";

export const PageTitle = (props) => (
	<header className="col-1 movedFromTop header">
		{props.background && <img src={"/img/"+props.background} alt="Post photo" className="bigPostPhoto"/>}
		{props.children}
		<h1>{props.title}</h1>
	</header> );

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  background: PropTypes.string
};
