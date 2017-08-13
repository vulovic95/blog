import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {WideHomeBackground} from "./WideHomeBackground";

import FaDescription from "react-icons/lib/go/checklist";

import FaTwitter from "react-icons/lib/ti/social-twitter";
import FaInstagram from  "react-icons/lib/ti/social-instagram";
import FaLinkedIn from  "react-icons/lib/ti/social-linkedin";
import FaFacebook from  "react-icons/lib/ti/social-facebook";
import FaMail from  "react-icons/lib/md/email";
import FaTag from "react-icons/lib/go/tag";
import FaComment from "react-icons/lib/fa/comments-o";

import FaStatus from "react-icons/lib/fa/laptop";
import FaSallary from "react-icons/lib/fa/money";
import FaGlobe from "react-icons/lib/fa/globe";
import FaDegree from "react-icons/lib/fa/graduation-cap";
import FaLanguage from "react-icons/lib/fa/language";

const Box = (props) => (
	<div className={props.additional}>
		<h1 className="box-title">{props.title}</h1>
		<div className={props.isCentered == undefined ? "box-about" : "box-about center"}>	{props.children}	</div>
        <div className="clear"></div>
	</div> );
Box.propTypes = {
	title: PropTypes.string.isRequired,
	additional: PropTypes.string.isRequired
}
const Point = ()=>(<span className="period-point"></span>);
const Line = (props) => (<span className={"period-line "+ props.additional}></span>);
Line.propTypes = {
	additional: PropTypes.string.isRequired
}
const Period = (props) => (
	<div className="wide">
		<span className="period-year"> {props.year} </span>
		<Line additional={props.additional}/>
		<Point/>
		<span className="period-title"> {props.title} </span>
	</div>
);
Period.propTypes = {
	title: PropTypes.string.isRequired,
	year: PropTypes.number.isRequired,
	additional: PropTypes.string
}
const Task = (props) => (
	<div className="task">
		<p className="task-description">

            {props.icon == "check" && <FaDescription size={20} className="onlyIcon"/>}
            {props.icon == "twitter" && <FaTwitter size={20} className="onlyIcon"/>}
            {props.icon == "instagram" && <FaInstagram size={20} className="onlyIcon"/>}
            {props.icon == "linkedin" && <FaLinkedIn size={20} className="onlyIcon"/>}
            {props.icon == "facebook" && <FaFacebook size={20} className="onlyIcon"/>}
            {props.icon == "status" && <FaStatus size={20} className="onlyIcon"/>}
            {props.icon == "sallary" && <FaSallary size={20} className="onlyIcon"/>}
            {props.icon == "job" && <FaGlobe size={20} className="onlyIcon"/>}
            {props.icon == "degree" && <FaDegree size={20} className="onlyIcon"/>}
            {props.icon == "language" && <FaLanguage size={20} className="onlyIcon"/>}
            {props.icon == "email" && <FaMail size={20} className="onlyIcon"/>}

            {!props.link && props.description}
            {props.link && <a href={props.link} target="_blank" className="task-description">{props.description}</a>}
        </p>
	</div>
 );
Task.propTypes = {
	description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    link: PropTypes.string,
    linkText: PropTypes.string
}

export class Home extends React.Component{
	componentDidMount(){
    window.scrollTo(0, 0);
    setTimeout(() => this.props.setStyle(), 200);
  }
  componentWillUnmount(){
    this.props.unsetStyle();
  }
    render() {
        const learningTimeline = this.props.timeline.map(tml => tml.timelineType == 1 && <Period  key={tml._id} additional={tml.singlePoint == 1 ? "period-start-line" : ""} year={tml.year} title={tml.text}/>);
        const experienceTimeline = this.props.timeline.map(tml => tml.timelineType == 0 && <Period  key={tml._id} additional={tml.singlePoint == 1 ? "period-start-line" : ""} year={tml.year} title={tml.text}/>);
    return(
  		<div style={this.props.style}>
          <WideHomeBackground additional="purple" title="Ivan Vulović" subtitle="A web programmer from Belgrade, Serbia" link="Download CV" reference="#"/>

        <Box title="Who am I?" additional="box lightIndigo half">
        	Hello! I am Ivan and I am living in Belgrade, Serbia. I am interested in studying what makes programmers tick,
          and writing whatever code strikes my fancy. I like both frontend and backend developing, but i prefer frontend.
          I am mainly interested in JavaScript. I like to stalk and investigate other websites in order to follow trends,
          learn more and more and see what other people like, how they work on some things and how websites should be made.
        </Box>

        <Box title="What do I like?" additional="box darkIndigo half">
        	There is many things I like to do beside pushing pixels together. Some of my favorites are reading books related to UI/UX trends,
          follow news on various websites related to IT, drinking coffee, beer, traveling around the globe and doing sports.
          Also I play clarinet and diatonic harmonica so I can relax when I really need it.When time permits mostly I'm doing some small side projects because I'm always trying to improve my skills and be
          really good at work I do.
        </Box>
        <Box title="What can I do?" additional="box darkestIndigo wide">

            <Task description="I can make completely developed websites" icon="check"/>
            I can handle all particular parts of website development.
            That means that you do not need to worry about domain registration, website hosting, website development or website maintenance.

            <Task description="I can deploy mobile optimized websites" icon="check"/>
            Smartphones and other mobile devices are fast becoming the preferred method of Internet access.
            If you haven’t already got a mobile website, you need to get one soon.
            Why? Because your customers are increasingly going mobile.

            <Task description="I can make websites based on databases" icon="check"/>
            If you have a lot of data, then you will need a database. I can deploy professional and dynamic website so
            you can grow your business up to one level.

            <Task description="I can work remotely" icon="check"/>
            Althought my prefered way of communicating is in person, due to distance between me and clients sometimes we are forced to
            find other solutions. I am able to communicate via email without any problem, in order to complete website development projects
            to their desired specifications.

      </Box>
        <Box title="Let's see timeline of my learning journey" additional="box nicePurple wide">
            {learningTimeline.reverse()}
        </Box>

        <Box title="My work experience" additional="box purple wide">
            {experienceTimeline.reverse()}
        </Box>

        <Box title="More info" additional="box darkIndigo  half">
            <Task description="Status: Open for offers" icon="status"/>
            <Task description="Desired salary:  To be discussed" icon="sallary"/>
            <Task description="Job type:    Freelance" icon="job"/>
            <Task description="Education level: Bechelor's Degree" icon="degree"/>
            <Task description="Languages: Serbian, English, Spanish" icon="language"/>
        </Box>

        <Box title="Stay connected" additional="box darkestIndigo half">
            <Task description="Connect with me on LinkedIn" link="https://www.linkedin.com/in/vulovic95/" icon="linkedin"/>
            <Task description="Find me on Twitter" link="https://twitter.com/vulovic95" icon="twitter"/>
            <Task description="Follow me on Instagram" link="https://www.instagram.com/vulovic95/" icon="instagram"/>
            <Task description="Become my friend on Facebook" link="https://www.facebook.com/vulovic95" icon="facebook"/>
            <Task description="Drop me a line" link="mailto:ivn.vulovic@gmail.com" icon="email"/>
        </Box>
  		</div>
  	);
	}
}
Home.PropTypes = {
	style: PropTypes.object.isRequired,
	setStyle: PropTypes.func.isRequired,
	unsetStyle: PropTypes.func.isRequired
}
