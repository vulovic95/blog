import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import FaHome from "react-icons/lib/fa/home"; 
import FaBlog from "react-icons/lib/md/library-books";
import FaPost from "react-icons/lib/md/create";
import FaUser from "react-icons/lib/fa/user"; 
import FaSettings from "react-icons/lib/md/settings";
import FaTutorial from "react-icons/lib/fa/folder-open";

export class Menu extends React.Component{
  componentDidMount(){
  }
  getDisplayName(){
    return this.props.user == null ? "" : this.props.user.providerData[0].displayName;
  }
  getPhotoURL(){
    return this.props.user == null ? "" : this.props.user.providerData[0].photoURL;
  }
  render() {
    var displayName=this.getDisplayName();
    var photoURL=this.getPhotoURL();
    return(
      <nav className="menu" id="menu">
      <div className="userInfo">
        <li><img className="userPhoto" src={photoURL} alt=""/></li>
        <li className="displayName">{displayName}</li>
      </div>
      {this.props.user == null && <p>Menu</p> }
      <ul>
        <li className="dividerLi">Pages</li>
        <li><NavLink exact activeClassName="activeLink" to="/"><FaHome size={20} className="smallMenuIcon"/>Home</NavLink></li>
        <li><NavLink  activeClassName="activeLink" to="/blog"><FaBlog size={20} className="smallMenuIcon"/>Blog</NavLink></li>
        <li><NavLink  activeClassName="activeLink" to="/tutorials"><FaTutorial size={20} className="smallMenuIcon"/>Tutorials</NavLink></li>
        { this.props.listOfAuthenticatedEmails.includes(this.props.loggedEmail)  &&
          <span>
          <li className="dividerLi">Actions</li>
          <li><NavLink activeClassName="activeLink" to="/administration/posts/create"><FaPost size={20} className="smallMenuIcon"/>New Post</NavLink></li> 
          <li><NavLink exact activeClassName="activeLink" to="/administration"><FaUser size={20} className="smallMenuIcon"/>Administration</NavLink></li> 
          <li><NavLink activeClassName="activeLink" to="/administration/content"><FaSettings size={20} className="smallMenuIcon"/>Content Settings</NavLink></li> 
          </span>
        }
        
      </ul>
    </nav> 
    );
  }
}

Menu.propTypes = {
  user: PropTypes.object
};
