import React from "react";
import FaBars from "react-icons/lib/fa/bars";
import FaSearch from "react-icons/lib/fa/search";
import {firebaseApp} from "../firebase";
import FaLogOut from "react-icons/lib/go/sign-out";

export class Header extends React.Component{
	logOut(){
		firebaseApp.auth().signOut();
		window.location.pathname="/";
	}
	handleAuth(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(provider);
  }
	render() {
  	return(
  		<div className="pre-header">
		    <div className="centeredContent">
		    	<section className="col-p-5">
			      <span id="menuIcon" className="menuIcon"><FaBars size={20} fill={"white"}/>
			      <img src="/img/logowhiteman.png" className="logoImg" alt="Logo" title="Ivan Vulović"/>
			      </span>
				   </section>
			    <section className="col-p-5 ta-right">
       		 <button type="button" id="buttonLogout" className="materialButton google hide" onClick={() => this.logOut()}>Sign Out</button>
       		 <button type="button" id="buttonLogin" className="materialButton google hide" onClick={()=>this.handleAuth()}>Sign In</button>
			    </section>
			    <div className="clear"></div>
		    </div>
		  </div>
  	);
	}
}
