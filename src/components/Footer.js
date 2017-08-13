import React from "react";
import FaHeart from "react-icons/lib/fa/heartbeat";

export const Footer=(props) => (
	<footer className="col-1 footer" style={props.style}>
		<div className="col-1 center">
			<h4>
				<span id="heart" className="icon">
					<FaHeart size={30} fill="white"/>
				</span>  
			</h4>
		</div>
	</footer>
);
