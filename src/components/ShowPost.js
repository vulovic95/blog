import React from "react";
import PropTypes from "prop-types";
import {Post} from "./Post";
import {Comments} from "./Comments";
import {timeConverter} from "../js/functions";
import {PageTitle} from "./PageTitle";
import {isNotEmpty, resetField, uploadPhoto} from "../js/functions";
import FaCamera from "react-icons/lib/fa/camera";
export class ShowPost extends React.Component{
  componentDidMount(){
    window.scrollTo(0, 0);
    setTimeout(() => this.props.setStyle(), 300);
    var {id, title} = this.props.match.params;
    this.props.getPostById(id);
	}
  componentWillUnmount(){
    this.props.unsetStyle();
  }
  onChange(e){
     let file = document.getElementsByName("photo")[0].files[0];
     if(isNotEmpty(file.name) && file.size/1024/1024 < 1){
      let data = {photo:file.name}
      this.props.updatePost(this.props.match.params.id, data);
      uploadPhoto("changePhotoForm");
     }
     else{
       alert("File is too big. File size has to be less than 1 MB");
       resetField("photo")
     }
  }
	render(){
    var {id, title} = this.props.match.params;
    const post=this.props.post.post;
  	return(
  		<div style={this.props.style}>
        <PageTitle title={post.title} background={post.photo} {...this.props.children}>
        { this.props.listOfAuthenticatedEmails.includes(this.props.email)  && 
          <div className="ta-right">
            <form encType="multipart/form-data" id="changePhotoForm" className="specialForm">
              <label className="custom-file-upload" title="Change header photo">
                <input type="file" name="photo" accept="image/*" onChange={(e) => this.onChange(e)} /> <FaCamera size={20} fill={"white"} />
              </label>
            </form>
          </div>
        }
        </PageTitle>
        <main>
         
          <Post postId={post.postId}
            id={post._id}
            tags={this.props.post.tags}
            tutorials={this.props.post.tutorials}
            title={post.title}
            description={post.description}
            photo={post.photo}
            author={post.email}
            date={timeConverter(post.date)}
            comments= {post.comments}
            displayName={post.displayName}
            allPosts={this.props.post.posts}/>

          <Comments onFocus={this.props.onFocus} onBlur={this.props.onBlur}  user={this.props.user} post={this.props.post} comment={this.props.comment}  getCommentsByPostId={this.props.getCommentsByPostId} originalId={post._id} postId={id} addComment={this.props.addComment} deleteComment={this.props.deleteComment} email={this.props.email}/>

        </main>
  		</div>
  	);
	}
}

ShowPost.propTypes = {
  style: PropTypes.object.isRequired,
  setStyle: PropTypes.func.isRequired,
  unsetStyle: PropTypes.func.isRequired,
  getTagsByPostId: PropTypes.func.isRequired,
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getCommentsByPostId: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired
};
