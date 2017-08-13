import React from "react";
import PropTypes from "prop-types";
import FaTag from "react-icons/lib/go/tag";
import {Input} from "./Input";
import {PageTitle} from "./PageTitle";
import {isNotEmpty, resetField} from "../js/functions";

export class EditPost extends React.Component{
	constructor(){
		super();
		this.state={ title:"",	description:"", chosenTags:[], chosenTutorial:[]	};
		this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange=this.onChange.bind(this);
	}

  componentDidMount(){
    window.scrollTo(0, 0);
    setTimeout(()=> this.props.setStyle(), 600);
    this.props.getPostById(this.props.match.params.id);
    setTimeout(()=>{
      this.setState({
        title: this.props.post.post.title,
        description: this.props.post.post.description,
        chosenTags: this.props.post.tags,
        chosenTutorial: this.props.post.tutorials,
      })
      document.getElementsByName("title")[0].value=this.state.title;
      document.getElementsByName("description")[0].value=this.state.description;
    }, 1000);
  }

  componentWillUnmount(){
    this.props.unsetStyle();
  }

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  updateChosenTag(id, tagId, tag){
    if(this.state.chosenTags.filter(tag => tag._id == id).length == 0) this.setState({
      chosenTags: [...this.state.chosenTags, {_id:id, tagId, tag}]
    })
  }

  updateChosenTutorial(id, name){
    if(this.state.chosenTutorial.filter(tutorial => tutorial._id == id).length == 0) this.setState({
      chosenTutorial: [{_id:id, tutorial:name}]
    })
  }
  removeTutorial(){
    this.setState({chosenTutorial:[]});
  }

  removeTag(id){
    var filteredTags = this.state.chosenTags.filter(tag => tag._id !== id);
    this.setState({ chosenTags: filteredTags});
  }
	handleSubmit(event){
    event.preventDefault();
    var {title, description} = this.state;
    var tags=[];
    var tutorials=[];
    this.state.chosenTags.map(tag => tags.push(tag._id));
    this.state.chosenTutorial.map(tutorial => tutorials.push(tutorial._id));
    if(isNotEmpty(title, description) && tags.length != 0 && tutorials.length >= 0){
      var data = { title, description, tags, tutorials };
      this.props.updatePost(this.props.match.params.id, data);
      document.getElementById("submitButton").value="UPDATED";          
    }
  }
	render() {
    const tags = this.props.tags;
    let filteredTags = tags.filter((tag) => this.props.searchTag.length >= 2 ? tag.tag.toLowerCase().indexOf(this.props.searchTag.toLowerCase())!== -1: "");
    filteredTags=filteredTags.map((tag, index)=><h4 key={index}><button type="button" onClick={()=>this.updateChosenTag(tag._id, tag.tagId, tag.tag)} className="link"> {tag.tag}</button></h4>)
    let chosenTags=this.state.chosenTags;
    let listOfChosenTags=chosenTags.map((tag, index) =>( <div key={index}><FaTag fill={"gray"} size={20} className="smallMenuIcon" /><button type="button" onClick={(id)=>this.removeTag(tag._id)} className="link" title="Click to remove this tag from post">{tag.tag}</button></div>));

    const tutorials = this.props.tutorial.tutorials;
    let filteredTutorials = tutorials.filter((tutorial) => this.props.searchTutorial.length >= 2 ? tutorial.tutorial.toLowerCase().indexOf(this.props.searchTutorial.toLowerCase())!== -1: "");
    let listOfChosenTutorials=filteredTutorials.map((tutorial, index)=><h4 key={index}><button type="button" onClick={(id, name)=>this.updateChosenTutorial(tutorial._id, tutorial.tutorial)} className="link"> {tutorial.tutorial}</button></h4>);
    let chosenTutorial=this.state.chosenTutorial;
    return(
  		<div>
        <PageTitle title="Edit Post"/>
  			<main style={this.props.style}>
          <form onSubmit={this.handleSubmit} className="form wideForm longHeight" style={this.props.style}>
            <Input htmlFor="title" type="text" onChange={(e)=>this.onChange(e)} onFocus={this.props.onFocus} onBlur={this.props.onBlur} required="required"/>
            <Input htmlFor="description" type="textarea" onChange={(e)=>this.onChange(e)} onFocus={this.props.onFocus} onBlur={this.props.onBlur} required="required"/>
            <Input htmlFor="tag" type="text" onChange={(e)=>this.props.updateTagSearch(e)} onFocus={this.props.onFocus} onBlur={this.props.onBlur}/>
            {filteredTags}
            {chosenTags.length == 0 && <p className='post-about'>No tags selected. Select at least one tag.</p>}
            {chosenTags.length > 0 && <p className='post-about'>Current tags: </p>}
            {listOfChosenTags}
            <Input htmlFor="tutorial" type="text" onChange={(e)=>this.props.updateTutorialSearch(e)} onFocus={this.props.onFocus} onBlur={this.props.onBlur} />
            {listOfChosenTutorials}
            {chosenTutorial.length == 0 && <p className='post-about'>No tutorial selected. You can select only one tutorial.</p>}
            {chosenTutorial.length > 0 && <p className='post-about'>Selected tutorial: <button type="button" onClick={this.removeTutorial.bind(this)} className="link" title="Click to remove post from this tutorial">{chosenTutorial[0].tutorial}</button></p>}
            <input type="submit" id="submitButton" value="UPDATE"/>
          </form>
        </main>
  		</div>
  	);
	}
}

EditPost.propTypes = {
  style: PropTypes.object.isRequired,
  setStyle: PropTypes.func.isRequired,
  unsetStyle: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
  getPostById: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
};
