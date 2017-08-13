import React from "react";
import PropTypes from "prop-types";
import {NavLink, Link} from "react-router-dom";
import FaTwitter from "react-icons/lib/ti/social-twitter";
import FaInstagram from  "react-icons/lib/ti/social-instagram";
import FaLinkedIn from  "react-icons/lib/ti/social-linkedin";
import FaFacebook from  "react-icons/lib/ti/social-facebook";
import FaTag from "react-icons/lib/fa/tag";
import {Input} from "./Input";

export class Sidebar extends React.Component{
  componentWillMount(){
    this.props.getTags();
  }
  componentDidMount(){
    window.scrollTo(0, 0);
  }
	render() {
    let tags = this.props.tag.tags;
    let tutorials =  this.props.tutorial.tutorials;
    let filteredPosts = this.props.allPosts.filter((post) => this.props.search.length >= 2 ? post.title.toLowerCase().indexOf(this.props.search.toLowerCase())!== -1: "");
    filteredPosts = filteredPosts.map((post, index)=> {
     return (
      <h4 className="hoverableLink" key={index}>
          <Link to={`/blog/posts/${post.postId}/`+post.title.split(" ").join("-").toLowerCase().replace(/[`~@!#$%^&*()_+{[\]}|:”“";\',.+\.\<\>?()\s]/g, '').replace(/[><]/g, '')} >
            {post.title}
          </Link>
      </h4>);
    });
    tags = tags.map((tag) => (
      <h4 className="hoverableLink" key={tag._id}>
        <Link to={`/blog/posts/filter/tag/${tag.tagId}/${tag.tag.split(" ").join("-").toLowerCase()}`} >
          {tag.tag}
        </Link>
      </h4>)
    );
    tutorials = tutorials.map((tutorial) => (
      <h4 className="hoverableLink" key={tutorial._id}>
        <Link to={`/blog/posts/filter/tutorial/${tutorial.tutorialId}/${tutorial.tutorial.split(" ").join("-").toLowerCase()}`} >
          {tutorial.tutorial}
        </Link>
      </h4>)
    );
    let recentPosts = this.props.allPosts != null &&   this.props.allPosts.map((post, index)=>  index < 10 &&
     (<h4 className="hoverableLink" key={index}>
          <Link to={`/blog/posts/${post.postId}/`+post.title.split(" ").join("-").toLowerCase().replace(/[`~@!#$%^&*()_+{[\]}|:”“";\',.+\.\<\>?()\s]/g, '').replace(/[><]/g, '')} >
            {post.title}
          </Link>
      </h4>)
    );

  	return(
  		<div className="sidebar">
      <h3>Search for post</h3>
      <h4>
        <Input htmlFor="search" defaultValue={this.props.search}
        onChange={(e)=>this.props.updateSearch(e)}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        additional={"searchInput"}
        label={0}/>
      </h4>
      {filteredPosts}
      
      <h3>Find post by tag</h3>
      {tags}

      <h3>Tutorials</h3>
      {tutorials}

      <h3>Recent Posts</h3>
      {recentPosts}

      <h3>Find out more about me</h3>
      <h4 className="hoverableLink" ><span className="sidebarIcon"><FaLinkedIn size={20} fill={"gray"}/></span><a href="https://www.linkedin.com/in/vulovic95/" target="_blank">Connect with me on LinkedIn</a></h4>
      <h4 className="hoverableLink" ><span className="sidebarIcon"><FaTwitter size={20} fill={"gray"}/></span><a href="https://twitter.com/vulovic95" target="_blank">Find me on Twitter</a></h4>
      <h4 className="hoverableLink" ><span className="sidebarIcon"><FaInstagram size={20} fill={"gray"}/></span><a href="https://www.instagram.com/vulovic95/" target="_blank">Follow me on Instagram</a></h4>
      <h4 className="hoverableLink" ><span className="sidebarIcon"><FaFacebook size={20} fill={"gray"}/></span><a href="https://www.facebook.com/vulovic95" target="_blank">Become my friend on Facebook</a></h4>

  		</div>
  	);
	}
}
Sidebar.propTypes={
  getTags: PropTypes.func.isRequired,
  allPosts: PropTypes.array.isRequired,
  tag: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}
