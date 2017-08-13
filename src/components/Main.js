import React from "react";
import PropTypes from "prop-types";
import {Sidebar} from "./Sidebar";
import {Post} from "./Post";
import axios from "axios";
import {WideHomeBackground} from "./WideHomeBackground";
import {Pagination} from "./Pagination";

export class Main extends React.Component{
  componentDidMount(){
    window.scrollTo(0, 0);
    setTimeout(() => this.props.setStyle(), 200);
  }
  componentWillUnmount(){
    this.props.unsetStyle();
  }
	render() {
    var posts=this.props.post.posts;
    posts=posts.map((post, index)=> <Post key={index}
                                          postId={post.postId}
                                          id={post._id}
                                          tags={this.props.post.tags}
                                          tagsLength={post.tags.length  == undefined ? 0 : post.tags.length}
                                          commentsLength={post.comments.length == undefined ? 0 : post.comments.length}
                                          title={post.title}
                                          description={post.description}
                                          photo={post.photo}
                                          date={post.date}
                                          post = {this.props.post}
                                          tutorials={this.props.post.tutorials} />);
    return(
  		<div style={this.props.style}>
        <div className="clear"></div>
        <WideHomeBackground additional="niceIndigo" title="Blog" subtitle="A couple of thoughts and theories"/>
        <main>
    			<div className="mainDiv">
            {this.props.paginate(posts, this.props.pageSize, this.props.pageNumber)}
            {posts.length > 10 && <Pagination onIncrement={()=>this.props.incrementPage(posts.length)} onDecrement={()=>this.props.decrementPage()} /> }
          </div>
          <Sidebar tutorial={this.props.tutorial} getTags={this.props.getTags} tag={this.props.tag} allPosts={this.props.post.posts} search={this.props.search} updateSearch={this.props.updateSearch} onFocus={this.props.onFocus} onBlur={this.props.onBlur}/>
          <div className="clear"></div>
        </main>
     </div>
    );
  }
}
Main.propTypes = {
  setStyle: PropTypes.func.isRequired,
  unsetStyle: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  getTagsByPostId: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  paginate: PropTypes.func.isRequired,
  decrementPage: PropTypes.func.isRequired,
  incrementPage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired
};
