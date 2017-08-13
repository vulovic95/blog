import React from "react";
import PropTypes from "prop-types";
import {Input} from "./Input";
import {PageTitle} from "./PageTitle";
import {isNotEmpty, resetField} from "../js/functions";

const Label = (props) => <button type="button" onClick={props.delete} className="link not-bold margined" title="Click to remove">{props.name}</button>
Label.propTypes = {
	name: PropTypes.string.isRequired
}
  			 	
const ButtonExpand = (props) => (<button type="button" className="expandButton" id={props.id} onClick={props.expandForm}>{props.text}</button>);
ButtonExpand.propTypes = {
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	expandForm: PropTypes.func.isRequired
}

export class Content extends React.Component{
	constructor(){
		super();
		this.state = { text:"",	year:"", singlePoint:"", timelineType:"", tutorial:"",	tag:"", email:""	}
	}
	componentDidMount(){
    window.scrollTo(0, 0);
    setTimeout(() => this.props.setStyle(), 200);
    this.props.getTags();
		$("form").addClass("hide");
  }
  componentWillUnmount(){
    this.props.unsetStyle();
  }
	onChange(e){
		this.setState({	[e.target.name] : e.target.value });
	}
	changeTimeline(timeline){
		$("#btnTimeline").fadeOut("slow");
		this.setState({
			id: timeline._id,
			text: timeline.text,
			year: timeline.year,
			singlePoint: timeline.singlePoint,
			timelineType: timeline.timelineType
		})
		setTimeout(()=>{
			$("#btn-"+this.state.id).addClass("hide");
			document.getElementsByName("year")[0].value=this.state.year;
			document.getElementsByName("text")[0].value=this.state.text;
			document.getElementsByName("singlePoint")[0].value=this.state.singlePoint;
			document.getElementsByName("timelineType")[0].value=this.state.timelineType;
			$(".update").addClass("hide");
			$("#btn-"+this.state.id).removeClass("hide");
		}, 500);
	}
	updateTimeline(id){
		this.props.updateTimeline(this.state);
		resetField("text", "year", "timelineType", "singlePoint");
		$(".update").addClass("hide");
		$("#btnTimeline").fadeIn("slow");
	}
	handleSubmit(e){
		e.preventDefault();
		let {email, tag, tutorial, year, text, timelineType, singlePoint} = this.state;
		switch(e.target.name){
			case "createAdminForm":
				if(isNotEmpty(email)) this.props.createAuthenticatedUser({email});
				resetField("email");
			break;
			case "createTagForm":
				if(isNotEmpty(tag)) this.props.createTag({tag});
				resetField("tag");
			break;
			case "createTutorialForm":
				if(isNotEmpty(tutorial)) this.props.createTutorial({tutorial});
				resetField("tutorial");
			break;
			case "createTimelineForm":
				if(isNotEmpty(text, year, timelineType, singlePoint)) this.props.createTimeline({text, year, timelineType, singlePoint});
				resetField("text", "year", "timelineType", "singlePoint");
			break;
			default: break;
		}
	}
	expandForm(e){
		let formId=e.target.id;
		let flag=false;
		$("form").addClass("hide");
		let selector = document.getElementsByName(formId)[0];
		$("form").not(selector).slideUp("slow");
		$(selector).slideToggle("slow");
		if($("#"+formId).hasClass("activeExpanded")) flag=true;
		$(".expandButton").removeClass("activeExpanded");
		!flag && $("#"+formId).addClass("activeExpanded");
	}
	render() {
		const authenticatedEmails = this.props.authenticatedEmails.map(auth=><Label key={auth._id} delete={()=>{if(confirm("Remove this user from list of authenticated users?")) this.props.deleteAuthenticatedUser(auth._id)}} id={auth._id} name={auth.email} />);
		const tags = this.props.tag.tags.map(tag=><Label key={tag._id} delete={()=>{if(confirm("Remove this tag?")) this.props.deleteTag(tag._id)}} id={tag._id} name={tag.tag} />);
  	const learningTimeline = this.props.timeline.map(tml => tml.timelineType == 1 && <div className="post" key={tml._id}><p className="post-about">{tml.year}: {tml.text} {tml.singlePoint == 1 ? " - Starting point" : ""}</p> <button type="button" className="link" onClick={ () => { if(confirm("Remove this point in timeline?")) this.props.deleteTimeline(tml._id)}}>Delete</button> <button className="link" type="button" onClick={ (id) => this.changeTimeline(tml)}>Edit </button> <button className="link update hide" type="button" id={"btn-"+tml._id} onClick={ (id) => this.updateTimeline(tml._id)}> Update</button></div>);
  	const experienceTimeline = this.props.timeline.map(tml => tml.timelineType == 0 && <div className="post" key={tml._id}> <p className="post-about">{tml.year}: {tml.text} {tml.singlePoint == 1 ? " - Starting point" : ""}</p><button type="button" className="link"  onClick={()=>{ if(confirm("Remove this point in timeline?")) this.props.deleteTimeline(tml._id)}}>Delete</button> <button className="link" type="button" onClick={ (id) => this.changeTimeline(tml)}>Edit </button> <button className="link update hide" type="button" id={"btn-"+tml._id} onClick={ (id) => this.updateTimeline(tml._id)}> Update</button></div>);
		const tutorials = this.props.tutorial.tutorials.map(tutorial=><Label key={tutorial._id} delete={()=>{if(confirm("Remove this tutorial?")) this.props.deleteTutorial(tutorial._id)}} id={tutorial._id} name={tutorial.tutorial} />);
    return(
  		<div>
        <PageTitle title="Content settings"/>
  			<main style={this.props.style}>

  			 	<ButtonExpand id="createAdminForm" text="Create new administrator" expandForm={(e)=>this.expandForm(e)} />
          <form name="createAdminForm" onSubmit={this.handleSubmit.bind(this)} className="form wideForm">
            <Input htmlFor="email" type="email" onFocus={this.props.onFocus} onBlur={this.props.onBlur} onChange={(e)=>this.onChange(e)} required="required"/>
            <input type="submit" value="ADD ADMIN"/>
	          <p className="form-subtitle">Existing administrators of this website: </p>
	          {authenticatedEmails}
          </form>

  			 	<ButtonExpand id="createTagForm" text="Add new tag" expandForm={(e)=>this.expandForm(e)} />
          <form name="createTagForm" onSubmit={this.handleSubmit.bind(this)} className="form wideForm">
            <Input htmlFor="tag" type="text" onFocus={this.props.onFocus} onBlur={this.props.onBlur} onChange={(e)=>this.onChange(e)} required="required"/>
            <input type="submit" value="CREATE TAG"/>
	          <p className="form-subtitle">Existing tags: </p>
	          {tags}
          </form>

  			 	<ButtonExpand id="createTutorialForm" text="Add new tutorial" expandForm={(e)=>this.expandForm(e)} />
          <form name="createTutorialForm" onSubmit={this.handleSubmit.bind(this)} className="form wideForm">
          	<Input htmlFor="tutorial" type="text" onFocus={this.props.onFocus} onBlur={this.props.onBlur} onChange={(e)=>this.onChange(e)} required="required"/>
            <input type="submit" value="CREATE TUTORIAL"/>
	           <p className="form-subtitle">Existing tutorials: </p>
	          {tutorials}
          </form>

  			 	<ButtonExpand id="createTimelineForm" text="Add to your timeline" expandForm={(e)=>this.expandForm(e)} />
          <form name="createTimelineForm" onSubmit={(e)=>this.handleSubmit(e)} className="form wideForm">
            <Input htmlFor="year" type="number" onFocus={this.props.onFocus} onChange={(e)=>this.onChange(e)} onBlur={this.props.onBlur} min={1995} max={new Date().getFullYear()} maxLength={4} required="required"/>
            <Input htmlFor="text" type="text" onFocus={this.props.onFocus} onChange={(e)=>this.onChange(e)} onBlur={this.props.onBlur} required="required"/>
            <Input htmlFor="singlePoint" type="number" onFocus={this.props.onFocus} onChange={(e)=>this.onChange(e)} onBlur={this.props.onBlur} min={0} max={1} maxLength={1} required="required"/>
            <Input htmlFor="timelineType" type="number" onFocus={this.props.onFocus} onChange={(e)=>this.onChange(e)} onBlur={this.props.onBlur} min={0} max={1} maxLength={1} required="required"/>
            <input type="submit" id="btnTimeline" value="ADD TO TIMELINE"/>
	          <p className="form-subtitle">Learning timeline</p>
	          	{learningTimeline.reverse()}
	          <p className="form-subtitle">Experience timeline</p>
	          	{experienceTimeline.reverse()}
          </form>
        </main>
  		</div>
  	);
	}
}
Content.propTypes = {
	style: PropTypes.object.isRequired,
	setStyle: PropTypes.func.isRequired,
	unsetStyle: PropTypes.func.isRequired,
	onFocus: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
	tag: PropTypes.object.isRequired,
	getTags: PropTypes.func.isRequired,
	createTag: PropTypes.func.isRequired,
	deleteTag: PropTypes.func.isRequired,
	updateTimeline: PropTypes.func.isRequired,
	createTimeline: PropTypes.func.isRequired,
	deleteTimeline: PropTypes.func.isRequired,
	timeline: PropTypes.array.isRequired

}
