import React from "react";
import {Input} from "./Input";
import {isNotEmpty, resetField} from "../js/functions";

export class AddComment extends React.Component{
	handleSubmit(e){
    e.preventDefault();
    let {comment} = this.state;
		if(isNotEmpty(comment))
			this.props.addComment({	comment, parent: this.props.postId,	email: this.props.email, date: Date.now(), displayName: this.props.user.providerData[0].displayName	});
		resetField("comment");
  }
  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
	render() {
  	return(
  		<div>
  			<form onSubmit={(e)=>this.handleSubmit(e)} className="form wideForm">
          <Input htmlFor="comment" type="textarea" onChange={(e)=>this.onChange(e)} onFocus={this.props.onFocus} onBlur={this.props.onBlur} required="required" />
          <input type="submit" value="ADD COMMENT"/>
        </form>
  		</div>
  	);
	}
}
