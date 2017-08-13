import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {WideHomeBackground} from "./WideHomeBackground";
import {Pagination} from "./Pagination";

export class Tutorial extends React.Component{

  componentDidMount(){
    window.scrollTo(0, 0);
    setTimeout(() => this.props.setStyle(), 200);
  }

  componentWillUnmount(){
    this.props.unsetStyle();
  }
	filterByTutorialId(id){
    var filteredPosts = this.props.post.posts.filter((post)=>post.tutorials.includes(id));
    var counter = filteredPosts.length;
    return filteredPosts=filteredPosts.map((post, index) =>
      <p className="tutorial-subtitle indented" key={index}>
             <Link to={`/blog/posts/${post.postId}/${post.title.split(" ").join("-").toLowerCase().replace(/[`~@!#$%^&\s*()_+{[\]}|:”“";\',.+\.\<\>?()\s]/g, '').replace(/[><]/g, '')}`}>
            Part {counter-index}: {post.title}
            </Link>
      </p>
      )
  }
  render() {
    let tutorials = this.props.tutorial.tutorials.map((tutorial, index) =>
     <div key={index}>
        <p className="tutorial-title">
         {tutorial.tutorial}
        </p>
        {this.filterByTutorialId(tutorial._id)}
     </div>);
    return(
  		<div style={this.props.style}>
        <WideHomeBackground additional="blue" title="Tutorials" subtitle="Learn something today"/>
        <main>
          {this.props.paginate(tutorials.reverse(), this.props.pageSize, this.props.pageNumber)}
          {tutorials.length > 10 && <Pagination onIncrement={()=>this.props.incrementPage(tutorials.length)} onDecrement={()=>this.props.decrementPage()} /> }
        </main>
      </div>
  	);
	}
}

Tutorial.propTypes = {
  style: PropTypes.object.isRequired,
  setStyle: PropTypes.func.isRequired,
  unsetStyle: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  tutorial: PropTypes.object.isRequired
};
