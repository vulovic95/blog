import React from "react";
import PropTypes from "prop-types";

export const Pagination = (props) => (
  <div className="pagination">
  	<button className="paginateButton decrement" onClick={props.onDecrement}>&larr;</button>
  	<button className="paginateButton increment" onClick={props.onIncrement}>&rarr;</button>
  </div>                
 );

Pagination.propTypes = {
	onDecrement:PropTypes.func.isRequired,
	onIncrement:PropTypes.func.isRequired
}