import React from "react";
import PropTypes from "prop-types";
import FaDownload from "react-icons/lib/md/file-download";

export const WideHomeBackground = (props) => (
	<div className={"homeBackground "+props.additional}>  
      <main>
        <h1 className="homeTitle">{props.title}</h1>
        <h2 className="homeSubtitle"> {props.subtitle}</h2>            
        {props.link && <h4> <a href={props.reference} target="_blank" className="cv-link"><FaDownload size={20}/>{props.link}</a></h4>}
      </main>
  </div>
	);
WideHomeBackground.propTypes = {
	additional: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	link: PropTypes.string,
	reference:PropTypes.string,
	additional: PropTypes.string
}