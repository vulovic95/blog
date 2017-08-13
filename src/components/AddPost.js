import React from "react";
import PropTypes from "prop-types";
import FaTag from "react-icons/lib/go/tag";
import {Input} from "./Input";
import {PageTitle} from "./PageTitle";
import {isNotEmpty, resetField, uploadPhoto} from "../js/functions";

export class AddPost extends React.Component{
	constructor(){
		super();
    this.state = {
      chosenTags: [],
      chosenTutorial:[]
      }
  }
  componentDidMount(){
    window.scrollTo(0, 0);
    setTimeout(()=> this.props.setStyle(), 100);
  }

  componentWillUnmount(){
    this.props.unsetStyle();
  }

  updateChosenTags(id, name){
    if(this.state.chosenTags.filter(tag => tag.id == id).length == 0)
			this.setState({ chosenTags: [...this.state.chosenTags, {id, name}] })
  }

  updateChosenTutorial(id, name){
    if(this.state.chosenTutorial.filter(tutorial => tutorial.id == id).length == 0)
			this.setState({ chosenTutorial: [{id, name}] })
  }

  removeTutorial(){
    this.setState({	chosenTutorial:[]	})
  }

  getFileData(){
   let file = document.getElementsByName("photo")[0].files[0];
   let errors = [];
   let type =  file.type.match(/gif|png|jpg|jpeg/);
   let size = file.size;
   if(size/1024/1024 > 1) errors.push("File cannot be greater than 1MB.");
   if(!type) errors.push("File type has to be jpg/jpeg, gif, png.");
   if(errors.length == 0) return file.name;
   return false;
  }

	handleSubmit(e){
		e.preventDefault();
		let {title, description} = this.state;
    let photo = this.getFileData();
    let tags=[];
    let tutorials=[];
		this.state.chosenTags.map(tag => tags.push(tag.id));
    this.state.chosenTutorial.map(tutorial => tutorials.push(tutorial.id));
    if(isNotEmpty(title, description, photo) && tags.length!=0 && tutorials.length>=0){
      this.props.addPost({ title,	description, photo,	tags,	tutorials,	date: Date.now(),	email: this.props.email, displayName:this.props.user.providerData[0].displayName });
			uploadPhoto("addPostForm");
    }
    else {
      alert("You must choose at least 1 tag. Allowed file types are: jpg/jpeg, gif, png. Also note that file you choose can not be greater than 1MB.");
    }
  }

  removeTag(id){
    var filteredTags = this.state.chosenTags.filter(tag => tag.id !== id);
    this.setState({	chosenTags: filteredTags });
  }

  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

	render() {
    const tags = this.props.tag.tags;
    let filteredTags = tags.filter((tag) => this.props.searchTag.length >= 2 ? tag.tag.toLowerCase().indexOf(this.props.searchTag.toLowerCase()) !== -1 : "");
    filteredTags=filteredTags.map((tag, index)=><h4 key={index}><button type="button" onClick={(id, name)=>this.updateChosenTags(tag._id, tag.tag)} className="link"> {tag.tag} </button></h4>);
    let listOfChosenTags = this.state.chosenTags.map((tag, index) =>(<div key={tag.id} ><FaTag fill={"gray"} size={20} className="smallMenuIcon" /><button type="button" onClick={(id)=>this.removeTag(tag.id)} className="link" title="Click to remove this tag from list">{tag.name}</button></div>));

    const tutorials = this.props.tutorial.tutorials;
    let filteredTutorials = tutorials.filter((tutorial) => this.props.searchTutorial.length >= 2 ? tutorial.tutorial.toLowerCase().indexOf(this.props.searchTutorial.toLowerCase()) !== -1 : "");
  	filteredTutorials=filteredTutorials.map((tutorial, index)=><h4 key={index}><button type="button" onClick={(id, name)=>this.updateChosenTutorial(tutorial._id, tutorial.tutorial)} className="link"> {tutorial.tutorial}</button></h4>);
    let chosenTutorial=this.state.chosenTutorial;

		return(
  		<div>
        <PageTitle title="New post"/>
  			<main style={this.props.style}>
          <form onSubmit={(e) => this.handleSubmit(e)} encType="multipart/form-data" id="addPostForm" className="form wideForm longHeight">
            <Input htmlFor="title" type="text" onChange={(e)=>this.onChange(e)} onFocus={this.props.onFocus} onBlur={this.props.onBlur} required="required"/>
            <Input htmlFor="description" type="textarea" onChange={(e)=>this.onChange(e)} onFocus={this.props.onFocus} onBlur={this.props.onBlur} required="required"/>
            <Input htmlFor="photo" type="file" accept="image/*" onChange={this.getFileData.bind(this)} onFocus={this.props.onFocus} onBlur={this.props.onBlur} required="required"/>
						<Input htmlFor="tag" type="text" onChange={(e)=>this.props.updateTagSearch(e)} onFocus={this.props.onFocus} onBlur={this.props.onBlur} required="required"/>
						{filteredTags}
            {listOfChosenTags.length == 0 && <p className="notify">No tags selected. Select at least one tag.</p>}
            {listOfChosenTags.length > 0 && <p className="notify">Selected tags: </p>}
            {listOfChosenTags}
						<Input htmlFor="tutorial" type="text" onChange={(e)=>this.props.updateTutorialSearch(e)} onFocus={this.props.onFocus} onBlur={this.props.onBlur} />
						{filteredTutorials}
            {chosenTutorial.length == 0 && <p className="notify">No tutorial selected. You can select only one tutorial.</p>}
            {chosenTutorial.length > 0 && <p className="notify">Selected tutorial: <button type="button" onClick={this.removeTutorial.bind(this)} className="link">{chosenTutorial[0].name}</button></p>}
						<input type="submit" value="ADD"/>
          </form>
        </main>
  		</div>
  	);
	}
}

AddPost.propTypes = {
  style: PropTypes.object.isRequired,
  setStyle: PropTypes.func.isRequired,
  unsetStyle: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired,
  searchTag: PropTypes.string.isRequired,
  updateTagSearch: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired
};
