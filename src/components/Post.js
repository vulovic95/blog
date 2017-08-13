import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import FaUser from "react-icons/lib/md/person-outline";
import FaClock from "react-icons/lib/go/calendar";
import FaMore from "react-icons/lib/fa/external-link";
import FaEdit from "react-icons/lib/fa/edit";
import FaDelete from "react-icons/lib/go/trashcan";
import FaTag from "react-icons/lib/go/tag";
import FaComment from "react-icons/lib/fa/comments-o";
import FaPhoto from "react-icons/lib/fa/image";
import FaTutorial from "react-icons/lib/fa/folder-open-o";
import {browserHistory} from "react-router";
import {NavLink, Link} from "react-router-dom";
import {Route} from "react-router-dom";
const TitleLink = (props) => ( <h2 className="post-title"><Link to={`/blog/posts/${props.postId}/${props.titleSplited}`}> {props.title} </Link> </h2> );
const Title = (props) => ( <h2 className="post-title">{props.title}</h2> );
const PostPhoto = (props) => ( <img src={"/img/"+props.photo} alt="Post photo" className="postPhoto"/> );
const PostAbout = (props) => (<div className="post-about innerHTML" dangerouslySetInnerHTML={{__html:props.description}}></div>);
const LabelAuthor = (props) => (<p><span className="post-icon medium"><FaUser fill={"gray"} size={20} className="smallIcon"/> {props.displayName} <span className="onlyIcon"/> <FaClock fill={"gray"} size={15} className="smallIcon"/> {props.date}</span></p>);
const LabelTag = (props) => ( <span className="icon"> <span className="post-icon medium hoverableLink"><FaTag fill={"gray"} size={20} className="smallIcon"/> <Link to={`/blog/posts/filter/tag/${props.tagId}/${props.tag.split(" ").join("-").toLowerCase()}`} > {props.tag}  </Link> </span> </span>);
const LabelReadMore = (props) => (<span className="icon"><FaMore size={20} fill="gray"/><span className="post-icon medium hoverableLink"><Link to={`/blog/posts/${props.postId}/${props.titleSplited}`}> Read full post </Link></span></span>);
const LabelEdit = (props) => (<span className="icon"><FaEdit size={20} fill="gray"/><span className="post-icon medium hoverableLink"><NavLink to={"/administration/posts/edit/"+props.id}>Edit</NavLink></span></span>);
const LabelDelete = (props) => (<span className="icon"><FaDelete size={20} fill="gray"/><span className="post-icon medium"><button className="link" onClick={props.handleDelete}>Remove</button></span></span>);
const LabelComments = (props) => (<span className="icon"><FaComment size={20} fill="gray"/><span className="post-icon medium"><button className="nolink">{props.numberOfComments} {props.numberOfComments == 1 ? "comment" : "comments"}</button></span></span>);
const LabelTagCount = (props) => (<span className="icon"><FaTag size={20} fill="gray"/><span className="post-icon medium"><button className="nolink">{props.numberOfTags} {props.numberOfTags == 1 ? "tag" : "tags"}</button></span></span>);
const LabelTutorial = (props) => ( <span className="icon"> <span className="post-icon medium hoverableLink"><FaTutorial fill={"gray"} size={20} className="smallIcon"/> <Link to={`/blog/posts/filter/tutorial/${props.tutorialId}/${props.tutorial.split(" ").join("-").toLowerCase()}`} > {props.tutorial}  </Link> </span> </span>);
const FilterPage = (props) => ( <span> {new RegExp(/\/(blog)\/(posts)\/(filter)\/[\w]+\/[\d]+\/[\w-]+/).test(location.pathname) && props.children} </span> );
const BlogPage = (props) => ( <span> {(location.pathname==="/blog") && props.children} </span> );
const ShowPostPage = (props) => ( <span> {new RegExp(/\/(blog)\/(posts)\/[\d]+\/[\w-]+$/).test(location.pathname) && props.children} </span> );
const AdministrationPage = (props) => ( <span> {(location.pathname==="/administration") && props.children} </span> );
const HomePage = (props) => ( <span> {(location.pathname==="/")&& props.children} </span> );

export class Post extends React.Component{
  render() {
    var titleSplited=this.props.title.split(" ").join("-").toLowerCase().replace(/[`~@!#$%^&\s*()_+{[\]}|:”“";\',.+\.\<\>?()\s]/g, '').replace(/[><]/g, '');
    var { commentsLength, date, description, id, photo, postId, tagsLength, title, comments, displayName } = this.props;
    if(isNaN(Number(postId))) location.pathname="/NotFound";
    const tags = this.props.tags == undefined ? [] : this.props.tags.map((tag, index) => <LabelTag key={index} id={tag._id} postId={postId} tagId={tag.tagId} tag={tag.tag} allPosts={this.props.allPosts} />);
    const tutorials = this.props.tutorials == undefined ? [] : this.props.tutorials.map((tutorial, index) => <LabelTutorial key={index} id={tutorial._id} postId={postId} tutorialId={tutorial.tutorialId} tutorial={tutorial.tutorial} allPosts={this.props.allPosts} />);
    return(
     <div className="post">
      <BlogPage {...this.props.children}>
        <PostPhoto photo={photo}/>
        <TitleLink postId={postId} id={id} titleSplited={titleSplited} title={title} />
        <PostAbout description={description.slice(0, 400)+"..."} />
        <span className="col-1">
          <LabelReadMore postId={postId} titleSplited={titleSplited}/>
          <LabelComments numberOfComments = {commentsLength} />
          <LabelTagCount numberOfTags = {tagsLength} />
          <span className="icon">
            <input type="hidden" ref={"post_"+title} value={id}/>
          </span>
        </span>
      </BlogPage>

      <ShowPostPage {...this.props.children}>
        <LabelAuthor displayName={displayName} date={date}/>
        {tags} {tutorials}
        <PostAbout description={description} />
      </ShowPostPage>

      <AdministrationPage {...this.props.children}>
        <TitleLink postId={postId} id={id} titleSplited={titleSplited} title={title} />
        <PostAbout description={description.slice(0, 400)+"..."} />
        <span className="col-1">
          <LabelReadMore postId={postId} titleSplited={titleSplited}/>
          <LabelComments numberOfComments = {commentsLength} />
          <LabelTagCount numberOfTags = {tagsLength} />
          <LabelEdit id={postId}/>
          <LabelDelete handleDelete={()=> { if(confirm("Remove post?")) this.props.deletePost(id) }} id={id} />
        </span>
      </AdministrationPage>

      <FilterPage {...this.props.children}>
        <TitleLink postId={postId} id={id} titleSplited={titleSplited} title={title} />
        <PostAbout description={description.slice(0, 400)+"..."} />
        <span className="col-1">
          <LabelReadMore postId={postId} titleSplited={titleSplited}/>
          <LabelComments numberOfComments = {commentsLength} />
          <LabelTagCount numberOfTags = {tagsLength} />
        </span>
      </FilterPage>

     </div>
    );
  }
}
Post.propTypes = {
  postId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photo: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.array,
  comments: PropTypes.array,
  commentsLength: PropTypes.number,
  tagsLength: PropTypes.number
};
